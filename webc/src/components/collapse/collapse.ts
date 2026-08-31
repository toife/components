import { html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  COLLAPSE_DEFAULT_PROPS,
  getCollapseAttrs,
  getCollapseContentAttrs,
  getCollapseContentInnerClass,
  getCollapseTriggerAttrs,
  type AppProviderState,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

export class Collapse extends ToifeElement {
  static readonly tagName = "t-collapse";

  @property({ type: Boolean, attribute: "model-value" }) modelValue: boolean = COLLAPSE_DEFAULT_PROPS.modelValue;
  @property({ type: Number }) duration?: number;
  @property({ type: String }) role = "";
  @property({ type: Boolean }) disabled: boolean = COLLAPSE_DEFAULT_PROPS.disabled;

  @state() private isOpen = false;
  @state() private contentHeight = 0;
  @state() private isFirstOpen = true;

  @query(`.${getCollapseContentInnerClass()}`) private contentRef?: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has("modelValue")) {
      this.isOpen = this.modelValue;
      if (this.modelValue) {
        this.scheduleMeasure();
      }
    }
  }

  firstUpdated(): void {
    this.isOpen = this.modelValue;
    if (this.isOpen) {
      this.scheduleMeasure();
    }
  }

  updated(): void {
    if (this.isOpen) {
      this.scheduleMeasure();
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private scheduleMeasure(): void {
    requestAnimationFrame(() => {
      this.measureContent();
      if (this.isOpen && this.isFirstOpen) {
        this.isFirstOpen = false;
      }
    });
  }

  private measureContent(): void {
    if (this.contentRef) {
      this.contentHeight = this.contentRef.scrollHeight;
    }
  }

  private toggle = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.scheduleMeasure();
    }
    this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: this.isOpen, bubbles: true, composed: true }),
    );
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    this.toggle();
  };

  private get roleValue() {
    return this.role ?? this.appState?.role ?? "";
  }

  private get durationCss() {
    return this.duration !== undefined ? `${this.duration / 1000}s` : undefined;
  }

  render() {
    const wrapperAttrs = getCollapseAttrs({
      role: this.roleValue,
      open: this.isOpen,
      disabled: this.disabled,
    });
    const triggerAttrs = getCollapseTriggerAttrs({
      open: this.isOpen,
      disabled: this.disabled,
    });
    const contentAttrs = getCollapseContentAttrs({
      transition: !this.isFirstOpen,
      duration: this.durationCss,
      height: this.isOpen ? `${this.contentHeight}px` : "0px",
    });
    const innerClass = getCollapseContentInnerClass();

    return html`
      <div class=${attrsClass(wrapperAttrs)}>
        <div
          class=${attrsClass(triggerAttrs)}
          role="button"
          tabindex="0"
          @pointerup=${this.toggle}
          @keydown=${this.onKeydown}
        >
          <slot name="trigger"></slot>
        </div>
        <div
          class=${attrsClass(contentAttrs)}
          style=${attrsStyle(contentAttrs)}
          @transitionend=${() => undefined}
        >
          <div class=${innerClass}>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
