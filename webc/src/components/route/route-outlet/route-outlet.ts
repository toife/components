import { html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import { ToifeElement } from "../../../shared";

export class RouteOutlet extends ToifeElement {
  static readonly tagName = "t-route-outlet";

  @property({ attribute: false }) component: unknown;

  @query("[data-outlet]") private outlet?: HTMLElement;

  updated(changed: PropertyValues): void {
    if (changed.has("component")) {
      void this.mountComponent();
    }
  }

  firstUpdated(): void {
    void this.mountComponent();
  }

  private async resolveComponent(raw: unknown): Promise<unknown> {
    if (typeof raw !== "function") return raw;
    const mod = await (raw as () => Promise<{ default?: unknown }>)();
    return mod?.default ?? mod;
  }

  private async resolveFromProp(raw: unknown): Promise<unknown | null> {
    if (raw == null) return null;
    const inner =
      typeof raw === "object" && raw !== null && "default" in raw
        ? (raw as { default: unknown }).default
        : raw;
    return this.resolveComponent(inner);
  }

  private async mountComponent(): Promise<void> {
    if (!this.outlet) return;
    this.outlet.replaceChildren();
    const resolved = await this.resolveFromProp(this.component);
    if (resolved == null) return;

    if (typeof resolved === "string") {
      this.outlet.appendChild(document.createElement(resolved));
      return;
    }

    if (typeof resolved === "function") {
      try {
        const el = new (resolved as CustomElementConstructor)();
        this.outlet.appendChild(el);
      } catch {
        // Unsupported component type — outlet stays empty.
      }
    }
  }

  render() {
    return html`<div data-outlet><slot></slot></div>`;
  }
}
