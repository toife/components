import type { ComputedRef, Ref } from "vue";

/** Vue `provide`/`inject` shape for core provider state (refs stay reactive). */
export type ProviderStateRefs<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : Ref<T[K]> | ComputedRef<T[K]>;
};
