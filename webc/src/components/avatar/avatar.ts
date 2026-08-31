import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  AVATAR_DEFAULT_PROPS,
  getAvatarAttrs,
  type AppProviderState,
  type AvatarProps,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

export class Avatar extends ToifeElement {
  static readonly tagName = "t-avatar";

  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = AVATAR_DEFAULT_PROPS.size;
  @property({ type: String }) src: string = AVATAR_DEFAULT_PROPS.src;
  @property({ type: Boolean, reflect: true }) divider?: boolean;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get effectiveDivider(): boolean {
    if (this.hasAttribute("divider")) return this.divider ?? false;
    return this.appState?.divider ?? false;
  }

  private get avatarAttrs() {
    return getAvatarAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      divider: this.effectiveDivider,
      size: this.size,
      src: this.src,
    });
  }

  render() {
    const attrs = this.avatarAttrs;
    return html`
      <div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}>
        <slot></slot>
      </div>
    `;
  }
}

export type { AvatarProps };
