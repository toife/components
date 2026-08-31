import { html } from "lit";
import { property } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  CARD_DEFAULT_PROPS,
  CARD_PROVIDER_STATE_KEY,
  getCardAttrs,
  type AppProviderState,
  type CardProps,
  type CardProviderState,
} from "@/core";
import {
  attrsClass,
  ContextNotifier,
  inject,
  provideReactive,
  ToifeElement,
} from "../../shared";

export class Card extends ToifeElement {
  static readonly tagName = "t-card";

  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: Boolean, reflect: true }) divider?: boolean;

  #notifier?: ContextNotifier;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  updated(_changed: PropertyValues<this>): void {
    this.#notifier = provideReactive(this, CARD_PROVIDER_STATE_KEY, this.cardProviderState);
    this.#notifier.notify();
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get effectiveDivider(): boolean {
    if (this.hasAttribute("divider")) return this.divider ?? false;
    return this.appState?.divider ?? false;
  }

  private get effectiveShape(): string {
    return this.shape || this.appState?.shape || "";
  }

  private get effectiveRole(): string {
    return this.role || this.appState?.role || "";
  }

  private get cardProviderState(): CardProviderState {
    return {
      role: this.effectiveRole,
      shape: this.effectiveShape,
      divider: this.effectiveDivider,
    };
  }

  private get cardAttrs() {
    return getCardAttrs(this.cardProviderState);
  }

  render() {
    return html`<div class=${attrsClass(this.cardAttrs)}><slot></slot></div>`;
  }
}

export type { CardProps };
