import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  TABS_DEFAULT_PROPS,
  TABS_PROVIDER_STATE_KEY,
  getTabsAttrs,
  getTabsHighlightPosition,
  getTabsHighlightStyle,
  type AppProviderState,
  type TabsPlacement,
  type TabsProviderState,
  type TabsProps,
  type TabsSize,
  type TabsVariant,
} from "@/core";
import { attrsClass, attrsStyle, inject, provideReactive, ToifeElement, type ContextNotifier } from "../../shared";

export class Tabs extends ToifeElement {
  static readonly tagName = "t-tabs";

  @property({ type: String }) placement: TabsPlacement = TABS_DEFAULT_PROPS.placement;
  @property({ type: String }) variant: TabsVariant = TABS_DEFAULT_PROPS.variant;
  @property({ type: String }) role = "";
  @property({ type: String, attribute: "model-value" }) modelValue = "";
  @property({ attribute: false }) border: number[] = [2, 0];
  @property({ attribute: false }) margin: number[] = [0, 0];
  @property({ type: String }) shape = "";
  @property({ type: Boolean }) transition: boolean = TABS_DEFAULT_PROPS.transition;
  @property({ type: String }) size: TabsSize = TABS_DEFAULT_PROPS.size;

  @state() private width = 0;
  @state() private height = 0;
  @state() private top = 0;
  @state() private left = 0;
  @state() private isFirstRender = true;

  @query("ul") private container?: HTMLUListElement;

  private readonly tabsState: TabsProviderState = {
    activeValue: "",
    role: "",
    shape: "",
    size: TABS_DEFAULT_PROPS.size,
    setValue: (val: string) => {
      this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: val, bubbles: true, composed: true }),
      );
    },
  };

  private notifier?: ContextNotifier;
  private resizeHandler = () => this.calcPosition();

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
    this.notifier = provideReactive(this, TABS_PROVIDER_STATE_KEY, this.tabsState);
    this.syncProviderState();
    window.addEventListener("resize", this.resizeHandler);
    setTimeout(() => {
      this.isFirstRender = false;
    }, 500);
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this.resizeHandler);
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues): void {
    if (
      changed.has("modelValue") ||
      changed.has("role") ||
      changed.has("shape") ||
      changed.has("size")
    ) {
      this.syncProviderState();
    }
    if (changed.has("modelValue")) {
      requestAnimationFrame(() => this.calcPosition());
    }
  }

  firstUpdated(): void {
    requestAnimationFrame(() => this.calcPosition());
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private syncProviderState(): void {
    this.tabsState.activeValue = this.modelValue || "";
    this.tabsState.role = this.role || this.appState?.role || "";
    this.tabsState.shape = this.shape || this.appState?.shape || "";
    this.tabsState.size = this.size;
    this.notifier?.notify();
  }

  private calcPosition = (): void => {
    if (!this.container) return;
    const active = this.container.querySelector(".active") as HTMLElement | null;
    if (!active) return;
    this.width = active.offsetWidth;
    this.height = active.offsetHeight;
    this.left =
      active.getBoundingClientRect().left -
      this.container.getBoundingClientRect().left +
      this.container.scrollLeft;
    this.top =
      active.getBoundingClientRect().top -
      this.container.getBoundingClientRect().top +
      this.container.scrollTop;
  };

  private get tabsAttrs() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";
    const highlight = getTabsHighlightPosition({
      top: this.top,
      left: this.left,
      width: this.width,
      height: this.height,
      margin: this.margin,
      border: this.border,
      variant: this.variant,
      placement: this.placement,
    });

    return {
      ...getTabsAttrs({
        role,
        shape,
        placement: this.placement,
        variant: this.variant,
        transition: this.isFirstRender ? false : this.transition,
      }),
      style: getTabsHighlightStyle({
        top: highlight.top,
        left: highlight.left,
        width: highlight.width,
        height: highlight.height,
        marginX: this.margin[1],
        marginY: this.margin[0],
      }),
    };
  }

  render() {
    return html`
      <ul class=${attrsClass(this.tabsAttrs)} style=${attrsStyle(this.tabsAttrs)}>
        <slot></slot>
      </ul>
    `;
  }
}

export type { TabsProps };
