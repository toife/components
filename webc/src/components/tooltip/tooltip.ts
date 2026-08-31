import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  TOOLTIP_DEFAULT_PROPS,
  getTooltipAttrs,
  getTooltipContentAttrs,
  getTooltipTriggerAttrs,
  type AppProviderState,
  type TooltipPlacement,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Tooltip extends ToifeElement {
  static readonly tagName = "t-tooltip";

  @property({ type: String }) placement: TooltipPlacement = TOOLTIP_DEFAULT_PROPS.placement;
  @property({ type: Boolean }) disabled: boolean = TOOLTIP_DEFAULT_PROPS.disabled;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: String }) size: string = TOOLTIP_DEFAULT_PROPS.size;

  @state() private visible = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get wrapperAttrs() {
    const role = this.role ?? this.appState?.role ?? "";
    const shape = this.shape ?? this.appState?.shape ?? "";
    return getTooltipAttrs({
      role,
      shape,
      size: this.size,
      disabled: this.disabled,
    });
  }

  private show = () => {
    if (this.disabled) return;
    this.visible = true;
  };

  private hide = () => {
    this.visible = false;
  };

  private onFocusOut = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && this.contains(next)) return;
    this.hide();
  };

  render() {
    return html`
      <div class=${attrsClass(this.wrapperAttrs)}>
        <div
          class=${attrsClass(getTooltipTriggerAttrs())}
          @pointerenter=${this.show}
          @pointerleave=${this.hide}
          @focusin=${this.show}
          @focusout=${this.onFocusOut}
        >
          <slot></slot>
        </div>
        ${this.visible
          ? html`<div class=${attrsClass(getTooltipContentAttrs({ placement: this.placement }))}>
              <slot name="content"></slot>
            </div>`
          : nothing}
      </div>
    `;
  }
}
