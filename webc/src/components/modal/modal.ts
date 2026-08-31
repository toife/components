import { html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  gesture as toifeGesture,
  type GestureFastPayload,
  type GestureMovePayload,
  type GestureUpPayload,
} from "@toife/gesture";
import {
  APP_PROVIDER_STATE_KEY,
  MODAL_DEFAULT_PROPS,
  SCROLLABLE_OVERFLOW_VALUES,
  getModalAttrs,
  type AppProviderState,
  type ModalProps,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";
import { Present } from "../present/present";

type GestureHandle = { destroy: () => void };

export class Modal extends ToifeElement {
  static readonly tagName = "t-modal";

  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: Boolean }) visible: boolean = MODAL_DEFAULT_PROPS.visible;
  @property({ type: Boolean }) gesture: boolean = MODAL_DEFAULT_PROPS.gesture;
  @property({ type: Boolean }) fullscreen: boolean = MODAL_DEFAULT_PROPS.fullscreen;
  @property({ type: String }) placement: string = MODAL_DEFAULT_PROPS.placement;
  @property({ type: Boolean }) keepalive: boolean = MODAL_DEFAULT_PROPS.keepalive;
  @property({ type: String }) backdrop: string = MODAL_DEFAULT_PROPS.backdrop;
  @property({ type: Boolean }) indicator: boolean = MODAL_DEFAULT_PROPS.indicator;
  @property({ type: Number }) duration: number = MODAL_DEFAULT_PROPS.duration;
  @property({ attribute: "class-name" }) className = "";
  @property({ attribute: false }) overlayStyle?: unknown;
  @property({ attribute: false }) bounce: number | string = MODAL_DEFAULT_PROPS.bounce;

  @state() private isBusy = false;
  @state() private isMoving = false;

  @query("t-present") private presentEl?: Present;

  private ges?: GestureHandle;
  private modalEl?: HTMLElement;
  private busyTimer?: ReturnType<typeof setTimeout>;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  disconnectedCallback(): void {
    this.destroyGesture();
    if (this.busyTimer) clearTimeout(this.busyTimer);
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues): void {
    if (changed.has("visible") || changed.has("gesture") || changed.has("placement")) {
      this.syncGesture();
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get gestureDir(): string | undefined {
    if (this.placement === "bottom") return "down";
    if (this.placement === "top") return "up";
    if (this.placement === "left") return "left";
    if (this.placement === "right") return "right";
    return undefined;
  }

  private get modalAttrs() {
    const shape = this.shape || this.appState?.shape || "";
    const role = this.role || this.appState?.role || "";
    return getModalAttrs({
      role,
      shape,
      placement: this.placement,
      fullscreen: this.fullscreen,
      className: this.className,
      style: this.overlayStyle,
    });
  }

  private onClose = (e: CustomEvent<string>) => {
    this.dispatchEvent(new CustomEvent("close", { detail: e.detail, bubbles: true, composed: true }));
  };

  private hasScrollableOverflow(value: string): boolean {
    return (SCROLLABLE_OVERFLOW_VALUES as readonly string[]).includes(value);
  }

  private isScrollable(el: HTMLElement, axis: "x" | "y"): boolean {
    const style = getComputedStyle(el);
    if (axis === "y") {
      return el.scrollHeight > el.clientHeight && this.hasScrollableOverflow(style.overflowY);
    }
    return el.scrollWidth > el.clientWidth && this.hasScrollableOverflow(style.overflowX);
  }

  private hasRemainingScroll(el: HTMLElement, direction: "up" | "down" | "left" | "right"): boolean {
    if (direction === "down") return el.scrollTop > 0;
    if (direction === "up") return el.scrollTop < el.scrollHeight - el.clientHeight;
    if (direction === "right") return el.scrollLeft > 0;
    return el.scrollLeft < el.scrollWidth - el.clientWidth;
  }

  private canStartGesture(e: unknown): boolean {
    if (!this.modalEl || !this.gestureDir) return true;
    const target = (e as { target?: EventTarget }).target;
    if (!(target instanceof Element)) return true;

    const axis = this.gestureDir === "left" || this.gestureDir === "right" ? "x" : "y";
    let current: Element | null = target;

    while (current && current !== this.modalEl) {
      if (current instanceof HTMLElement && this.isScrollable(current, axis)) {
        if (this.hasRemainingScroll(current, this.gestureDir as "up" | "down" | "left" | "right")) {
          return false;
        }
      }
      current = current.parentElement;
    }
    return true;
  }

  private busy(): void {
    this.isBusy = true;
    this.busyTimer = setTimeout(() => {
      this.isBusy = false;
    }, 300);
  }

  private destroyGesture(): void {
    this.ges?.destroy();
    this.ges = undefined;
  }

  private syncGesture(): void {
    this.destroyGesture();
    this.modalEl = this.presentEl?.getContentHost()?.querySelector(".t-modal") as HTMLElement | undefined;
    if (!this.modalEl) return;

    this.ges = toifeGesture(this.modalEl, {
      options: { minDist: 30 },
      beforeEvent: (e: Event) => {
        if (this.isBusy || !this.gesture || this.placement === "center") return false;
        if (!this.canStartGesture(e)) return false;
        return true;
      },
      down: () => {
        this.isMoving = false;
      },
      fast: ({ initialDirection }: GestureFastPayload) => {
        this.busy();
        if (initialDirection === this.gestureDir) {
          this.dispatchEvent(new CustomEvent("close", { detail: "gesture", bubbles: true, composed: true }));
        } else {
          this.presentEl?.open();
        }
      },
      move: ({ deltaY, deltaX, initialDirection }: GestureMovePayload) => {
        if (initialDirection !== this.gestureDir) return;
        let tv = 0;
        if (this.placement === "bottom" || this.placement === "top") tv = deltaY;
        else tv = deltaX;

        if (this.placement === "bottom") tv = deltaY > 0 ? deltaY : 0;
        if (this.placement === "top") tv = deltaY < 0 ? deltaY : 0;
        if (this.placement === "left") tv = deltaX < 0 ? deltaX : 0;
        if (this.placement === "right") tv = deltaX > 0 ? deltaX : 0;

        if (
          (this.placement === "bottom" && (tv >= 10 || this.isMoving)) ||
          (this.placement === "top" && (tv <= -10 || this.isMoving)) ||
          (this.placement === "left" && (tv <= -10 || this.isMoving)) ||
          (this.placement === "right" && (tv >= 10 || this.isMoving))
        ) {
          this.isMoving = true;
          this.presentEl?.render({
            presentTranslate: `${tv}px`,
            presentTransitionDuration: "0s",
          });
        }
      },
      up: ({ deltaY, deltaX, initialDirection }: GestureUpPayload) => {
        this.isMoving = false;
        this.busy();
        if (initialDirection !== this.gestureDir) {
          this.presentEl?.open();
          return;
        }

        let size: number;
        let val: number;
        if (this.placement === "bottom" || this.placement === "top") {
          size = this.modalEl!.offsetHeight;
          val = deltaY;
        } else {
          size = this.modalEl!.offsetWidth;
          val = deltaX;
        }

        const diff = (val / size) * 100;
        if (diff > 50) {
          this.dispatchEvent(new CustomEvent("close", { detail: "gesture", bubbles: true, composed: true }));
        } else {
          this.presentEl?.open();
        }
      },
      cancel: () => {
        this.isMoving = false;
        this.busy();
        this.presentEl?.open();
      },
    });
  }

  render() {
    return html`
      <t-present
        .duration=${this.duration}
        .bounce=${this.bounce}
        class-name=${this.className}
        .placement=${this.placement}
        backdrop=${this.backdrop}
        .visible=${this.visible}
        .keepalive=${this.keepalive}
        .overlayStyle=${this.overlayStyle}
        @close=${this.onClose}
      >
        <slot name="extra" slot="extra"></slot>
        ${this.gesture && this.indicator && this.placement !== "center"
          ? html`<t-gesture-indicator .placement=${this.placement}></t-gesture-indicator>`
          : nothing}
        <div class=${attrsClass(this.modalAttrs as import("../../shared").CoreAttrs)}>
          <slot></slot>
        </div>
      </t-present>
    `;
  }
}

export type { ModalProps };
