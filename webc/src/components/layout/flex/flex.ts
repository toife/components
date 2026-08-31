import { html } from "lit";
import { property } from "lit/decorators.js";
import { FLEX_DEFAULT_PROPS, getFlexAttrs, type FlexOption, type FlexProps } from "@/core";
import { attrsClass, attrsStyle, ToifeElement } from "../../../shared";

export class Flex extends ToifeElement {
  static readonly tagName = "t-flex";

  @property({ type: Array }) options: FlexOption[] = FLEX_DEFAULT_PROPS.options();

  private get flexAttrs() {
    return getFlexAttrs(this.options ?? []);
  }

  render() {
    const attrs = this.flexAttrs;
    return html`<div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}><slot></slot></div>`;
  }
}

export type { FlexProps };
