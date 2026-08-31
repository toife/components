import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  BUTTON_DEFAULT_PROPS,
  getButtonAttrs,
  getButtonLoaderAttrs,
  type AppProviderState,
  type ButtonProps,
  type ButtonVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Button extends ToifeElement {
  static readonly tagName = "t-button";

  @property({ type: String }) role = "";
  @property({ type: String }) size: string = BUTTON_DEFAULT_PROPS.size;
  @property({ type: String }) shape = "";
  @property({ type: Boolean }) block: boolean = BUTTON_DEFAULT_PROPS.block;
  @property({ type: Boolean }) loading: boolean = BUTTON_DEFAULT_PROPS.loading;
  @property({ type: String }) variant: ButtonVariant = BUTTON_DEFAULT_PROPS.variant;

  @state() private focused = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get buttonAttrs() {
    const shape = this.shape || this.appState?.shape || "";
    const role = this.role || this.appState?.role || "";
    return getButtonAttrs({
      role,
      shape,
      variant: this.variant,
      size: this.size,
      block: this.block,
      focus: this.focused,
    });
  }

  private get loaderAttrs() {
    return getButtonLoaderAttrs();
  }

  private onFocus = () => {
    this.focused = true;
  };

  private onBlur = () => {
    this.focused = false;
  };

  render() {
    return html`
      <button
        class=${attrsClass(this.buttonAttrs)}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
      >
        ${this.loading
          ? html`<span class=${attrsClass(this.loaderAttrs)}><slot name="loading"></slot></span>`
          : html`<span><slot></slot></span>`}
      </button>
    `;
  }
}

export type { ButtonProps };
