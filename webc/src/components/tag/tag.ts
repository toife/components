import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  TAG_DEFAULT_PROPS,
  getTagAttrs,
  type AppProviderState,
  type TagVariant,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Tag extends ToifeElement {
  static readonly tagName = "t-tag";

  @property({ type: String }) role = "";
  @property({ type: String }) size: string = TAG_DEFAULT_PROPS.size;
  @property({ type: String }) shape = "";
  @property({ type: String }) variant: TagVariant = TAG_DEFAULT_PROPS.variant;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get tagAttrs() {
    return getTagAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
      variant: this.variant,
    });
  }

  render() {
    return html`<span class=${attrsClass(this.tagAttrs)}><slot></slot></span>`;
  }
}
