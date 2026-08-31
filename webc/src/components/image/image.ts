import { html } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import { APP_PROVIDER_STATE_KEY, type AppProviderState, type ImageProps } from "@/core";
import { inject, ToifeElement } from "../../shared";

export class Image extends ToifeElement {
  static readonly tagName = "t-image";

  @property({ type: String }) src = "";
  @property({ type: String, attribute: "default-src" }) defaultSrc = "";

  @state() private dataSrc = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.dataSrc = this.src ?? "";
  }

  willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("src")) {
      this.dataSrc = this.src ?? "";
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get resolvedDefaultSrc(): string {
    const appData = this.appState?.data as { errorImageUrl?: string } | undefined;
    return this.defaultSrc || appData?.errorImageUrl || "";
  }

  private onError = () => {
    if (this.resolvedDefaultSrc) {
      this.dataSrc = this.resolvedDefaultSrc;
    }
  };

  render() {
    return html`<img src=${this.dataSrc} @error=${this.onError} />`;
  }
}

export type { ImageProps };
