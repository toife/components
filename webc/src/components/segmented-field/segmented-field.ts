import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import {
  APP_PROVIDER_STATE_KEY,
  SEGMENTED_FIELD_DEFAULT_PROPS,
  getSegmentedFieldContentAttrs,
  getSegmentedFieldMessageAttrs,
  getSegmentedFieldWrapperAttrs,
  type AppProviderState,
  type SegmentedFieldVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";
import "../field/field";

export class SegmentedField extends ToifeElement {
  static readonly tagName = "t-segmented-field";

  @property({ attribute: "model-value", type: Array }) modelValue?: string[];
  @property({ type: Array }) value?: string[];
  @property({ type: Number }) length: number = SEGMENTED_FIELD_DEFAULT_PROPS.length;
  @property({ type: String }) variant: SegmentedFieldVariant = SEGMENTED_FIELD_DEFAULT_PROPS.variant;
  @property({ type: String }) size: string = SEGMENTED_FIELD_DEFAULT_PROPS.size;
  @property({ type: Boolean }) disabled: boolean = SEGMENTED_FIELD_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly: boolean = SEGMENTED_FIELD_DEFAULT_PROPS.readonly;
  @property({ type: String }) type: string = SEGMENTED_FIELD_DEFAULT_PROPS.type;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) message: string = SEGMENTED_FIELD_DEFAULT_PROPS.message;
  @property({ type: Array }) pattern: string[] = [];
  @property({ type: String }) direction = "";

  @state() private keepValue: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get segments(): string[] {
    const source =
      this.modelValue !== undefined
        ? this.modelValue
        : this.value !== undefined
          ? this.value
          : this.keepValue;

    return Array.from({ length: this.length }, (_, i) => source?.[i] ?? "");
  }

  private get firstEmptyIndex(): number {
    const empty = this.segments.findIndex((char) => !char);
    return empty === -1 ? this.length - 1 : empty;
  }

  private get wrapperAttrs() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";
    const direction = this.direction || this.appState?.direction || "left";

    return getSegmentedFieldWrapperAttrs({
      role,
      shape,
      direction,
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
    });
  }

  private get fieldProps() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";
    return {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
      shape,
      role,
      type: this.type,
      maxLength: 1,
      autocomplete: "off",
    };
  }

  private normalizeChar(raw: string, index: number): string {
    if (!raw) return "";
    const char = raw.slice(-1);
    const pattern = this.pattern?.[index] ?? this.pattern?.[0];
    if (pattern && !new RegExp(pattern).test(char)) return "";
    return char;
  }

  private getFieldInput(index: number): HTMLInputElement | HTMLTextAreaElement | null {
    const fields = this.querySelectorAll("t-field");
    const root = fields[index] as HTMLElement | undefined;
    return root?.querySelector("input, textarea") ?? null;
  }

  private async syncFieldInputs(): Promise<void> {
    await this.updateComplete;
    for (let i = 0; i < this.length; i++) {
      const input = this.getFieldInput(i);
      if (input) input.value = this.segments[i] ?? "";
    }
  }

  private async updateValue(newValue: string[]): Promise<void> {
    const normalized = Array.from({ length: this.length }, (_, i) => newValue[i] ?? "");
    this.keepValue = normalized;
    this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: normalized, bubbles: true, composed: true }),
    );
    this.dispatchEvent(new CustomEvent("input", { detail: normalized, bubbles: true, composed: true }));

    if (normalized.every((char) => char)) {
      this.dispatchEvent(new CustomEvent("complete", { detail: normalized, bubbles: true, composed: true }));
    }

    await this.syncFieldInputs();
  }

  private async focusInput(index: number): Promise<void> {
    if (this.disabled || this.readonly) return;
    const safeIndex = Math.max(0, Math.min(index, this.length - 1));
    await this.updateComplete;
    const input = this.getFieldInput(safeIndex);
    input?.focus();
    input?.select?.();
  }

  private setCell(index: number, char: string): void {
    const next = [...this.segments];
    next[index] = char;
    void this.updateValue(next);
  }

  private applyChar(index: number, raw: string): void {
    const char = this.normalizeChar(raw, index);
    if (!char) return;
    this.setCell(index, char);
    if (index < this.length - 1) {
      void this.focusInput(index + 1);
    }
  }

  private handlePaste(text: string, startIndex: number): void {
    const chars = text.replace(/\s/g, "").split("");
    if (!chars.length) return;

    const next = [...this.segments];
    let cursor = startIndex;

    for (const ch of chars) {
      if (cursor >= this.length) break;
      const normalized = this.normalizeChar(ch, cursor);
      if (!normalized) continue;
      next[cursor] = normalized;
      cursor += 1;
    }

    void this.updateValue(next);
    void this.focusInput(Math.min(cursor, this.length - 1));
  }

  private onFieldClick = (): void => {
    void this.focusInput(this.firstEmptyIndex);
  };

  private onSegmentFocus = (ev: Event, index: number): void => {
    this.dispatchEvent(new CustomEvent("focus", { detail: ev, bubbles: true, composed: true }));
    const input = this.getFieldInput(index);
    input?.select?.();
  };

  private onSegmentBeforeinput = (ev: Event, index: number): void => {
    if (this.disabled || this.readonly) return;
    const inputEv = ev as InputEvent;
    const { inputType } = inputEv;

    if (inputType === "insertText" && inputEv.data != null) {
      inputEv.preventDefault();
      if (inputEv.data.length > 1) {
        this.handlePaste(inputEv.data, index);
      } else {
        this.applyChar(index, inputEv.data);
      }
      return;
    }

    if (inputType === "insertFromPaste" && inputEv.dataTransfer) {
      inputEv.preventDefault();
      const text = inputEv.dataTransfer.getData("text");
      this.handlePaste(text, index);
      return;
    }

    if (inputType === "deleteContentBackward") {
      inputEv.preventDefault();
      const next = [...this.segments];

      if (next[index]) {
        next[index] = "";
        void this.updateValue(next);
        return;
      }

      if (index > 0) {
        next[index - 1] = "";
        void this.updateValue(next);
        void this.focusInput(index - 1);
      }
    }
  };

  private onSegmentInput = (ev: Event, index: number): void => {
    if (this.disabled || this.readonly) return;

    const target = ev.target as HTMLInputElement | null;
    if (!target) return;

    const value = target.value;
    const current = this.segments[index] ?? "";

    if (!value) {
      if (!current) this.setCell(index, "");
      return;
    }

    if (value.length > 1) {
      this.handlePaste(value, index);
      return;
    }

    if (value === current) return;

    this.applyChar(index, value);
  };

  render() {
    const fieldProps = this.fieldProps;
    const indices = Array.from({ length: this.length }, (_, i) => i);

    return html`
      <div class=${attrsClass(this.wrapperAttrs)}>
        <div class=${attrsClass(getSegmentedFieldContentAttrs())} @pointerup=${this.onFieldClick}>
          ${repeat(
            indices,
            (index) => index,
            (index) => html`
              <t-field
                .variant=${fieldProps.variant}
                .size=${fieldProps.size}
                ?disabled=${fieldProps.disabled}
                ?readonly=${fieldProps.readonly}
                shape=${fieldProps.shape}
                role=${fieldProps.role}
                type=${fieldProps.type}
                .maxLength=${fieldProps.maxLength}
                autocomplete=${fieldProps.autocomplete}
                .modelValue=${this.segments[index]}
                .tabindex=${index === this.firstEmptyIndex ? 0 : -1}
                @beforeinput=${(ev: Event) => this.onSegmentBeforeinput(ev, index)}
                @input=${(ev: Event) => this.onSegmentInput(ev, index)}
                @focus=${(ev: Event) => this.onSegmentFocus(ev, index)}
              ></t-field>
            `,
          )}
        </div>
        ${this.message
          ? html`<div class=${attrsClass(getSegmentedFieldMessageAttrs())}>${this.message}</div>`
          : nothing}
      </div>
    `;
  }
}
