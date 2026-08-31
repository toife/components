import { SubscribeOptions } from './types';
type CustomElementConstructor = new (...args: any[]) => HTMLElement;
declare class Toife {
    options: Required<SubscribeOptions>;
    constructor(options?: SubscribeOptions);
    /** Register every Toife custom element with the configured prefix. */
    subscribeAll(): this;
    /** Register a single custom element (without prefix applied twice). */
    subscribe(name: string, component: CustomElementConstructor): this;
    preventDefault(): this;
}
/**
 * Create a Toife Lit instance and optionally register components.
 *
 * @example
 * ```ts
 * import { createToife } from "@toife/lit";
 * import "@toife/lit/styles/index.css";
 *
 * createToife().subscribeAll();
 * ```
 */
export declare const createToife: (options?: SubscribeOptions) => Toife;
export declare const useApp: (name?: string) => Toife;
export declare const getApps: () => Record<string, Toife>;
export {};
