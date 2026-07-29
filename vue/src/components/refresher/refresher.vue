<style lang="scss" src="@/core/features/refresher/refresher.scss" scoped></style>
<template src="./refresher.html"></template>
<script lang="ts" setup>
import { ref, onUnmounted, watch, computed } from "vue";
import { gesture, type GestureMovePayload, type GestureUpPayload } from "@toife/gesture";
import { getRefresherAttrs, type RefresherEvent } from "@/core";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const emit = defineEmits<RefresherEvent>();

// Reactive state
// ----------------------------------------------------------------------------
const refreshing = ref(false);
const container = ref();
let cleanup: unknown;
let isPulling = false;

// Computed properties
// ----------------------------------------------------------------------------
const containerAttrs = computed(() => getRefresherAttrs());

// Methods
// ----------------------------------------------------------------------------
const close = () => {
  refreshing.value = false;
};

const refresh = () => {
  refreshing.value = true;
  return close;
};

const up = () => {
  emit("end", { refresh });
};

const cancel = () => {
  isPulling = false;
  refreshing.value = false;
  emit("cancel");
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => container.value,
  () => {
    cleanup && (cleanup as { destroy: () => void }).destroy();
    if (!container.value) return;
    cleanup = gesture(
      container.value,
      {
        options: {
          minMove: 20,
        },

        beforeEvent() {
          if (isPulling) return true;
          if ((container.value?.scrollTop || 0) > 0) return false;
          return true;
        },
        down() {
          if (refreshing.value) return;
          isPulling = (container.value?.scrollTop || 0) <= 0;
          if (!isPulling) return;
          emit("start");
        },
        move({ deltaY, initialDirection }: GestureMovePayload) {
          if (refreshing.value || !isPulling || initialDirection != "down") return;
          const v = deltaY < 0 ? 0 : deltaY;
          emit("move", { refresh, offset: v });
        },
        up({ initialDirection }: GestureUpPayload) {
          const wasPulling = isPulling;
          isPulling = false;
          if (refreshing.value || !wasPulling) return;
          if (initialDirection != "down") {
            cancel();
            return;
          }
          up();
        },
        cancel() {
          isPulling = false;
          if (refreshing.value) return;
          cancel();
        },
      },
      {
        passive: false,
      }
    );
  }
);

onUnmounted(() => {
  cleanup && (cleanup as { destroy: () => void }).destroy();
});
</script>
