import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  GRID_ITEM_DEFAULT_PROPS,
  getGridItemAttrs,
  type GridItemOption,
  type GridItemProps,
} from "@/core";
import { attrsClass, attrsStyle, ToifeElement } from "../../../shared";

export class GridItem extends ToifeElement {
  static readonly tagName = "t-grid-item";

  @property({ type: Array }) options: GridItemOption[] = GRID_ITEM_DEFAULT_PROPS.options();

  private get gridItemAttrs() {
    return getGridItemAttrs(this.options ?? []);
  }

  render() {
    const attrs = this.gridItemAttrs;
    return html`<div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}><slot></slot></div>`;
  }
}

export type { GridItemProps };
