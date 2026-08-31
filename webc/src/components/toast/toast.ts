import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { TOAST_DEFAULT_PROPS, getToastAttrs, type ToastPlacement, type ToastProps } from "@/core";
import { attrsClass, ToifeElement } from "../../shared";
import { useToast } from "./toast.controller";

export class Toast extends ToifeElement {
  static readonly tagName = "t-toast";

  @property({ type: String }) placement: ToastPlacement = TOAST_DEFAULT_PROPS.placement;

  private unsubscribe?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = useToast().subscribe(() => this.requestUpdate());
  }

  disconnectedCallback(): void {
    this.unsubscribe?.();
    super.disconnectedCallback();
  }

  private get toastMessages() {
    return useToast().messages.filter((item) => item.placement === this.placement);
  }

  private dismiss = (id: number) => {
    useToast().close(id);
  };

  render() {
    if (this.toastMessages.length === 0) return nothing;

    return html`
      <div class=${attrsClass(getToastAttrs({ placement: this.placement }))}>
        <slot name="content">
          ${this.toastMessages.map(
            (msg) => html`
              <t-toast-content
                .toastId=${msg.id ?? 0}
                .message=${msg.message}
                .duration=${msg.duration ?? 2000}
                .role=${msg.role ?? ""}
                .variant=${msg.variant ?? "fill"}
                .placement=${msg.placement ?? this.placement}
                .shape=${msg.shape ?? ""}
                @close=${() => this.dismiss(msg.id!)}
              ></t-toast-content>
            `,
          )}
        </slot>
      </div>
    `;
  }
}

export type { ToastProps };
