import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  TAB_DEFAULT_PROPS,
  TABS_PROVIDER_STATE_KEY,
  getTabAttrs,
  getTabButtonAttrs,
  type TabProps,
  type TabsProviderState,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Tab extends ToifeElement {
  static readonly tagName = "t-tab";

  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled: boolean = TAB_DEFAULT_PROPS.disabled;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(TABS_PROVIDER_STATE_KEY);
  }

  private get tabsState() {
    return inject<TabsProviderState | undefined>(this, TABS_PROVIDER_STATE_KEY);
  }

  private get isActive() {
    return this.tabsState?.activeValue === this.value;
  }

  private get tabAttrs() {
    return getTabAttrs({ active: this.isActive });
  }

  private get buttonAttrs() {
    const shape = this.tabsState?.shape || "";
    const size = this.tabsState?.size || "standard";
    return getTabButtonAttrs({ shape, size });
  }

  private handleClick = () => {
    if (this.disabled) return;
    this.tabsState?.setValue(this.value || "");
  };

  render() {
    return html`
      <li class=${attrsClass(this.tabAttrs)}>
        <button class=${attrsClass(this.buttonAttrs)} @click=${this.handleClick}>
          <slot></slot>
        </button>
      </li>
    `;
  }
}

export type { TabProps };
