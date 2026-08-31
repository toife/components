import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { gesture, type GestureMovePayload, type GestureUpPayload } from "@toife/gesture";
import { getRefresherAttrs } from "@/core";
import { attrsClass, ToifeElement } from "../../shared";

type GestureHandle = { destroy: () => void };

export class Refresher extends ToifeElement {
  static readonly tagName = "t-refresher";

  @query("[data-refresher]") private container?: HTMLElement;

  private ges?: GestureHandle;
  private refreshing = false;
  private isPulling = false;

  disconnectedCallback(): void {
    this.ges?.destroy();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.bindGesture();
  }

  private bindGesture(): void {
    this.ges?.destroy();
    if (!this.container) return;

    this.ges = gesture(
      this.container,
      {
        options: { minMove: 20 },
        beforeEvent: () => {
          if (this.isPulling) return true;
          if ((this.container?.scrollTop || 0) > 0) return false;
          return true;
        },
        down: () => {
          if (this.refreshing) return;
          this.isPulling = (this.container?.scrollTop || 0) <= 0;
          if (!this.isPulling) return;
          this.dispatchEvent(new CustomEvent("start", { bubbles: true, composed: true }));
        },
        move: ({ deltaY, initialDirection }: GestureMovePayload) => {
          if (this.refreshing || !this.isPulling || initialDirection !== "down") return;
          const v = deltaY < 0 ? 0 : deltaY;
          this.dispatchEvent(
            new CustomEvent("move", {
              detail: { refresh: this.refresh, offset: v },
              bubbles: true,
              composed: true,
            }),
          );
        },
        up: ({ initialDirection }: GestureUpPayload) => {
          const wasPulling = this.isPulling;
          this.isPulling = false;
          if (this.refreshing || !wasPulling) return;
          if (initialDirection !== "down") {
            this.cancel();
            return;
          }
          this.end();
        },
        cancel: () => {
          this.isPulling = false;
          if (this.refreshing) return;
          this.cancel();
        },
      },
      { passive: false },
    );
  }

  private close = () => {
    this.refreshing = false;
  };

  private refresh = () => {
    this.refreshing = true;
    return this.close;
  };

  private end = () => {
    this.dispatchEvent(
      new CustomEvent("end", { detail: { refresh: this.refresh }, bubbles: true, composed: true }),
    );
  };

  private cancel = () => {
    this.isPulling = false;
    this.refreshing = false;
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  };

  render() {
    return html`<div class=${attrsClass(getRefresherAttrs())} data-refresher><slot></slot></div>`;
  }
}
