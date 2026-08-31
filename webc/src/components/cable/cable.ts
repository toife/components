import { html } from "lit";
import { property } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  CABLE_DEFAULT_PROPS,
  CABLE_PROVIDER_STATE_KEY,
  getCableAttrs,
  type CableProviderState,
} from "@/core";
import { attrsClass, provideReactive, ToifeElement, type ContextNotifier } from "../../shared";

export class Cable extends ToifeElement {
  static readonly tagName = "t-cable";

  @property({ type: Boolean }) keyboard: boolean = CABLE_DEFAULT_PROPS.keyboard;
  @property({ type: String }) placement: string = CABLE_DEFAULT_PROPS.placement;

  private readonly cableState: CableProviderState = {
    placement: CABLE_DEFAULT_PROPS.placement,
  };

  private notifier?: ContextNotifier;

  connectedCallback(): void {
    super.connectedCallback();
    this.notifier = provideReactive(this, CABLE_PROVIDER_STATE_KEY, this.cableState);
    this.cableState.placement = this.placement;
  }

  updated(changed: PropertyValues): void {
    if (changed.has("placement")) {
      this.cableState.placement = this.placement;
      this.notifier?.notify();
    }
  }

  render() {
    return html`<div class=${attrsClass(getCableAttrs({ placement: this.placement }))}><slot></slot></div>`;
  }
}
