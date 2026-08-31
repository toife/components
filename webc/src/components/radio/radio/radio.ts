import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  RADIO_DEFAULT_PROPS,
  RADIO_GROUP_PROVIDER_STATE_KEY,
  getRadioAttrs,
  getRadioIconAttrs,
  type AppProviderState,
  type RadioGroupProviderState,
  type RadioVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../../shared";

const valueConverter = {
  fromAttribute(value: string | null): string | number {
    if (value === null) return "";
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  },
  toAttribute(value: string | number): string {
    return String(value);
  },
};

export class Radio extends ToifeElement {
  static readonly tagName = "t-radio";

  @property({ converter: valueConverter }) value: string | number = "";
  @property({ type: String }) role = "";
  @property({ type: String }) size: string = RADIO_DEFAULT_PROPS.size;
  @property({ type: String }) shape = "";
  @property({ type: String }) variant: RadioVariant | "" = "";
  @property({ type: Boolean }) disabled: boolean = RADIO_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly = false;

  @state() private isFocused = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.consume(RADIO_GROUP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get radioGroupState() {
    return inject<RadioGroupProviderState | undefined>(this, RADIO_GROUP_PROVIDER_STATE_KEY);
  }

  private get effectiveDisabled() {
    return this.disabled || (this.radioGroupState?.disabled ?? false);
  }

  private get effectiveReadonly() {
    return this.readonly || (this.radioGroupState?.readonly ?? false);
  }

  private get radioAttrs() {
    const group = this.radioGroupState;
    const role = this.role || group?.role || this.appState?.role || "";
    const shape = this.shape || group?.shape || this.appState?.shape || "";
    const variant = this.variant || group?.variant || "";
    const isChecked = group?.modelValue === this.value;

    return getRadioAttrs({
      role,
      shape,
      size: this.size,
      variant,
      checked: isChecked,
      disabled: this.effectiveDisabled,
      readonly: this.effectiveReadonly,
      focus: this.isFocused,
    });
  }

  private onRadio = () => {
    if (this.effectiveDisabled || this.effectiveReadonly || !this.radioGroupState) return;
    this.radioGroupState.setValue(this.value);
  };

  private onFocus = () => {
    if (this.effectiveDisabled || this.effectiveReadonly) return;
    this.isFocused = true;
  };

  private onBlur = () => {
    if (this.effectiveDisabled || this.effectiveReadonly) return;
    this.isFocused = false;
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    this.onRadio();
  };

  render() {
    const disabled = this.effectiveDisabled;
    return html`
      <div
        class=${attrsClass(this.radioAttrs)}
        tabindex=${disabled ? -1 : 0}
        @pointerup=${this.onRadio}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${attrsClass(getRadioIconAttrs())}></div>
        <slot></slot>
      </div>
    `;
  }
}
