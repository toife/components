import { html } from "lit";
import { CARD_PROVIDER_STATE_KEY, getCardFooterAttrs, type CardProviderState } from "@/core";
import { attrsClass, inject, ToifeElement } from "../../../shared";

export class CardFooter extends ToifeElement {
  static readonly tagName = "t-card-footer";

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(CARD_PROVIDER_STATE_KEY);
  }

  private get cardState() {
    return inject<CardProviderState>(this, CARD_PROVIDER_STATE_KEY);
  }

  private get cardFooterAttrs() {
    return getCardFooterAttrs({ divider: this.cardState?.divider ?? false });
  }

  render() {
    return html`<div class=${attrsClass(this.cardFooterAttrs)}><slot></slot></div>`;
  }
}
