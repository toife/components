import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  SWITCH_DEFAULT_PROPS,
  getSwitchAttrs,
  getSwitchIconAttrs,
  getSwitchWrapperAttrs,
  type AppProviderState,
  type SwitchProps,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

export class Switch extends ToifeElement {
  static readonly tagName = "t-switch";

  @property({ type: Boolean }) modelValue: boolean = SWITCH_DEFAULT_PROPS.modelValue;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = SWITCH_DEFAULT_PROPS.size;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly: boolean = SWITCH_DEFAULT_PROPS.readonly;
  @property({ type: Number }) bounce: number = SWITCH_DEFAULT_PROPS.bounce;

  @state() private focused = false;
  @state() private isFirstRender = true;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    setTimeout(() => {
      this.isFirstRender = false;
    }, 500);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get switchWrapperAttrs() {
    return getSwitchWrapperAttrs({
      disabled: this.disabled,
      readonly: this.readonly,
      focus: this.focused,
      modelValue: this.modelValue,
      transition: !this.isFirstRender,
      bounce: this.bounce,
    });
  }

  private get switchAttrs() {
    return getSwitchAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
    });
  }

  private get switchIconAttrs() {
    return getSwitchIconAttrs();
  }

  private onSwitch = () => {
    if (this.disabled || this.readonly) return;
    this.dispatchEvent(
      new CustomEvent("update:modelValue", {
        detail: !this.modelValue,
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onFocus = () => {
    if (this.disabled || this.readonly) return;
    this.focused = true;
  };

  private onBlur = () => {
    if (this.disabled || this.readonly) return;
    this.focused = false;
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    this.onSwitch();
  };

  render() {
    const wrapperAttrs = this.switchWrapperAttrs;
    return html`
      <div
        class=${attrsClass(wrapperAttrs)}
        style=${attrsStyle(wrapperAttrs)}
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.modelValue}
        @pointerup=${this.onSwitch}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${attrsClass(this.switchAttrs)}>
          <div class=${attrsClass(this.switchIconAttrs)}></div>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

export type { SwitchProps };
