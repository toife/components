import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  GESTURE_INDICATOR_DEFAULT_PROPS,
  getGestureIndicatorAttrs,
  type AppProviderState,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class GestureIndicator extends ToifeElement {
  static readonly tagName = "t-gesture-indicator";

  @property({ type: String }) placement: string = GESTURE_INDICATOR_DEFAULT_PROPS.placement;
  @property({ type: String }) role = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get gestureIndicatorAttrs() {
    const role = this.role || this.appState?.role || "";
    return getGestureIndicatorAttrs({ role, placement: this.placement });
  }

  render() {
    return html`<div class=${attrsClass(this.gestureIndicatorAttrs)}></div>`;
  }
}
