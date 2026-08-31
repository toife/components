import { html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  ACTION_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getActionAttrs,
  type ActionButton,
  type ActionPlacement,
  type ActionProps,
  type AppProviderState,
} from "@/core";
import { attrsClass, inject, ToifeElement } from "../../shared";

export class Action extends ToifeElement {
  static readonly tagName = "t-action";

  @property({ type: Boolean }) visible: boolean = ACTION_DEFAULT_PROPS.visible;
  @property({ attribute: false }) dismiss: string[] = [];
  @property({ attribute: false }) actions: ActionButton[][] = [];
  @property({ type: String }) role = "";
  @property({ type: String }) shape = "";
  @property({ type: Boolean }) divider?: boolean;
  @property({ type: String }) placement: ActionPlacement = ACTION_DEFAULT_PROPS.placement;

  @state() private pop = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.consume(APP_PROVIDER_STATE_KEY);
  }

  private get appState() {
    return inject<AppProviderState>(this, APP_PROVIDER_STATE_KEY);
  }

  private get actionAttrs() {
    const divider =
      (this.divider !== undefined ? this.divider : this.appState?.divider) ?? false;
    const shape = this.shape || this.appState?.shape || "";
    const role = this.role || this.appState?.role || "";
    return getActionAttrs({
      role,
      shape,
      placement: this.placement,
      divider,
      pop: this.pop,
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

  private onChoose = (btn: ActionButton) => {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    btn.handler?.();
    this.dispatchEvent(new CustomEvent("choose", { detail: btn, bubbles: true, composed: true }));
  };

  render() {
    const shape = this.shape || this.appState?.shape || "";
    return html`
      <t-present
        .placement=${this.placement}
        backdrop="display"
        .keepalive=${false}
        .visible=${this.visible}
        @close=${this.onClose}
      >
        <div class=${attrsClass(this.actionAttrs)}>
          <slot name="body">
            ${this.actions.map(
              (buttons) => html`
                <t-form-group direction="vertical">
                  ${buttons.map(
                    (btn) => html`
                      <t-button
                        .role=${btn.role ?? ""}
                        .variant=${btn.variant ?? "fill"}
                        .shape=${shape}
                        block
                        @click=${() => this.onChoose(btn)}
                        >${btn.text ?? ""}</t-button
                      >
                    `,
                  )}
                </t-form-group>
              `,
            )}
          </slot>
        </div>
      </t-present>
    `;
  }
}

export type { ActionProps };
