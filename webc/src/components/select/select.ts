import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import {
  APP_PROVIDER_STATE_KEY,
  SELECT_DEFAULT_PROPS,
  getSelectAttrs,
  getSelectIconAttrs,
  getSelectMessageAttrs,
  getSelectOptionAttrs,
  type AppProviderState,
  type SelectOption,
  type SelectVariant,
} from "@/core";
import { attrsClass, inject, resolveClassInfo, ToifeElement } from "../../shared";
import "../dropdown/dropdown";
import "../field/field";

export class Select extends ToifeElement {
  static readonly tagName = "t-select";

  @property({ attribute: "model-value" }) modelValue: string = SELECT_DEFAULT_PROPS.modelValue;
  @property({ type: String }) name = "";
  @property({ type: String }) variant: SelectVariant = SELECT_DEFAULT_PROPS.variant;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = SELECT_DEFAULT_PROPS.size;
  @property({ type: String }) direction = "";
  @property({ type: String }) id = "";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder: string = SELECT_DEFAULT_PROPS.placeholder;
  @property({ type: Boolean }) disabled: boolean = SELECT_DEFAULT_PROPS.disabled;
  @property({ type: String }) message: string = SELECT_DEFAULT_PROPS.message;
  @property({ type: Array }) options: SelectOption[] = [];

  @state() private visible = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get roleValue() {
    return this.role || this.appState?.role || "";
  }

  private get directionValue() {
    return this.direction || this.appState?.direction || "left";
  }

  private get shapeValue() {
    return this.shape || this.appState?.shape || "";
  }

  private get selectAttrs() {
    return getSelectAttrs({
      role: this.roleValue,
      direction: this.directionValue,
      size: this.size,
      disabled: this.disabled,
    });
  }

  private get fieldDisplayValue(): string {
    const propsValue = this.modelValue || this.value;
    let val: string[] = [];
    if (propsValue) val = typeof propsValue === "string" ? [propsValue] : (propsValue as string[]);
    const values = this.options
      .filter((option): option is SelectOption => (val || []).includes(option.value))
      .map((option) => option.label ?? option.value);
    return values.join(",");
  }

  private onVisibleChange = (ev: CustomEvent<boolean>) => {
    this.visible = ev.detail;
  };

  private onTriggerPointerUp = (): void => {
    const dropdown = this.querySelector("t-dropdown") as HTMLElement & { toggle?: () => void };
    dropdown?.toggle?.();
  };

  private pickOption = (option: SelectOption) => {
    if (option.disabled || option.value === undefined) return;
    this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: option.value, bubbles: true, composed: true }),
    );
    this.dispatchEvent(new CustomEvent("select", { detail: option, bubbles: true, composed: true }));
    this.visible = false;
  };

  render() {
    const iconClass = classMap({
      ...resolveClassInfo(getSelectIconAttrs().class),
      open: this.visible,
    });

    return html`
      <div class=${attrsClass(this.selectAttrs)}>
        <t-dropdown
          .modelValue=${this.visible}
          @update:modelValue=${this.onVisibleChange}
          role=${this.roleValue}
          direction=${this.directionValue}
          shape=${this.shapeValue}
          ?disabled=${this.disabled}
          .size=${this.size}
        >
          <t-field
            slot="trigger"
            class=${this.visible ? "focus" : ""}
            role=${this.roleValue}
            variant="outline"
            .modelValue=${this.fieldDisplayValue}
            .size=${this.size}
            .variant=${this.variant}
            placeholder=${this.placeholder}
            direction=${this.directionValue}
            shape=${this.shapeValue}
            ?readonly=${true}
            ?disabled=${this.disabled}
            @pointerup=${this.onTriggerPointerUp}
          >
            <span slot="end-input" class=${iconClass}></span>
          </t-field>
          ${repeat(
            this.options,
            (option) => option.value,
            (option) => html`
              <button
                type="button"
                ?disabled=${option.disabled}
                class=${attrsClass(getSelectOptionAttrs())}
                @pointerup=${() => this.pickOption(option)}
              >
                ${option.label}
              </button>
            `,
          )}
        </t-dropdown>
        ${this.message
          ? html`<div class=${attrsClass(getSelectMessageAttrs())}>${this.message}</div>`
          : nothing}
      </div>
    `;
  }
}

export type { SelectOption };
