<template src="./route-outlet.html"></template>
<script lang="ts" setup>
import { computed, inject, markRaw, ref, unref, watch } from "vue";
import { ROUTE_PROVIDER_STATE_KEY, type RouteProviderState } from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = defineProps<{
  /**
   * Component, async loader, or a vue-router `components` map (`{ default }`).
   * Ignored when `name` is set.
   */
  component?: unknown;
  /**
   * Named view of the active child (`components[name]`).
   * Omit to render `component`, using its `default` when the value is a map.
   */
  name?: string;
}>();

const provider = inject<ProviderStateRefs<RouteProviderState>>(ROUTE_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const renderComponent = ref<unknown | null>(null);

// Computed properties
// ----------------------------------------------------------------------------
/** What this outlet should show. A named outlet follows the active child. */
const source = computed(() => {
  if (!props.name) return props.component;

  const stack = unref(provider?.stack) ?? [];
  const active = stack.at(-1);

  return viewOf(active?.component, props.name);
});

// Methods
// ----------------------------------------------------------------------------
const resolveComponent = async (raw: unknown): Promise<unknown> => {
  if (typeof raw !== "function") return raw;
  const mod = await (raw as () => Promise<{ default?: unknown }>)();
  return mod?.default ?? mod;
};

/** Accepts a component, async loader, or `{ default }` wrapper (common for vue-router). */
const resolveFromProp = async (raw: unknown): Promise<unknown | null> => {
  if (raw == null) return null;
  const inner =
    typeof raw === "object" && raw !== null && "default" in raw
      ? (raw as { default: unknown }).default
      : raw;
  return resolveComponent(inner);
};

const viewOf = (raw: unknown, name: string): unknown => {
  if (raw == null || typeof raw !== "object" || !(name in raw)) return null;

  return (raw as Record<string, unknown>)[name] ?? null;
};

// A slower resolve for a previous child must not replace the active view.
let requestId = 0;

const load = async (raw: unknown) => {
  const id = ++requestId;
  const named = Boolean(props.name);
  const resolved = named ? await resolveComponent(raw) : await resolveFromProp(raw);

  if (id !== requestId) return;

  renderComponent.value = resolved ? markRaw(resolved) : null;
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(source, (raw) => {
  void load(raw);
}, { immediate: true });
</script>
