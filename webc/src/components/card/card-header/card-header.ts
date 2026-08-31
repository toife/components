import { html } from "lit";
import { CARD_PROVIDER_STATE_KEY, getCardHeaderAttrs, type CardProviderState } from "@/core";
import { attrsClass, inject, ToifeElement } from "../../../shared";

export class CardHeader extends ToifeElement {
  static readonly tagName = "t-card-header";

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(CARD_PROVIDER_STATE_KEY);
  }

  private get cardState() {
    return inject<CardProviderState>(this, CARD_PROVIDER_STATE_KEY);
  }

  private get cardHeaderAttrs() {
    return getCardHeaderAttrs({ divider: this.cardState?.divider ?? false });
  }

  render() {
    return html`<div class=${attrsClass(this.cardHeaderAttrs)}><slot></slot></div>`;
  }
}
