import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  CABLE_PROVIDER_STATE_KEY,
  TOOLBAR_DEFAULT_PROPS,
  getToolbarAttrs,
  type AppProviderState,
  type CableProviderState,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Toolbar extends ToifeElement {
  static readonly tagName = "t-toolbar";

  @property({ type: String }) placement: string | null = TOOLBAR_DEFAULT_PROPS.placement;
  @property({ type: Boolean }) safe: boolean = TOOLBAR_DEFAULT_PROPS.safe;
  @property({ type: String }) role = "";
  @property({ type: Boolean }) divider?: boolean;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.consume(CABLE_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get cableState() {
    return inject<CableProviderState | undefined>(this, CABLE_PROVIDER_STATE_KEY);
  }

  private get toolbarAttrs() {
    const role = this.role || this.appState?.role || "";
    const placement = this.placement || this.cableState?.placement || "";
    const divider = (this.divider !== undefined ? this.divider : this.appState?.divider) ?? false;

    return getToolbarAttrs({
      role,
      placement,
      safe: this.safe,
      divider,
    });
  }

  render() {
    return html`<div class=${attrsClass(this.toolbarAttrs)}><slot></slot></div>`;
  }
}
