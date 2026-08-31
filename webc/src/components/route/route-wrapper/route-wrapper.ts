import { html } from "lit";
import { property } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import { ROUTE_WRAPPER_DEFAULT_PROPS, type RouteWrapperProps } from "@/core";
import { ToifeElement } from "../../../shared";
import type { RouterLike } from "../router-like";
import { useRouteWrapper } from "./route-wrapper.controller";

export class RouteWrapper extends ToifeElement {
  static readonly tagName = "t-route-wrapper";

  @property({ type: String, attribute: "home-route-name" }) homeRouteName: string =
    ROUTE_WRAPPER_DEFAULT_PROPS.homeRouteName;
  @property({ attribute: false }) router?: RouterLike;

  private wrapper = useRouteWrapper();
  private unsubRoute?: () => void;
  private mounted = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.unsubRoute = this.router?.onChange?.(() => this.syncFromRouter());
  }

  disconnectedCallback(): void {
    this.unsubRoute?.();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.mounted = true;
    this.bootstrapStack();
  }

  updated(changed: PropertyValues): void {
    if (changed.has("router") && this.mounted) {
      this.unsubRoute?.();
      this.unsubRoute = this.router?.onChange?.(() => this.syncFromRouter());
      this.syncFromRouter();
    }
  }

  private bootstrapStack(): void {
    if (!this.router) return;
    const homeName = this.homeRouteName;
    const current = this.router.currentRoute;

    if (current.name === homeName || current.path === homeName) {
      this.wrapper.updateRoutes(this.router.matched ?? []);
      this.requestUpdate();
      return;
    }

    const homeLocation = this.router.resolve?.({ name: homeName });
    if (homeLocation?.matched.length) {
      this.wrapper.updateRoutes(homeLocation.matched);
    }

    setTimeout(() => {
      this.wrapper.updateRoutes(this.router?.matched ?? []);
      this.requestUpdate();
    }, 50);
  }

  private syncFromRouter(): void {
    if (!this.router?.matched) return;
    this.wrapper.updateRoutes(this.router.matched);
    this.requestUpdate();
  }

  render() {
    return html`
      <t-route-provider .stack=${this.wrapper.stack}>
        <slot></slot>
      </t-route-provider>
    `;
  }
}

export type { RouteWrapperProps };
