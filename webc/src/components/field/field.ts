import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  FIELD_DEFAULT_PROPS,
  getFieldAttrs,
  getFieldContentAttrs,
  getFieldInputAttrs,
  getFieldMessageAttrs,
  type AppProviderState,
  type FieldType,
  type FieldVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Field extends ToifeElement {
  static readonly tagName = "t-field";

  @property({ attribute: "model-value" }) modelValue: string | number = FIELD_DEFAULT_PROPS.modelValue;
  @property({ type: String }) name = "";
  @property({ type: String }) variant: FieldVariant = FIELD_DEFAULT_PROPS.variant;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = FIELD_DEFAULT_PROPS.size;
  @property({ type: String }) direction = "";
  @property({ type: String }) id = "";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder: string = FIELD_DEFAULT_PROPS.placeholder;
  @property({ type: Boolean }) disabled: boolean = FIELD_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly: boolean = FIELD_DEFAULT_PROPS.readonly;
  @property({ type: String }) autocomplete = "";
  @property({ type: Number }) maxLength?: number;
  @property({ type: Number }) tabindex?: number;
  @property({ type: String }) type: FieldType = FIELD_DEFAULT_PROPS.type;
  @property({ type: Number }) line: number = FIELD_DEFAULT_PROPS.line;
  @property({ type: Number }) maxLine: number = FIELD_DEFAULT_PROPS.maxLine;
  @property({ type: String }) message: string = FIELD_DEFAULT_PROPS.message;

  @state() private isFocus = false;
  @state() private content = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has("modelValue") || changed.has("value")) {
      this.content = this.rawContent;
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get rawContent(): string {
    const model = this.modelValue;
    if (model !== null && model !== undefined && model !== "") return String(model);
    const val = this.value;
    if (val !== null && val !== undefined && val !== "") return String(val);
    return "";
  }

  private get fieldAttrs() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";
    const direction = this.direction || this.appState?.direction || "left";

    return getFieldAttrs({
      role,
      shape,
      size: this.size,
      direction,
      variant: this.variant,
      type: this.type,
      disabled: this.disabled,
      focus: this.isFocus || this.classList.contains("focus"),
      readonly: this.readonly,
      line: Number(this.line),
      maxLine: this.maxLine !== undefined ? Number(this.maxLine) : undefined,
    });
  }

  private get fieldInputAttrs() {
    return {
      ...getFieldInputAttrs(),
      name: this.name,
      id: this.id,
      placeholder: this.placeholder,
      autocomplete: this.autocomplete,
      type: this.type,
      readonly: this.readonly,
      disabled: this.disabled,
      maxlength: this.maxLength,
      tabindex: this.tabindex,
    };
  }

  private onFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.isFocus = true;
    this.dispatchEvent(new CustomEvent("focus", { detail: ev, bubbles: true, composed: true }));
  };

  private onBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.isFocus = false;
    this.dispatchEvent(new CustomEvent("blur", { detail: ev, bubbles: true, composed: true }));
  };

  private onInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement;
    this.content = target.value;
    this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: this.content, bubbles: true, composed: true }),
    );
    this.dispatchEvent(new CustomEvent("input", { detail: ev, bubbles: true, composed: true }));
  };

  private onBeforeinput = (ev: Event) => {
    this.dispatchEvent(new CustomEvent("beforeinput", { detail: ev, bubbles: true, composed: true }));
  };

  private renderDefaultInput() {
    const inputClass = attrsClass(this.fieldInputAttrs);
    const handlers = {
      input: this.onInput,
      focus: this.onFocus,
      blur: this.onBlur,
      beforeinput: this.onBeforeinput,
    };

    if (this.type === "paragraph") {
      return html`<textarea
        class=${inputClass}
        name=${this.name || nothing}
        id=${this.id || nothing}
        placeholder=${this.placeholder || nothing}
        autocomplete=${this.autocomplete || nothing}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        maxlength=${this.maxLength ?? nothing}
        tabindex=${this.tabindex ?? nothing}
        rows=${this.line}
        .value=${this.content}
        @input=${handlers.input}
        @focus=${handlers.focus}
        @blur=${handlers.blur}
        @beforeinput=${handlers.beforeinput}
      ></textarea>`;
    }

    return html`<input
      class=${inputClass}
      type=${this.type}
      name=${this.name || nothing}
      id=${this.id || nothing}
      placeholder=${this.placeholder || nothing}
      autocomplete=${this.autocomplete || nothing}
      ?readonly=${this.readonly}
      ?disabled=${this.disabled}
      maxlength=${this.maxLength ?? nothing}
      tabindex=${this.tabindex ?? nothing}
      .value=${this.content}
      @input=${handlers.input}
      @focus=${handlers.focus}
      @blur=${handlers.blur}
      @beforeinput=${handlers.beforeinput}
    />`;
  }

  render() {
    return html`
      <div class=${attrsClass(this.fieldAttrs)}>
        <div class=${attrsClass(getFieldContentAttrs())}>
          <slot name="start-input"></slot>
          <slot name="input">${this.renderDefaultInput()}</slot>
          <slot name="end-input"></slot>
        </div>
        ${this.message
          ? html`<div class=${attrsClass(getFieldMessageAttrs())}>${this.message}</div>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }
}

export type { FieldVariant, FieldType };
