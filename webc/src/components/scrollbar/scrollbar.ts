import { html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { gesture, type GestureDownPayload, type GestureMovePayload } from "@toife/gesture";
import {
  APP_PROVIDER_STATE_KEY,
  SCROLLBAR_CLICK_AFTER_DRAG,
  SCROLLBAR_DEFAULT_PROPS,
  getScrollbarAttrs,
  getScrollbarContentAttrs,
  getScrollbarGeometry,
  getScrollbarMetrics,
  getScrollbarScrollFromDelta,
  getScrollbarScrollFromPoint,
  getScrollbarThumbAttrs,
  getScrollbarThumbSelector,
  getScrollbarTrackAttrs,
  getScrollbarWheelScale,
  hasScrollbarAxis,
  type AppProviderState,
  type ScrollbarAxis,
  type ScrollbarDirection,
  type ScrollbarMetrics,
  type ScrollbarProps,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

type GestureHandle = { destroy: () => void };

export class Scrollbar extends ToifeElement {
  static readonly tagName = "t-scrollbar";

  @property({ type: String }) direction: ScrollbarDirection = SCROLLBAR_DEFAULT_PROPS.direction;
  @property({ type: Number }) size: number = SCROLLBAR_DEFAULT_PROPS.size;
  @property({ type: Number, attribute: "thumb-size" }) thumbSize: number = SCROLLBAR_DEFAULT_PROPS.thumbSize;
  @property({ type: Number, attribute: "min-thumb" }) minThumb: number = SCROLLBAR_DEFAULT_PROPS.minThumb;
  @property({ type: Boolean, attribute: "auto-hide" }) autoHide: boolean = SCROLLBAR_DEFAULT_PROPS.autoHide;
  @property({ type: Number, attribute: "hide-delay" }) hideDelay: number = SCROLLBAR_DEFAULT_PROPS.hideDelay;
  @property({ type: String }) role = "";

  @state() private dragging: ScrollbarAxis | null = null;
  @state() private hovered = false;
  @state() private scrolling = false;

  @query("[data-scrollport]") private content?: HTMLElement;

  private metrics: ScrollbarMetrics = {
    clientWidth: 0,
    clientHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    scrollLeft: 0,
    scrollTop: 0,
  };

  private sessions: Partial<Record<ScrollbarAxis, GestureHandle>> = {};
  private frame = 0;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private dragOrigin = 0;
  private dragEndAt = Number.NEGATIVE_INFINITY;
  private userSelect = "";
  private thumbSelector = getScrollbarThumbSelector();

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  disconnectedCallback(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.syncTrack("y", null);
    this.syncTrack("x", null);
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    window.removeEventListener("resize", this.schedule);
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    if (!this.content) return;
    this.resizeObserver = new ResizeObserver(() => this.schedule());
    this.mutationObserver = new MutationObserver(() => {
      this.observeContent();
      this.schedule();
    });
    this.mutationObserver.observe(this.content, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    this.observeContent();
    window.addEventListener("resize", this.schedule);
    this.measure();
    requestAnimationFrame(() => this.schedule());
  }

  updated(): void {
    this.syncTrack("y", this.hasVertical ? (this.querySelector('[data-axis="y"]') as HTMLElement | null) : null);
    this.syncTrack("x", this.hasHorizontal ? (this.querySelector('[data-axis="x"]') as HTMLElement | null) : null);
  }

  /** Re-measure after a change no observer can see. */
  update = (): void => {
    this.schedule();
  };

  /** The element that actually scrolls. */
  get scrollport(): HTMLElement | undefined {
    return this.content;
  }

  get scrollMetrics(): ScrollbarMetrics {
    return this.metrics;
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get hasVertical() {
    return hasScrollbarAxis("y", this.direction, this.metrics);
  }

  private get hasHorizontal() {
    return hasScrollbarAxis("x", this.direction, this.metrics);
  }

  private inset(axis: ScrollbarAxis) {
    const opposite = axis === "y" ? this.hasHorizontal : this.hasVertical;
    return opposite ? this.size : 0;
  }

  private geometry(axis: ScrollbarAxis) {
    return getScrollbarGeometry(axis, this.metrics, {
      inset: this.inset(axis),
      minThumb: this.minThumb,
    });
  }

  private get isVisible() {
    return !this.autoHide || this.hovered || this.dragging !== null || this.scrolling;
  }

  private get scrollbarAttrs() {
    return getScrollbarAttrs({
      role: this.role || this.appState?.role || "",
      size: this.size,
      thumbSize: this.thumbSize,
      visible: this.isVisible,
      dragging: this.dragging !== null,
    });
  }

  private schedule = (): void => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.measure();
    });
  };

  private measure = (): void => {
    if (!this.content) return;
    Object.assign(this.metrics, getScrollbarMetrics(this.content));
  };

  private observeContent(): void {
    if (!this.content || !this.resizeObserver) return;
    this.resizeObserver.disconnect();
    this.resizeObserver.observe(this.content);
    Array.from(this.content.children).forEach((child) => this.resizeObserver?.observe(child));
  }

  private reveal(): void {
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.scrolling = true;
    this.hideTimer = setTimeout(() => {
      this.scrolling = false;
    }, this.hideDelay);
  }

  private trackFor(axis: ScrollbarAxis) {
    return this.querySelector(`[data-axis="${axis}"]`) as HTMLElement | null;
  }

  private isOnThumb(target: EventTarget | null) {
    return target instanceof Element && !!target.closest(this.thumbSelector);
  }

  private scrollAxisTo(axis: ScrollbarAxis, value: number, behavior: ScrollBehavior) {
    this.content?.scrollTo(axis === "y" ? { top: value, behavior } : { left: value, behavior });
  }

  private onScroll = (event: Event) => {
    if (!this.content) return;
    this.metrics.scrollLeft = this.content.scrollLeft;
    this.metrics.scrollTop = this.content.scrollTop;
    this.schedule();
    this.reveal();
    this.dispatchEvent(new CustomEvent("scroll", { detail: event, bubbles: true, composed: true }));
  };

  private onWheel = (event: WheelEvent) => {
    if (!this.content) return;
    const scale = getScrollbarWheelScale(event.deltaMode, this.content.clientHeight);
    event.preventDefault();
    this.content.scrollBy({
      top: event.deltaY * scale,
      left: event.deltaX * scale,
      behavior: "instant",
    });
  };

  private scrollToPoint(axis: ScrollbarAxis, clientX: number, clientY: number, behavior: ScrollBehavior) {
    const track = this.trackFor(axis);
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const point = axis === "y" ? clientY - rect.top : clientX - rect.left;
    this.scrollAxisTo(axis, getScrollbarScrollFromPoint(this.geometry(axis), point), behavior);
  }

  private onTrackClick = (axis: ScrollbarAxis) => (event: MouseEvent) => {
    if (this.dragging) return;
    if (performance.now() - this.dragEndAt < SCROLLBAR_CLICK_AFTER_DRAG) return;
    if (this.isOnThumb(event.target)) return;
    this.scrollToPoint(axis, event.clientX, event.clientY, "smooth");
  };

  private startDrag = (axis: ScrollbarAxis, { startX, startY, event }: GestureDownPayload) => {
    if (!this.content) return;
    if (!this.isOnThumb(event.target)) {
      this.scrollToPoint(axis, startX, startY, "instant");
    }
    this.dragging = axis;
    this.dragOrigin = axis === "y" ? this.content.scrollTop : this.content.scrollLeft;
    this.userSelect = this.content.style.userSelect;
    this.content.style.userSelect = "none";
  };

  private moveDrag = (axis: ScrollbarAxis, { deltaX, deltaY }: GestureMovePayload) => {
    const delta = axis === "y" ? deltaY : deltaX;
    const value = getScrollbarScrollFromDelta(this.geometry(axis), this.dragOrigin, delta);
    this.scrollAxisTo(axis, value, "instant");
  };

  private endDrag = () => {
    if (this.content) this.content.style.userSelect = this.userSelect;
    this.dragging = null;
    this.dragEndAt = performance.now();
    this.reveal();
  };

  private syncTrack(axis: ScrollbarAxis, element: HTMLElement | null) {
    this.sessions[axis]?.destroy();
    delete this.sessions[axis];
    if (!element) return;

    this.sessions[axis] = gesture(
      element,
      {
        options: { minMove: 1, trackOutsideElement: true },
        down: (payload) => this.startDrag(axis, payload),
        move: (payload) => {
          payload.event.preventDefault();
          this.moveDrag(axis, payload);
        },
        up: this.endDrag,
        cancel: this.endDrag,
      },
      { move: { passive: false } },
    );
  }

  render() {
    const contentAttrs = getScrollbarContentAttrs();

    return html`
      <div
        class=${attrsClass(this.scrollbarAttrs)}
        @pointerenter=${() => {
          this.hovered = true;
        }}
        @pointerleave=${() => {
          this.hovered = false;
        }}
      >
        <div class=${attrsClass(contentAttrs)} data-scrollport @scroll=${this.onScroll}>
          <slot></slot>
        </div>

        ${this.hasVertical
          ? html`
              <div
                class=${attrsClass(this.trackAttrs("y"))}
                data-axis="y"
                aria-hidden="true"
                @click=${this.onTrackClick("y")}
                @wheel=${this.onWheel}
              >
                <div class=${attrsClass(this.thumbAttrs("y"))} style=${attrsStyle(this.thumbAttrs("y"))}></div>
              </div>
            `
          : nothing}
        ${this.hasHorizontal
          ? html`
              <div
                class=${attrsClass(this.trackAttrs("x"))}
                data-axis="x"
                aria-hidden="true"
                @click=${this.onTrackClick("x")}
                @wheel=${this.onWheel}
              >
                <div class=${attrsClass(this.thumbAttrs("x"))} style=${attrsStyle(this.thumbAttrs("x"))}></div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private trackAttrs(axis: ScrollbarAxis) {
    return getScrollbarTrackAttrs({ axis, inset: this.inset(axis) });
  }

  private thumbAttrs(axis: ScrollbarAxis) {
    const { thumb, offset } = this.geometry(axis);
    return getScrollbarThumbAttrs({ length: thumb, offset });
  }
}

export type { ScrollbarProps };
