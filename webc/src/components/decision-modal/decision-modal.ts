import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import {
  APP_PROVIDER_STATE_KEY,
  DECISION_MODAL_DEFAULT_PROPS,
  getDecisionModalAttrs,
  getDecisionModalBodyAttrs,
  getDecisionModalFooterAttrs,
  getDecisionModalHeaderAttrs,
  type AppProviderState,
  type DecisionModalButton,
  type DecisionModalDirection,
  type DecisionModalProps,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class DecisionModal extends ToifeElement {
  static readonly tagName = "t-decision-modal";

  @property({ type: Boolean }) visible: boolean = DECISION_MODAL_DEFAULT_PROPS.visible;
  @property({ type: String }) title = "";
  @property({ type: String }) message = "";
  @property({ attribute: false }) actions: DecisionModalButton[] = [];
  @property({ attribute: false }) dismiss: string[] = [];
  @property({ type: String }) placement: string = DECISION_MODAL_DEFAULT_PROPS.placement;
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: Boolean }) divider?: boolean;
  @property({ type: String }) direction: DecisionModalDirection = DECISION_MODAL_DEFAULT_PROPS.direction;
  @property({ type: Boolean }) keepalive: boolean = DECISION_MODAL_DEFAULT_PROPS.keepalive;

  @state() private pop = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get shapeValue() {
    return this.shape || this.appState?.shape || "";
  }

  private get dividerValue() {
    return (this.divider !== undefined ? this.divider : this.appState?.divider) ?? false;
  }

  private get decisionModalAttrs() {
    const role = this.role || this.appState?.role || "";
    return getDecisionModalAttrs({
      role,
      shape: this.shapeValue,
      pop: this.pop,
      divider: this.dividerValue,
    });
  }

  private onClose = (e: CustomEvent<string>) => {
    const val = e.detail;
    if (this.dismiss?.includes(val)) {
      this.dispatchEvent(new CustomEvent("close", { detail: val, bubbles: true, composed: true }));
    } else if (val === "backdrop") {
      this.pop = true;
      setTimeout(() => {
        this.pop = false;
      }, 300);
    }
  };

  private onChoose = (btn: DecisionModalButton) => {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    btn.handler?.();
    this.dispatchEvent(new CustomEvent("choose", { detail: btn, bubbles: true, composed: true }));
  };

  render() {
    const headerAttrs = getDecisionModalHeaderAttrs();
    const bodyAttrs = getDecisionModalBodyAttrs();
    const footerAttrs = getDecisionModalFooterAttrs({ direction: this.direction });

    return html`
      <t-present
        .placement=${this.placement}
        backdrop="display"
        .keepalive=${this.keepalive}
        .visible=${this.visible}
        @close=${this.onClose}
      >
        <div class=${attrsClass(this.decisionModalAttrs)}>
          <slot name="header">
            ${this.title
              ? html`<div class=${attrsClass(headerAttrs)}>${this.title}</div>`
              : nothing}
          </slot>
          <slot name="body">
            <div class=${attrsClass(bodyAttrs)}>${this.message}</div>
          </slot>
          <slot name="footer">
            <div class=${attrsClass(footerAttrs)}>
              ${this.actions.map(
                (btn) => html`
                  <t-button
                    .role=${btn.role ?? ""}
                    .variant=${btn.variant ?? "fill"}
                    .shape=${this.shapeValue}
                    @click=${() => this.onChoose(btn)}
                    >${btn.text ?? ""}</t-button
                  >
                `,
              )}
            </div>
          </slot>
        </div>
      </t-present>
    `;
  }
}

export type { DecisionModalProps };
