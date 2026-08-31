import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  gesture as toifeGesture,
  type GestureFastPayload,
  type GestureMovePayload,
  type GestureUpPayload,
} from "@toife/gesture";
import {
  ROUTE_NAVIGATOR_DEFAULT_PROPS,
  ROUTE_PROVIDER_STATE_KEY,
  getRouteNavigatorAttrs,
  getRouteNavigatorBackdropAttrs,
  getRouteNavigatorComponentAttrs,
  type RouteNavigatorGesture,
  type RouteNavigatorTransformState,
  type RouteNavigatorProps,
  type RouteProviderState,
  type RouteStack,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../../shared";
import type { RouterLike } from "../router-like";
import { clone } from "../route.util";

const BACK_LAYER_PEEK_PCT = -40;

type GestureHandle = { destroy: () => void };

export class RouteNavigator extends ToifeElement {
  static readonly tagName = "t-route-navigator";

  @property({ type: String }) direction: string = ROUTE_NAVIGATOR_DEFAULT_PROPS.direction;
  @property({ type: String }) variant: string = ROUTE_NAVIGATOR_DEFAULT_PROPS.variant;
  @property({ type: Boolean }) keepalive: boolean = ROUTE_NAVIGATOR_DEFAULT_PROPS.keepalive;
  @property({ type: Boolean }) gesture: boolean = ROUTE_NAVIGATOR_DEFAULT_PROPS.gesture;
  @property({ type: String }) name = "";
  @property({ attribute: false }) router?: RouterLike;

  @state() private stack: RouteStack[] = [];
  @state() private activeIndex = 0;
  @state() private backdropIndex = 0;

  @query("[data-navigator]") private navigatorEl?: HTMLElement;

  private transform: RouteNavigatorTransformState = {
    back: BACK_LAYER_PEEK_PCT,
    prepare: 100,
    active: 0,
    backdrop: 0,
    duration: undefined,
  };

  private ges?: GestureHandle;
  private lastProviderStack?: RouteStack[];

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(ROUTE_PROVIDER_STATE_KEY);
  }

  disconnectedCallback(): void {
    this.ges?.destroy();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    const provider = inject<RouteProviderState>(this, ROUTE_PROVIDER_STATE_KEY);
    this.changeRoute(clone(provider?.stack ?? []));
    this.initGesture();
  }

  updated(changed: PropertyValues): void {
    if (changed.has("direction") || changed.has("variant") || changed.has("gesture")) {
      this.ges?.destroy();
      this.initGesture();
    }

    const provider = inject<RouteProviderState>(this, ROUTE_PROVIDER_STATE_KEY);
    if (provider?.stack && provider.stack !== this.lastProviderStack) {
      this.lastProviderStack = provider.stack;
      this.changeRoute(clone(provider.stack));
    }
  }

  private get navigatorAttrs() {
    return getRouteNavigatorAttrs({
      direction: this.direction,
      variant: this.variant as "none" | "swipe" | "fade",
      moving: this.transform.active !== 0,
      transform: this.transform,
    });
  }

  private get componentAttrs() {
    return getRouteNavigatorComponentAttrs({ direction: this.direction });
  }

  private get backdropAttrs() {
    return getRouteNavigatorBackdropAttrs({ zIndex: this.backdropIndex * 2 + 99 });
  }

  private get prevPage(): RouteStack | null {
    if (this.activeIndex > 0) {
      return this.stack.at(this.activeIndex - 1) ?? null;
    }
    return null;
  }

  private get isGestureEnabled() {
    return this.variant === "swipe" && this.gesture && !!this.prevPage;
  }

  private emitTransform(): void {
    this.dispatchEvent(
      new CustomEvent("transform", { detail: { ...this.transform }, bubbles: true, composed: true }),
    );
  }

  private changeRoute(value: RouteStack[]): void {
    const data = clone(value);

    if (this.stack.length === 0) {
      this.stack = data;
      this.activeIndex = Math.max(0, data.length - 1);
      this.backdropIndex = this.activeIndex;
      return;
    }

    if (this.stack.length === data.length) {
      this.stack = data;
      return;
    }

    if (data.length < this.stack.length) {
      this.transform.duration = undefined;
      this.transform.active = 0;
      this.transform.back = BACK_LAYER_PEEK_PCT;
      this.transform.prepare = 100;
      this.transform.backdrop = 0;
      this.emitTransform();

      this.activeIndex = Math.max(0, data.length - 1);
      this.backdropIndex = this.activeIndex;

      setTimeout(() => {
        this.stack = data;
      }, 400);
      return;
    }

    if (data.length > this.stack.length) {
      this.stack = data;
      setTimeout(() => {
        this.activeIndex = Math.max(0, data.length - 1);
        this.backdropIndex = this.activeIndex;
      }, 50);
    }
  }

  private commitGestureBack(): void {
    if (this.activeIndex <= 0) return;
    const durationMs = 250;
    this.transform.duration = `${durationMs / 1000}s`;
    this.transform.active = 100;
    this.transform.back = 0;
    this.transform.backdrop = 0;
    this.emitTransform();
    setTimeout(() => this.goBack(), durationMs);
  }

  private goBack(): void {
    if (this.activeIndex <= 0) return;
    this.router?.back();
  }

  private resetTransform(): void {
    this.transform.back = BACK_LAYER_PEEK_PCT;
    this.transform.prepare = 100;
    this.transform.active = 0;
    this.transform.duration = undefined;
    this.emitTransform();
  }

  private move(data: RouteNavigatorGesture): void {
    const width = this.navigatorEl?.offsetWidth ?? 0;
    let activePercent = 0;

    if (this.direction === "left" || this.direction === "right") {
      activePercent = (Math.abs(data.deltaX) / width) * 100;
    } else {
      activePercent = (Math.abs(data.deltaY) / width) * 100;
    }

    this.transform.back = ((100 - activePercent) * BACK_LAYER_PEEK_PCT) / 100;
    this.transform.active = activePercent;
    this.transform.backdrop = 100 - this.transform.active;
    this.transform.duration = "0s";
    this.emitTransform();
  }

  private up(data: RouteNavigatorGesture): void {
    const width = this.navigatorEl?.offsetWidth ?? 0;
    let percent = 0;

    if (this.direction === "left" || this.direction === "right") {
      percent = (Math.abs(data.deltaX) / width) * 100;
    } else {
      percent = (Math.abs(data.deltaY) / width) * 100;
    }

    if (percent >= 60) {
      this.commitGestureBack();
    } else {
      this.resetTransform();
    }
  }

  private initGesture(): void {
    if (!this.navigatorEl) return;

    this.ges = toifeGesture(
      this.navigatorEl,
      {
        options: { trackOutsideElement: true },
        beforeEvent: (e: Event) => {
          const target = e.target as HTMLElement | null;
          const isEditable = target?.closest("input, textarea, select, button, [contenteditable]");
          if (isEditable || !this.isGestureEnabled) return false;
          e.stopPropagation();
          return true;
        },
        fast: ({ initialDirection }: GestureFastPayload) => {
          if (!initialDirection || initialDirection !== this.direction) return;
          this.commitGestureBack();
        },
        move: ({ deltaX, deltaY, initialDirection, event }: GestureMovePayload) => {
          if (!initialDirection || initialDirection !== this.direction) return;
          if (event.cancelable) event.preventDefault();
          this.move({ deltaX, deltaY });
        },
        up: ({ deltaX, deltaY, initialDirection }: GestureUpPayload) => {
          if (!initialDirection || initialDirection !== this.direction) return;
          this.up({ deltaX, deltaY });
        },
        cancel: () => {
          this.resetTransform();
        },
      },
      {
        element: { passive: false },
        move: { passive: false },
      },
    );
  }

  render() {
    return html`
      <div class=${attrsClass(this.navigatorAttrs)} style=${attrsStyle(this.navigatorAttrs)} data-navigator>
        ${this.stack.map((item, index) => {
          const layerAttrs = {
            ...this.componentAttrs,
            class: [
              this.componentAttrs.class,
              {
                active: index === this.activeIndex,
                prepare: index === this.activeIndex + 1,
                back: index === this.activeIndex - 1,
              },
            ],
          };
          return html`
            <div class=${attrsClass(layerAttrs)} style=${`z-index:${index * 2 + 100}`} name=${item.name}>
              <t-route-provider .stack=${item.stack}>
                <t-route-outlet .component=${item.component}></t-route-outlet>
              </t-route-provider>
            </div>
          `;
        })}
        <div class=${attrsClass(this.backdropAttrs)} style=${attrsStyle(this.backdropAttrs)}></div>
      </div>
    `;
  }
}

export type { RouteNavigatorProps };
