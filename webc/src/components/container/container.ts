import { html } from "lit";
import { getContainerAttrs } from "@/core";
import { attrsClass, ToifeElement } from "../../shared";

export class Container extends ToifeElement {
  static readonly tagName = "t-container";

  render() {
    const attrs = getContainerAttrs();
    return html`<div class=${attrsClass(attrs)}><slot></slot></div>`;
  }
}
