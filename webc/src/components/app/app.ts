import { html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import {
  APP_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getAppAttrs,
  type AppData,
  type AppDirection,
  type AppProps,
  type AppProviderState,
} from "@/core";
import { attrsClass, provideReactive, ToifeElement, type ContextNotifier } from "../../shared";
import { useAction } from "../action/action.controller";
import { useDecisionModal } from "../decision-modal/decision-modal.controller";

export class App extends ToifeElement {
  static readonly tagName = "t-app";

  @property({ type: String }) shape: string = APP_DEFAULT_PROPS.shape;
  @property({ type: Boolean }) divider: boolean = APP_DEFAULT_PROPS.divider;
  @property({ type: String }) role: string = APP_DEFAULT_PROPS.role;
  @property({ type: Boolean }) triple: boolean = APP_DEFAULT_PROPS.triple;
  @property({ type: String }) direction: AppDirection = APP_DEFAULT_PROPS.direction;
  @property({ attribute: false }) data: AppData = {};

  @query("[data-app-root]") private rootDiv?: HTMLElement;

  private readonly appState: AppProviderState = {
    shape: APP_DEFAULT_PROPS.shape,
    divider: APP_DEFAULT_PROPS.divider,
    role: APP_DEFAULT_PROPS.role,
    triple: APP_DEFAULT_PROPS.triple,
    direction: APP_DEFAULT_PROPS.direction,
    rootEl: undefined,
    data: {},
  };

  private notifier?: ContextNotifier;
  private unsubAction?: () => void;
  private unsubDecision?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.notifier = provideReactive(this, APP_PROVIDER_STATE_KEY, this.appState);
    this.syncAppState();
    this.unsubAction = useAction().subscribe(() => this.requestUpdate());
    this.unsubDecision = useDecisionModal().subscribe(() => this.requestUpdate());
  }

  disconnectedCallback(): void {
    this.unsubAction?.();
    this.unsubDecision?.();
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues): void {
    if (
      changed.has("shape") ||
      changed.has("divider") ||
      changed.has("role") ||
      changed.has("triple") ||
      changed.has("direction") ||
      changed.has("data")
    ) {
      this.syncAppState();
    }
  }

  firstUpdated(): void {
    this.appState.rootEl = this.rootDiv ?? this;
    this.notifier?.notify();
  }

  private syncAppState(): void {
    this.appState.shape = this.shape;
    this.appState.divider = this.divider;
    this.appState.role = this.role;
    this.appState.triple = this.triple;
    this.appState.direction = this.direction;
    this.appState.data = this.data ?? {};
    this.notifier?.notify();
  }

  private onActionClose = (e: CustomEvent<string | undefined>) => {
    useAction().close(e.detail);
  };

  private onActionChoose = (e: CustomEvent) => {
    useAction().choose(e.detail);
  };

  private onDecisionClose = (e: CustomEvent<string | undefined>) => {
    useDecisionModal().close(e.detail);
  };

  private onDecisionChoose = (e: CustomEvent) => {
    useDecisionModal().choose(e.detail);
  };

  render() {
    const action = useAction();
    const decisionModal = useDecisionModal();
    const appAttrs = getAppAttrs({ shape: this.shape });

    return html`
      <div class=${attrsClass(appAttrs)} data-app-root>
        <slot></slot>
        <slot name="global"></slot>
        <t-toast placement="top-start"></t-toast>
        <t-toast placement="bottom-start"></t-toast>
        <t-toast placement="bottom-center"></t-toast>
        <t-toast placement="bottom-end"></t-toast>
        <t-toast placement="top-center"></t-toast>
        <t-toast placement="top-end"></t-toast>
        ${action.data
          ? html`
              <t-action
                .visible=${action.visible}
                .dismiss=${action.data.dismiss ?? []}
                .actions=${action.data.actions}
                .role=${action.data.role ?? ""}
                .shape=${action.data.shape ?? ""}
                .divider=${action.data.divider}
                .placement=${action.data.placement ?? "bottom"}
                @close=${this.onActionClose}
                @choose=${this.onActionChoose}
              ></t-action>
            `
          : nothing}
        ${decisionModal.data
          ? html`
              <t-decision-modal
                .visible=${decisionModal.visible}
                .title=${decisionModal.data.title ?? ""}
                .message=${decisionModal.data.message}
                .actions=${decisionModal.data.actions}
                .dismiss=${decisionModal.data.dismiss ?? []}
                .placement=${decisionModal.data.placement ?? "center"}
                .role=${decisionModal.data.role ?? ""}
                .shape=${decisionModal.data.shape ?? ""}
                .divider=${decisionModal.data.divider}
                .direction=${decisionModal.data.direction ?? "row"}
                .keepalive=${decisionModal.data.keepalive ?? false}
                @close=${this.onDecisionClose}
                @choose=${this.onDecisionChoose}
              ></t-decision-modal>
            `
          : nothing}
      </div>
    `;
  }
}

export type { AppProps };
