import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  DROPDOWN_DEFAULT_PROPS,
  getDropdownAttrs,
  getDropdownPanelAttrs,
  type AppProviderState,
  type DropdownPlacement,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Dropdown extends ToifeElement {
  static readonly tagName = "t-dropdown";

  @property({ type: Boolean, attribute: "model-value" }) modelValue: boolean = DROPDOWN_DEFAULT_PROPS.modelValue;
  @property({ type: Boolean }) disabled: boolean = DROPDOWN_DEFAULT_PROPS.disabled;
  @property({ type: String }) placement: DropdownPlacement = DROPDOWN_DEFAULT_PROPS.placement;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) direction = "";
  @property({ type: String }) size: string = DROPDOWN_DEFAULT_PROPS.size;

  @state() private isOpen = false;

  private docPointerHandler = (e: PointerEvent) => this.onDocPointerDown(e);
  private docKeyHandler = (e: KeyboardEvent) => this.onDocKeydown(e);

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    document.addEventListener("pointerdown", this.docPointerHandler, true);
    document.addEventListener("keydown", this.docKeyHandler, true);
  }

  disconnectedCallback(): void {
    document.removeEventListener("pointerdown", this.docPointerHandler, true);
    document.removeEventListener("keydown", this.docKeyHandler, true);
    super.disconnectedCallback();
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has("modelValue")) {
      const prev = this.isOpen;
      this.isOpen = this.modelValue;
      if (this.isOpen && !prev) {
        this.dispatchEvent(new CustomEvent("open", { bubbles: true, composed: true }));
      } else if (!this.isOpen && prev) {
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
      }
    }
  }

  /** Toggle panel open state (Vue scoped-slot `toggle`). */
  toggle = (): void => {
    if (this.disabled) return;
    this.setOpen(!this.isOpen);
  };

  /** Close panel (Vue `close`). */
  close = (): void => {
    if (!this.isOpen) return;
    this.setOpen(false);
  };

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private setOpen(open: boolean): void {
    const prev = this.isOpen;
    this.isOpen = open;
    this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: open, bubbles: true, composed: true }),
    );
    if (open && !prev) {
      this.dispatchEvent(new CustomEvent("open", { bubbles: true, composed: true }));
    } else if (!open && prev) {
      this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
  }

  private onDocPointerDown = (e: PointerEvent) => {
    if (!this.isOpen) return;
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  };

  private onDocKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.isOpen) {
      e.preventDefault();
      this.close();
    }
  };

  private get wrapperAttrs() {
    const role = this.role ?? this.appState?.role ?? "";
    const shape = this.shape ?? this.appState?.shape ?? "";
    return getDropdownAttrs({
      role,
      shape,
      size: this.size,
      open: this.isOpen,
      disabled: this.disabled,
    });
  }

  render() {
    return html`
      <div class=${attrsClass(this.wrapperAttrs)}>
        <slot name="trigger"></slot>
        ${this.isOpen
          ? html`<div class=${attrsClass(getDropdownPanelAttrs({ placement: this.placement }))}>
              <slot></slot>
            </div>`
          : nothing}
      </div>
    `;
  }
}
