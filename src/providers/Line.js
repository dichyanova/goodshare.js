/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LINE (https://line.me) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Line extends ProviderMixin {
  constructor(url = document.location.href) {
    super();
    this.url = encodeURIComponent(url);
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const share_url = `line://msg/text/${url}`;

    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowOptions: "width=640,height=480,location=no,toolbar=no,menubar=no"
    };
  }

  // Share event
  shareWindow() {
    const share_elements = document.querySelectorAll('[data-social="line"]');

    return this.createEvents(share_elements);
  }
}
