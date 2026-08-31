import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  FLEX_ITEM_DEFAULT_PROPS,
  getFlexItemAttrs,
  type FlexItemOption,
  type FlexItemProps,
} from "@/core";
import { attrsClass, attrsStyle, ToifeElement } from "../../../shared";

export class FlexItem extends ToifeElement {
  static readonly tagName = "t-flex-item";

  @property({ type: Array }) options: FlexItemOption[] = FLEX_ITEM_DEFAULT_PROPS.options();

  private get flexItemAttrs() {
    return getFlexItemAttrs(this.options ?? []);
  }

  render() {
    const attrs = this.flexItemAttrs;
    return html`<div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}><slot></slot></div>`;
  }
}

export type { FlexItemProps };
