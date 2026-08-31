import { html } from "lit";
import { property } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  RADIO_GROUP_DEFAULT_PROPS,
  RADIO_GROUP_PROVIDER_STATE_KEY,
  getRadioGroupAttrs,
  type AppProviderState,
  type RadioGroupProviderState,
  type RadioVariant,
} from "@/core";
import {
  attrsClass,
  inject,
  provideReactive,
  ToifeElement,
  type ContextNotifier,
} from "../../../shared";

export class RadioGroup extends ToifeElement {
  static readonly tagName = "t-radio-group";

  @property({ attribute: "model-value" }) modelValue?: string | number;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) variant: RadioVariant = RADIO_GROUP_DEFAULT_PROPS.variant;
  @property({ type: Boolean }) disabled: boolean = RADIO_GROUP_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly: boolean = RADIO_GROUP_DEFAULT_PROPS.readonly;
  @property({ type: String }) direction: string = RADIO_GROUP_DEFAULT_PROPS.direction;

  private readonly groupState: RadioGroupProviderState = {
    modelValue: undefined,
    role: "",
    shape: "",
    variant: RADIO_GROUP_DEFAULT_PROPS.variant,
    disabled: RADIO_GROUP_DEFAULT_PROPS.disabled,
    readonly: RADIO_GROUP_DEFAULT_PROPS.readonly,
    setValue: (val) => {
      this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: val, bubbles: true, composed: true }),
      );
    },
  };

  private notifier?: ContextNotifier;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.notifier = provideReactive(this, RADIO_GROUP_PROVIDER_STATE_KEY, this.groupState);
    this.syncGroupState();
  }

  updated(changed: PropertyValues): void {
    this.syncGroupState();
    if (
      changed.has("modelValue") ||
      changed.has("role") ||
      changed.has("shape") ||
      changed.has("variant") ||
      changed.has("disabled") ||
      changed.has("readonly")
    ) {
      this.notifier?.notify();
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private syncGroupState(): void {
    this.groupState.modelValue = this.modelValue;
    this.groupState.role = this.role || this.appState?.role || "";
    this.groupState.shape = this.shape || this.appState?.shape || "";
    this.groupState.variant = this.variant;
    this.groupState.disabled = this.disabled;
    this.groupState.readonly = this.readonly;
  }

  private get radioGroupAttrs() {
    return getRadioGroupAttrs({ direction: this.direction });
  }

  render() {
    return html`<div class=${attrsClass(this.radioGroupAttrs)}><slot></slot></div>`;
  }
}
