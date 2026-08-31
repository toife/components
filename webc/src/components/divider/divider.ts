import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  DIVIDER_DEFAULT_PROPS,
  getDividerAttrs,
  type AppProviderState,
  type DividerDirection,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Divider extends ToifeElement {
  static readonly tagName = "t-divider";

  @property({ type: String }) role = "";
  @property({ type: String }) direction: DividerDirection = DIVIDER_DEFAULT_PROPS.direction;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  render() {
    const attrs = getDividerAttrs({
      role: this.role || this.appState?.role || "",
      direction: this.direction,
    });
    return html`<div class=${attrsClass(attrs)}></div>`;
  }
}
