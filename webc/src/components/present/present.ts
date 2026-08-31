import { html, nothing, render } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  PRESENT_DEFAULT_PROPS,
  PRESENT_DEFAULT_STYLES,
  getAppClassSelector,
  getPresentAttrs,
  getPresentBackdropAttrs,
  type AppProviderState,
  type PresentPlacement,
  type PresentProps,
  type PresentStyles,
  type RenderOptions,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";
import { usePresent } from "./present.controller";

type BackdropMode = "display" | "none" | "transparent";

export class Present extends ToifeElement {
  static readonly tagName = "t-present";

  @property({ type: Boolean }) keepalive: boolean = PRESENT_DEFAULT_PROPS.keepalive;
  @property({ type: Boolean }) visible: boolean = PRESENT_DEFAULT_PROPS.visible;
  @property({ type: String }) backdrop: BackdropMode = PRESENT_DEFAULT_PROPS.backdrop;
  @property({ type: String }) placement: PresentPlacement = PRESENT_DEFAULT_PROPS.placement;
  @property({ type: String }) teleport = "";
  @property({ type: Number }) duration: number = PRESENT_DEFAULT_PROPS.duration;
  @property({ attribute: "class-name" }) className = "";
  @property({ attribute: false }) overlayStyle?: unknown;
  @property({ attribute: false }) bounce: number | string | boolean = PRESENT_DEFAULT_PROPS.bounce;

  @state() private isBounced = false;
  @state() private zIndex = 0;
  @state() private isShow = false;
  @state() private isReadyBackdrop = false;
  @state() private isTeleportReady = false;

  private readonly styles: PresentStyles = { ...PRESENT_DEFAULT_STYLES };
  private portalRoot?: HTMLDivElement;
  private presentContentHost?: HTMLDivElement;
  private backdropReadyTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private openDelayTimer?: ReturnType<typeof setTimeout>;
  private bounceTimer?: ReturnType<typeof setTimeout>;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.portalRoot = document.createElement("div");
    this.syncTeleportReady();
    if (this.visible) {
      this.createIndex();
      this.isShow = true;
      this.openDelayTimer = setTimeout(() => this.open(), 100);
    } else {
      this.close();
    }
  }

  disconnectedCallback(): void {
    this.clearTimers();
    if (this.portalRoot) {
      render(nothing, this.portalRoot);
      this.portalRoot.remove();
    }
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues): void {
    if (changed.has("teleport")) {
      this.syncTeleportReady();
    }

    if (changed.has("visible")) {
      if (this.visible) {
        this.createIndex();
        this.isShow = true;
        this.openDelayTimer = setTimeout(() => this.open(), 100);
      } else {
        this.close();
        this.hideTimer = setTimeout(() => {
          this.isShow = false;
          this.renderPortal();
        }, this.duration);
      }
    }

    this.syncPortalTarget();
    this.renderPortal();
  }

  firstUpdated(): void {
    if (!this.isTeleportReady) {
      requestAnimationFrame(() => {
        this.syncTeleportReady();
        this.syncPortalTarget();
        this.renderPortal();
      });
    }
  }

  /** Host element for teleported slot content (used by Modal gesture setup). */
  getContentHost(): HTMLElement | undefined {
    return this.presentContentHost;
  }

  /** Vue-compatible `render()` — also serves as Lit template when called with no args. */
  render(options?: RenderOptions) {
    if (options !== undefined) {
      this.applyRender(options);
      return nothing;
    }
    return nothing;
  }

  private applyRender(options: RenderOptions): void {
    if (options.backdropTransitionDuration !== undefined) {
      this.styles.backdropTransitionDuration = options.backdropTransitionDuration;
    }
    if (options.presentTransitionDuration !== undefined) {
      this.styles.presentTransitionDuration = options.presentTransitionDuration;
    }
    if (options.backdropOpacity !== undefined) {
      this.styles.backdropOpacity = options.backdropOpacity;
    }
    if (options.presentTranslate !== undefined) {
      this.styles.presentTranslate = options.presentTranslate;
    }
    if (options.presentOpacity !== undefined) {
      this.styles.presentOpacity = options.presentOpacity;
    }
    this.renderPortal();
  }

  open = (): void => {
    this.backdropReadyTimer = setTimeout(() => {
      this.isReadyBackdrop = true;
      this.renderPortal();
    }, 300);

    const time = `${this.duration / 1000}s`;

    if (this.bounce && !this.isBounced) {
      this.isBounced = true;
      let presentTranslate: string | number = this.bounce as string | number;
      if (typeof this.bounce === "boolean") {
        presentTranslate = "16px";
      }
      if (this.placement === "bottom" || this.placement === "right") {
        presentTranslate = `calc(${this.bounce} * -1)`;
      }

      this.applyRender({
        backdropTransitionDuration: time,
        backdropOpacity: undefined,
        presentTranslate: String(presentTranslate),
        presentTransitionDuration: time,
        presentOpacity: 1,
      });

      this.bounceTimer = setTimeout(() => {
        this.applyRender({ presentTranslate: "0px" });
      }, this.duration);
      return;
    }

    this.applyRender({
      backdropOpacity: undefined,
      backdropTransitionDuration: time,
      presentTranslate: "0px",
      presentTransitionDuration: time,
      presentOpacity: 1,
    });
  };

  close = (): void => {
    this.isReadyBackdrop = false;
    this.isBounced = false;
    const time = `${this.duration / 1000}s`;
    let presentTranslate = "0px";
    let presentOpacity = 1;

    if (this.placement === "bottom" || this.placement === "right") {
      presentTranslate = "100%";
    } else if (this.placement === "top" || this.placement === "left") {
      presentTranslate = "-100%";
    } else if (this.placement === "center") {
      presentTranslate = "0px";
      presentOpacity = 0;
    }

    this.applyRender({
      backdropOpacity: 0,
      backdropTransitionDuration: time,
      presentTranslate,
      presentTransitionDuration: time,
      presentOpacity,
    });
  };

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get timeCss() {
    return `${this.duration / 1000}s`;
  }

  private get isRender() {
    return this.isShow || this.keepalive;
  }

  private clearTimers(): void {
    if (this.backdropReadyTimer) clearTimeout(this.backdropReadyTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);
    if (this.openDelayTimer) clearTimeout(this.openDelayTimer);
    if (this.bounceTimer) clearTimeout(this.bounceTimer);
  }

  private createIndex(): void {
    if (this.zIndex === 0 || !this.keepalive) {
      this.zIndex = usePresent().newIndex();
    }
  }

  private syncTeleportReady(): void {
    if (this.teleport) {
      this.isTeleportReady = !!document.querySelector(this.teleport);
      return;
    }
    if (this.appState?.rootEl) {
      this.isTeleportReady = true;
      return;
    }
    this.isTeleportReady = !!document.querySelector(getAppClassSelector());
  }

  private resolveTeleportTarget(): HTMLElement | null {
    if (this.teleport) {
      return document.querySelector(this.teleport);
    }
    if (this.appState?.rootEl) {
      return this.appState.rootEl;
    }
    return document.querySelector(getAppClassSelector());
  }

  private syncPortalTarget(): void {
    if (!this.portalRoot) return;
    const target = this.resolveTeleportTarget();
    if (target && this.portalRoot.parentElement !== target) {
      target.appendChild(this.portalRoot);
    }
  }

  private onClickBackdrop = (e: Event) => {
    e.preventDefault();
    if (this.isReadyBackdrop) {
      this.dispatchEvent(new CustomEvent("close", { detail: "backdrop", bubbles: true, composed: true }));
    }
  };

  private adoptChildrenIntoPresent(): void {
    if (!this.presentContentHost) return;
    const nodes = Array.from(this.childNodes);
    for (const node of nodes) {
      this.presentContentHost.appendChild(node);
    }
  }

  private renderPortal(): void {
    if (!this.portalRoot) return;

    if (!this.isTeleportReady || !this.isRender) {
      render(nothing, this.portalRoot);
      this.presentContentHost = undefined;
      return;
    }

    const backdropAttrs = getPresentBackdropAttrs({
      zIndex: this.zIndex - 1,
      backdropTransitionDuration: this.styles.backdropTransitionDuration,
      backdropOpacity: this.backdrop === "transparent" ? 0 : this.styles.backdropOpacity,
    });

    const presentAttrs = getPresentAttrs({
      zIndex: this.zIndex,
      presentTransitionDuration: this.styles.presentTransitionDuration,
      presentTranslate: this.styles.presentTranslate,
      presentOpacity: this.styles.presentOpacity,
      className: this.className,
      placement: this.placement,
      style: this.overlayStyle,
    });

    render(
      html`
        ${this.backdrop !== "none"
          ? html`<div
              class=${attrsClass(backdropAttrs as import("../../shared").CoreAttrs)}
              style=${attrsStyle(backdropAttrs as import("../../shared").CoreAttrs)}
              ?hidden=${!this.isShow}
              @click=${this.onClickBackdrop}
            ></div>`
          : nothing}
        <div
          class=${attrsClass(presentAttrs as import("../../shared").CoreAttrs)}
          style=${attrsStyle(presentAttrs as import("../../shared").CoreAttrs)}
          ?hidden=${!this.isShow}
        ></div>
      `,
      this.portalRoot,
    );

    this.presentContentHost = this.portalRoot.lastElementChild as HTMLDivElement | undefined;
    this.adoptChildrenIntoPresent();
  }
}

export type { PresentProps };
