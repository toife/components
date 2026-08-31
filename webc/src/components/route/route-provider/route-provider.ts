import { html } from "lit";
import { property } from "lit/decorators.js";
import { ROUTE_PROVIDER_STATE_KEY, type RouteProviderState } from "@/core";
import { provideReactive, ToifeElement, type ContextNotifier } from "../../../shared";

export class RouteProvider extends ToifeElement {
  static readonly tagName = "t-route-provider";

  @property({ attribute: false }) stack: RouteProviderState["stack"] = [];

  private readonly providerState: RouteProviderState = { stack: [] };
  private notifier?: ContextNotifier;

  connectedCallback(): void {
    super.connectedCallback();
    this.notifier = provideReactive(this, ROUTE_PROVIDER_STATE_KEY, this.providerState);
    this.providerState.stack = this.stack;
  }

  updated(): void {
    this.providerState.stack = this.stack;
    this.notifier?.notify();
  }

  render() {
    return html`<slot></slot>`;
  }
}
