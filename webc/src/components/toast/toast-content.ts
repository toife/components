import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  TOAST_CONTENT_DEFAULT_PROPS,
  getToastContentAttrs,
  type AppProviderState,
  type ToastContentProps,
  type ToastContentVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class ToastContent extends ToifeElement {
  static readonly tagName = "t-toast-content";

  @property({ type: Number, attribute: "toast-id" }) toastId = 0;
  @property({ type: String }) message = TOAST_CONTENT_DEFAULT_PROPS.message;
  @property({ type: Number }) duration: number = TOAST_CONTENT_DEFAULT_PROPS.duration;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) variant: ToastContentVariant = TOAST_CONTENT_DEFAULT_PROPS.variant;
  @property({ type: String }) placement = "";

  @state() private isClosing = false;

  private closeTimer?: ReturnType<typeof setTimeout>;
  private dismissTimer?: ReturnType<typeof setTimeout>;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.closeTimer = setTimeout(() => {
      this.isClosing = true;
      this.dismissTimer = setTimeout(() => {
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
      }, 500);
    }, this.duration);
  }

  disconnectedCallback(): void {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (this.dismissTimer) clearTimeout(this.dismissTimer);
    super.disconnectedCallback();
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get contentAttrs() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";
    return getToastContentAttrs({
      role,
      shape,
      variant: this.variant,
      closing: this.isClosing,
    });
  }

  render() {
    return html`<div class=${attrsClass(this.contentAttrs)}>${this.message}</div>`;
  }
}

export type { ToastContentProps };
