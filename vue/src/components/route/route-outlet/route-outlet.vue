<template src="./route-outlet.html"></template>
<script lang="ts" setup>
import { markRaw, onMounted, ref } from "vue";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = defineProps<{
  component: unknown;
}>();

// Reactive state
// ----------------------------------------------------------------------------
const renderComponent = ref<unknown | null>(null);

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

// Lifecycle
// ----------------------------------------------------------------------------
onMounted(async () => {
  const resolved = await resolveFromProp(props.component);
  renderComponent.value = resolved ? markRaw(resolved) : null;
});
</script>
