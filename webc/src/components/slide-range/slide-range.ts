import { html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { gesture } from "@toife/gesture";
import type { PropertyValues } from "lit";
import {
  APP_PROVIDER_STATE_KEY,
  SLIDE_RANGE_DEFAULT_PROPS,
  getSlideRangeAttrs,
  getSlideRangeTickAttrs,
  getSlideRangeThumbAttrs,
  getSlideRangeThumbInnerAttrs,
  getSlideRangeTooltipAttrs,
  getSlideRangeTrackBackAttrs,
  getSlideRangeTrackBodyAttrs,
  getSlideRangeTrackContainerAttrs,
  getSlideRangeTrackFrontAttrs,
  type AppProviderState,
  type SlideRangeValue,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class SlideRange extends ToifeElement {
  static readonly tagName = "t-slide-range";

  @property({ attribute: "model-value" }) modelValue: SlideRangeValue = SLIDE_RANGE_DEFAULT_PROPS.modelValue;
  @property({ attribute: true }) min: SlideRangeValue = SLIDE_RANGE_DEFAULT_PROPS.min;
  @property({ attribute: true }) max: SlideRangeValue = SLIDE_RANGE_DEFAULT_PROPS.max;
  @property({ attribute: true }) step: SlideRangeValue = SLIDE_RANGE_DEFAULT_PROPS.step;
  @property({ type: String }) unit: string = SLIDE_RANGE_DEFAULT_PROPS.unit;
  @property({ type: Boolean }) disabled: boolean = SLIDE_RANGE_DEFAULT_PROPS.disabled;
  @property({ type: Boolean }) readonly: boolean = SLIDE_RANGE_DEFAULT_PROPS.readonly;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ attribute: "tick" }) tick: boolean | SlideRangeValue = SLIDE_RANGE_DEFAULT_PROPS.tick;

  @state() private isShowTooltip = false;

  @query("[data-slide-range-container]") private container?: HTMLElement;
  @query("[data-slide-range-thumb]") private point?: HTMLElement;

  private tooltipTimeout?: ReturnType<typeof setTimeout>;
  private gestureCleanup: { destroy: () => void } | null = null;
  private dragStartPercent = 0;
  private isHorizontalDrag = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  disconnectedCallback(): void {
    if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
    this.gestureCleanup?.destroy();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.setupGesture();
  }

  updated(changed: PropertyValues): void {
    if (changed.has("disabled") || changed.has("readonly")) {
      if (this.disabled || this.readonly) {
        this.gestureCleanup?.destroy();
        this.gestureCleanup = null;
      } else if (!this.gestureCleanup) {
        this.setupGesture();
      }
    }
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private parseRangeValue(value: SlideRangeValue | undefined, fallback: number): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = Number.parseFloat(value);
      return Number.isNaN(parsed) ? fallback : parsed;
    }
    if (typeof value === "boolean") return fallback;
    return fallback;
  }

  private get rangeMin() {
    return this.parseRangeValue(this.min, 0);
  }

  private get rangeMax() {
    return this.parseRangeValue(this.max, 100);
  }

  private get rangeStep() {
    const step = this.parseRangeValue(this.step, 1);
    return step > 0 ? step : 1;
  }

  private snapToStep(rawValue: number): number {
    const min = this.rangeMin;
    const max = this.rangeMax;
    const stepSize = this.rangeStep;
    if (max <= min) return min;
    const clamped = Math.max(min, Math.min(max, rawValue));
    const stepIndex = Math.round((clamped - min) / stepSize);
    return Math.max(min, Math.min(max, min + stepIndex * stepSize));
  }

  private get normalizedValue() {
    const value = this.parseRangeValue(this.modelValue, this.rangeMin);
    return this.snapToStep(value);
  }

  private getPercentFromValue(value: number): number {
    const min = this.rangeMin;
    const max = this.rangeMax;
    if (max <= min) return 0;
    const p = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, p));
  }

  private get percent() {
    return this.getPercentFromValue(this.normalizedValue);
  }

  private get ticks(): number[] {
    if (this.tick === false) return [];
    const min = this.rangeMin;
    const max = this.rangeMax;
    const tickStep = this.tick === true ? 1 : this.parseRangeValue(this.tick, 0);
    if (tickStep <= 0 || max < min) return [min, max];

    const result: number[] = [];
    for (let value = min; value <= max; value += tickStep) {
      result.push(value);
    }
    if (result.at(-1) !== max) {
      result.push(max);
    }
    return result;
  }

  private getValueFromPercent(currentPercent: number): number {
    const min = this.rangeMin;
    const max = this.rangeMax;
    const raw = min + (max - min) * (currentPercent / 100);
    return this.snapToStep(raw);
  }

  private get displayValue() {
    const value = this.getValueFromPercent(this.percent);
    return `${value}${this.unit || ""}`;
  }

  private suppressPointerEvent(ev?: Event): void {
    ev?.stopPropagation();
  }

  private isHorizontalDirection(direction?: string): boolean {
    return direction === "left" || direction === "right";
  }

  private showTooltipTemporarily(): void {
    if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
    this.isShowTooltip = true;
    this.tooltipTimeout = setTimeout(() => {
      this.isShowTooltip = false;
    }, 300);
  }

  private emitValueFromPercent(currentPercent: number): void {
    if (this.disabled || this.readonly) return;
    const value = this.getValueFromPercent(currentPercent);
    if (value !== this.modelValue) {
      this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: value, bubbles: true, composed: true }),
      );
      this.dispatchEvent(new CustomEvent("change", { detail: value, bubbles: true, composed: true }));
    }
  }

  private onTickSelect = (value: number, ev?: Event) => {
    this.suppressPointerEvent(ev);
    const tickPercent = this.getPercentFromValue(value);
    this.emitValueFromPercent(tickPercent);
    this.showTooltipTemporarily();
  };

  private onTrackPointerDown = (ev: Event) => {
    if (this.disabled || this.readonly) return;
    this.suppressPointerEvent(ev);
  };

  private onThumbPointerDown = (ev: Event) => {
    if (this.disabled || this.readonly) return;
    this.suppressPointerEvent(ev);
  };

  private getClientX(ev: MouseEvent | TouchEvent): number {
    if ("changedTouches" in ev && ev.changedTouches.length > 0) {
      return ev.changedTouches[0].clientX;
    }
    return (ev as MouseEvent).clientX;
  }

  private onClickPath = (ev: MouseEvent | TouchEvent) => {
    if (this.disabled || this.readonly || !this.container) return;
    this.suppressPointerEvent(ev);
    const width = this.container.offsetWidth;
    const rect = this.container.getBoundingClientRect();
    const x = this.getClientX(ev) - rect.left;
    const p = (x / width) * 100;
    this.emitValueFromPercent(Math.max(0, Math.min(100, p)));
    this.showTooltipTemporarily();
  };

  private setupGesture(): void {
    if (!this.point || !this.container || this.disabled || this.readonly) return;
    this.gestureCleanup?.destroy();

    this.gestureCleanup = gesture(
      this.point,
      {
        options: { trackOutsideElement: true },
        beforeEvent: () => !(this.disabled || this.readonly),
        afterEvent: (ev?: Event) => {
          if (this.isHorizontalDrag) this.suppressPointerEvent(ev);
        },
        down: ({ event }) => {
          if (this.disabled || this.readonly) return;
          this.dragStartPercent = this.percent;
          this.isHorizontalDrag = false;
          this.suppressPointerEvent(event);
        },
        up: ({ event }) => {
          this.isHorizontalDrag = false;
          this.isShowTooltip = false;
          this.suppressPointerEvent(event);
        },
        cancel: (event?: Event) => {
          this.isHorizontalDrag = false;
          this.isShowTooltip = false;
          this.suppressPointerEvent(event);
        },
        move: ({ initialDirection, deltaX, event }) => {
          if (this.disabled || this.readonly) return;
          if (!this.isHorizontalDirection(initialDirection)) return;
          if (!this.container) return;

          this.isHorizontalDrag = true;
          this.suppressPointerEvent(event);

          const width = this.container.offsetWidth;
          const p = (deltaX / width) * 100;
          const nextPercent = Math.max(0, Math.min(100, this.dragStartPercent + p));
          this.emitValueFromPercent(nextPercent);
          if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
          this.isShowTooltip = true;
        },
      },
      { passive: false, capture: true },
    );
  }

  private tickAttrs(value: number) {
    const tickPercent = this.getPercentFromValue(value);
    return getSlideRangeTickAttrs({
      active: this.percent > tickPercent,
      percent: tickPercent,
    });
  }

  render() {
    const role = this.role || this.appState?.role || "";
    const shape = this.shape || this.appState?.shape || "";

    return html`
      <div class=${attrsClass(getSlideRangeAttrs({ role, shape, disabled: this.disabled, readonly: this.readonly }))}>
        <div class=${attrsClass(getSlideRangeTrackContainerAttrs())} data-slide-range-container>
          <div
            class=${attrsClass(getSlideRangeTrackBodyAttrs())}
            @pointerdown=${this.onTrackPointerDown}
            @pointerup=${this.onClickPath}
          >
            <div class=${attrsClass(getSlideRangeTrackBackAttrs())}></div>
            <div class=${attrsClass(getSlideRangeTrackFrontAttrs({ percent: this.percent }))}></div>
            ${repeat(
              this.ticks,
              (value) => value,
              (value) => html`
                <div
                  class=${attrsClass(this.tickAttrs(value))}
                  @pointerdown=${this.onTrackPointerDown}
                  @pointerup=${(ev: Event) => this.onTickSelect(value, ev)}
                ></div>
              `,
            )}
          </div>

          <div
            class=${attrsClass(getSlideRangeThumbAttrs({ percent: this.percent }))}
            data-slide-range-thumb
            @pointerdown=${this.onThumbPointerDown}
          >
            <div class=${attrsClass(getSlideRangeThumbInnerAttrs())}></div>
            ${this.percent > 0 && this.isShowTooltip
              ? html`<span class=${attrsClass(getSlideRangeTooltipAttrs())}>${this.displayValue}</span>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}
