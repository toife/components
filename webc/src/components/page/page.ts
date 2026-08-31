import { html } from "lit";
import { getPageAttrs } from "@/core";
import { attrsClass, ToifeElement } from "../../shared";

export class Page extends ToifeElement {
  static readonly tagName = "t-page";

  render() {
    const attrs = getPageAttrs();
    return html`<div class=${attrsClass(attrs)}><slot></slot></div>`;
  }
}
