import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  PROGRESS_DEFAULT_PROPS,
  getProgressAttrs,
  getProgressBarAttrs,
  getProgressCircleBarAttrs,
  getProgressCircleTrackAttrs,
  getProgressLabelAttrs,
  getProgressPercent,
  getProgressSvgAttrs,
  getProgressTrackAttrs,
  type AppProviderState,
  type ProgressProps,
  type ProgressVariant,
} from "@/core";
import { attrsClass, attrsStyle, inject, ToifeElement } from "../../shared";

export class Progress extends ToifeElement {
  static readonly tagName = "t-progress";

  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = PROGRESS_DEFAULT_PROPS.size;
  @property({ type: String }) variant: ProgressVariant = PROGRESS_DEFAULT_PROPS.variant;
  @property({ type: Number }) value: number = PROGRESS_DEFAULT_PROPS.value;
  @property({ type: Number }) max: number = PROGRESS_DEFAULT_PROPS.max;
  @property({ type: Boolean }) indeterminate: boolean = PROGRESS_DEFAULT_PROPS.indeterminate;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get percent() {
    return getProgressPercent(this.value, this.max);
  }

  private get progressAttrs() {
    return getProgressAttrs({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
      variant: this.variant,
      indeterminate: this.indeterminate,
      percent: this.percent,
    });
  }

  render() {
    const attrs = this.progressAttrs;
    const percent = this.percent;
    const svgAttrs = getProgressSvgAttrs();
    const body =
      this.variant === "circle"
        ? html`
            <svg class=${attrsClass(svgAttrs)} viewBox=${svgAttrs.viewBox} aria-hidden="true">
              <circle
                class=${attrsClass(getProgressCircleTrackAttrs())}
                cx="18"
                cy="18"
                r="16"
                pathLength="1"
                fill="none"
              ></circle>
              <circle
                class=${attrsClass(getProgressCircleBarAttrs())}
                cx="18"
                cy="18"
                r="16"
                pathLength="1"
                fill="none"
              ></circle>
            </svg>
          `
        : html`
            <div class=${attrsClass(getProgressTrackAttrs())}>
              <div class=${attrsClass(getProgressBarAttrs())}></div>
            </div>
          `;

    return html`
      <div
        class=${attrsClass(attrs)}
        style=${attrsStyle(attrs)}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? nothing : Math.round(percent)}
        aria-busy=${this.indeterminate ? "true" : nothing}
      >
        ${body}
        <div class=${attrsClass(getProgressLabelAttrs())}><slot></slot></div>
      </div>
    `;
  }
}

export type { ProgressProps };
