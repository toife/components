import type { ReactiveController, ReactiveControllerHost } from "lit";

type Host = ReactiveControllerHost & HTMLElement;

const providerMaps = new WeakMap<object, Map<string, unknown>>();

/**
 * Provide a value on a Lit host (analogous to Vue `provide`).
 * Descendants resolve via `inject` by walking `parentElement`.
 */
export function provide<T>(host: object, key: string, value: T): void {
  let map = providerMaps.get(host);
  if (!map) {
    map = new Map();
    providerMaps.set(host, map);
  }
  map.set(key, value);
}

/**
 * Inject a provided value by walking ancestors (analogous to Vue `inject`).
 */
export function inject<T>(host: HTMLElement, key: string, fallback?: T): T | undefined {
  let el: HTMLElement | null = host;
  while (el) {
    const map = providerMaps.get(el);
    if (map?.has(key)) {
      return map.get(key) as T;
    }
    el = el.parentElement;
  }
  return fallback;
}

/**
 * Controller that re-renders the host when a named provider notifies.
 */
export class ContextConsumer implements ReactiveController {
  constructor(
    private host: Host,
    private key: string,
  ) {
    host.addController(this);
  }

  private unsubscribe?: () => void;

  hostConnected(): void {
    this.bind();
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  hostUpdated(): void {
    // Re-bind if tree moved
    this.bind();
  }

  private bind() {
    this.unsubscribe?.();
    const notifier = inject<ContextNotifier | undefined>(this.host, `${this.key}:notify`);
    if (!notifier) {
      this.unsubscribe = undefined;
      return;
    }
    const handler = () => this.host.requestUpdate();
    notifier.subscribe(handler);
    this.unsubscribe = () => notifier.unsubscribe(handler);
  }
}

export class ContextNotifier {
  #listeners = new Set<() => void>();

  subscribe(fn: () => void) {
    this.#listeners.add(fn);
  }

  unsubscribe(fn: () => void) {
    this.#listeners.delete(fn);
  }

  notify() {
    for (const fn of this.#listeners) fn();
  }
}

/**
 * Store provider value + notifier so children can react to updates.
 */
export function provideReactive<T>(host: object, key: string, value: T): ContextNotifier {
  const existing = providerMaps.get(host)?.get(`${key}:notify`) as ContextNotifier | undefined;
  const notifier = existing ?? new ContextNotifier();
  provide(host, key, value);
  provide(host, `${key}:notify`, notifier);
  return notifier;
}

/** Lit-friendly shape: plain values (no Vue refs). */
export type ProviderState<T extends Record<string, unknown>> = T;
