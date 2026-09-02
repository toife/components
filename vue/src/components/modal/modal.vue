<style lang="scss" src="@/core/features/modal/modal.scss" scoped></style>
<template src="./modal.html"></template>
<script lang="ts" setup>
import { computed, inject, onUnmounted, ref, unref, watch } from "vue";
import {
  gesture as toifeGesture,
  type GestureFastPayload,
  type GestureMovePayload,
  type GestureUpPayload,
} from "@toife/gesture";
import { Present } from "../present";
import { GestureIndicator } from "../gesture-indicator";
import {
  MODAL_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  SCROLLABLE_OVERFLOW_VALUES,
  getModalAttrs,
  type AppProviderState,
  type ModalEvent,
  type ModalProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ModalProps>(), {
  ...MODAL_DEFAULT_PROPS,
});
const emit = defineEmits<ModalEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const modal = ref();
const present = ref();
const isBusy = ref(false);
const isMoving = ref(false);
const ges = ref<unknown>(null);

// Computed properties
// ----------------------------------------------------------------------------
const gestureDir = computed(() => {
  if (props.placement == "bottom") return "down";
  if (props.placement == "top") return "up";
  if (props.placement == "left") return "left";
  if (props.placement == "right") return "right";
});

const modalAttrs = computed(() => {
  const shape = props?.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getModalAttrs({
    role,
    shape,
    placement: props.placement,
    fullscreen: props.fullscreen,
    style: props.style,
  });
});

// Methods
// ----------------------------------------------------------------------------
const close = (e: string) => {
  emit("close", e);
};

function hasScrollableOverflow(value: string): boolean {
  return (SCROLLABLE_OVERFLOW_VALUES as readonly string[]).includes(value);
}

/**
 * Check if the element is scrollable
 * @param el - The element
 * @param axis - The axis of the scroll
 * @returns True if the element is scrollable, false otherwise
 */
const isScrollable = (el: HTMLElement, axis: "x" | "y") => {
  const style = getComputedStyle(el);
  if (axis == "y") {
    return el.scrollHeight > el.clientHeight && hasScrollableOverflow(style.overflowY);
  }

  return el.scrollWidth > el.clientWidth && hasScrollableOverflow(style.overflowX);
};

/**
 * Check if the element has remaining scroll
 * @param el - The element
 * @param direction - The direction of the scroll
 * @returns True if the element has remaining scroll, false otherwise
 */
const hasRemainingScroll = (el: HTMLElement, direction: "up" | "down" | "left" | "right") => {
  if (direction == "down") return el.scrollTop > 0;
  if (direction == "up") return el.scrollTop < el.scrollHeight - el.clientHeight;
  if (direction == "right") return el.scrollLeft > 0;

  return el.scrollLeft < el.scrollWidth - el.clientWidth;
};

/**
 * Check if the gesture can start
 * @param e - The event
 * @returns True if the gesture can start, false otherwise
 */
const canStartGesture = (e: unknown) => {
  if (!modal.value || !gestureDir.value) return true;

  const target = (e as { target?: EventTarget }).target;
  if (!(target instanceof Element)) return true;

  const axis = gestureDir.value == "left" || gestureDir.value == "right" ? "x" : "y";
  let current: Element | null = target;

  while (current && current !== modal.value) {
    if (current instanceof HTMLElement && isScrollable(current, axis)) {
      if (hasRemainingScroll(current, gestureDir.value)) {
        return false;
      }
    }
    current = current.parentElement;
  }

  return true;
};

// Cooldown so rapid gesture events do not fight the sheet animation
const busy = () => {
  isBusy.value = true;
  setTimeout(() => {
    isBusy.value = false;
  }, 300);
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => modal.value,
  (val) => {
    if (val) {
      // Drag-to-dismiss along the placement axis (skipped for centered modals)
      ges.value = toifeGesture(modal.value, {
        options: {
          minDist: 30,
        },

        beforeEvent(e: Event) {
          if (isBusy.value || !props.gesture || props.placement == "center") {
            return false;
          }

          if (!canStartGesture(e)) {
            return false;
          }

          return true;
        },

        down() {
          isMoving.value = false;
        },

        fast({ initialDirection }: GestureFastPayload) {
          busy();
          if (initialDirection == gestureDir.value) {
            emit("close", "gesture");
          } else {
            present.value.open();
          }
        },

        move({ deltaY, deltaX, initialDirection }: GestureMovePayload) {
          if (initialDirection != gestureDir.value) return;
          let tv = 0;
          if (props.placement == "bottom" || props.placement == "top") tv = deltaY;
          else tv = deltaX;

          if (props.placement == "bottom") {
            tv = deltaY > 0 ? deltaY : 0;
          }

          if (props.placement == "top") {
            tv = deltaY < 0 ? deltaY : 0;
          }

          if (props.placement == "left") {
            tv = deltaX < 0 ? deltaX : 0;
          }

          if (props.placement == "right") {
            tv = deltaX > 0 ? deltaX : 0;
          }

          if (
            (props.placement == "bottom" && (tv >= 10 || isMoving.value)) ||
            (props.placement == "top" && (tv <= -10 || isMoving.value)) ||
            (props.placement == "left" && (tv <= -10 || isMoving.value)) ||
            (props.placement == "right" && (tv >= 10 || isMoving.value))
          ) {
            isMoving.value = true;
            present.value.render({
              presentTranslate: tv + "px",
              presentTransitionDuration: "0s",
            });
          }
        },

        up({ deltaY, deltaX, initialDirection }: GestureUpPayload) {
          isMoving.value = false;
          busy();
          if (initialDirection != gestureDir.value) {
            present.value.open();
            return;
          }

          let size, diff, val;
          if (props.placement == "bottom" || props.placement == "top") {
            size = modal.value.offsetHeight;
            val = deltaY;
          } else {
            size = modal.value.offsetWidth;
            val = deltaX;
          }

          diff = (val / size) * 100;

          if (diff > 50) {
            emit("close", "gesture");
          } else {
            present.value.open();
          }
        },

        cancel() {
          isMoving.value = false;
          busy();
          present.value.open();
        },
      });
    }
  }
);

onUnmounted(() => {
  if (ges.value) (ges.value as { destroy: () => void }).destroy();
});
</script>
