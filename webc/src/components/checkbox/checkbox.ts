import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  CHECKBOX_DEFAULT_PROPS,
  getCheckboxAttrs,
  getCheckboxIconAttrs,
  type AppProviderState,
  type CheckboxProps,
  type CheckboxVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Checkbox extends ToifeElement {
  static readonly tagName = "t-checkbox";

  @property({ type: Boolean }) modelValue: boolean = CHECKBOX_DEFAULT_PROPS.modelValue;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = CHECKBOX_DEFAULT_PROPS.size;
  @property({ type: String }) variant: CheckboxVariant = CHECKBOX_DEFAULT_PROPS.variant;
  @property({ type: Boolean }) disabled: boolean = CHECKBOX_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly: boolean = CHECKBOX_DEFAULT_PROPS.readonly;

  @state() private focused = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get checkboxAttrs() {
    return getCheckboxAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
      variant: this.variant,
      modelValue: this.modelValue,
      disabled: this.disabled,
      readonly: this.readonly,
      focus: this.focused,
    });
  }

  private get checkboxIconAttrs() {
    return getCheckboxIconAttrs();
  }

  private onCheckbox = () => {
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
    this.dispatchEvent(new CustomEvent("focus", { bubbles: true, composed: true }));
  };

  private onBlur = () => {
    if (this.disabled || this.readonly) return;
    this.focused = false;
    this.dispatchEvent(new CustomEvent("blur", { bubbles: true, composed: true }));
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    this.onCheckbox();
  };

  render() {
    return html`
      <div
        class=${attrsClass(this.checkboxAttrs)}
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.modelValue}
        @pointerup=${this.onCheckbox}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${attrsClass(this.checkboxIconAttrs)}></div>
        <slot></slot>
      </div>
    `;
  }
}

export type { CheckboxProps };
