/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LinkedIn (https://linkedin.com) provider.
 */

import { EventWithNamespace, getUniqId } from '../utils';

export class LinkedIn {
  constructor (url = document.location.href, title = document.title,
               description = document.querySelector('meta[name="description"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.events = new EventWithNamespace();
    this.instanceId = getUniqId('linkedin');
  }
  
  static getInstance () {
    const _instance = new LinkedIn();

    _instance.shareWindow();
    _instance.getCounter();

    return _instance;
  }

  reNewInstance () {
    this.events.removeAll();
    LinkedIn.getInstance();
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="linkedin"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
      const share_url = `https://www.linkedin.com/shareArticle?url=${url}&text=${title}&summary=${description}&mini=true`;
      
      this.events.addEventListener(item, 'click.' + this.instanceId, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="linkedin"]');
    const count_url = `https://www.linkedin.com/countserv/count/share?url=${this.url}&callback=${callback}`;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = counter.count;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
