import { html } from "lit";
import { getCardBodyAttrs } from "@/core";
import { attrsClass, ToifeElement } from "../../../shared";

export class CardBody extends ToifeElement {
  static readonly tagName = "t-card-body";

  render() {
    const attrs = getCardBodyAttrs();
    return html`<div class=${attrsClass(attrs)}><slot></slot></div>`;
  }
}
