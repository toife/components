import { LitElement } from 'lit';
/**
 * Base Lit element for Toife components.
 * Uses light DOM so published global CSS (`@toife/lit/styles/*`) applies
 * the same way as `@toife/vue`.
 */
export declare class ToifeElement extends LitElement {
    /** Light DOM — class names from core `get*Attrs()` match global stylesheets. */
    protected createRenderRoot(): HTMLElement | DocumentFragment;
    /** Subscribe to provider updates for the given context key. */
    protected consume(key: string): void;
}
