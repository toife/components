import { ReactiveController, ReactiveControllerHost } from 'lit';
type Host = ReactiveControllerHost & HTMLElement;
/**
 * Provide a value on a Lit host (analogous to Vue `provide`).
 * Descendants resolve via `inject` by walking `parentElement`.
 */
export declare function provide<T>(host: object, key: string, value: T): void;
/**
 * Inject a provided value by walking ancestors (analogous to Vue `inject`).
 */
export declare function inject<T>(host: HTMLElement, key: string, fallback?: T): T | undefined;
/**
 * Controller that re-renders the host when a named provider notifies.
 */
export declare class ContextConsumer implements ReactiveController {
    private host;
    private key;
    constructor(host: Host, key: string);
    private unsubscribe?;
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): void;
    private bind;
}
export declare class ContextNotifier {
    #private;
    subscribe(fn: () => void): void;
    unsubscribe(fn: () => void): void;
    notify(): void;
}
/**
 * Store provider value + notifier so children can react to updates.
 */
export declare function provideReactive<T>(host: object, key: string, value: T): ContextNotifier;
/** Lit-friendly shape: plain values (no Vue refs). */
export type ProviderState<T extends Record<string, unknown>> = T;
export {};
