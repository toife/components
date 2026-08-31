import { html } from "lit";
import { property } from "lit/decorators.js";
import { GRID_DEFAULT_PROPS, getGridAttrs, type GridOption, type GridProps } from "@/core";
import { attrsClass, attrsStyle, ToifeElement } from "../../../shared";

export class Grid extends ToifeElement {
  static readonly tagName = "t-grid";

  @property({ type: Array }) options: GridOption[] = GRID_DEFAULT_PROPS.options();

  private get gridAttrs() {
    return getGridAttrs(this.options ?? []);
  }

  render() {
    const attrs = this.gridAttrs;
    return html`<div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}><slot></slot></div>`;
  }
}

export type { GridProps };
