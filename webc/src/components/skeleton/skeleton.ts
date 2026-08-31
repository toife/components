import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  SKELETON_DEFAULT_PROPS,
  getSkeletonAttrs,
  type AppProviderState,
  type SkeletonProps,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

export class Skeleton extends ToifeElement {
  static readonly tagName = "t-skeleton";

  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) width: string = SKELETON_DEFAULT_PROPS.width;
  @property({ type: String }) height: string = SKELETON_DEFAULT_PROPS.height;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get skeletonAttrs() {
    return getSkeletonAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      width: this.width,
      height: this.height,
    });
  }

  render() {
    const attrs = this.skeletonAttrs;
    return html`<div class=${attrsClass(attrs)} style=${attrsStyle(attrs)}></div>`;
  }
}

export type { SkeletonProps };
