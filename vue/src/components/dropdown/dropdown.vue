<style lang="scss" src="@/core/features/dropdown/dropdown.scss" scoped></style>
<template src="./dropdown.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  DROPDOWN_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getDropdownAttrs,
  getDropdownPanelAttrs,
  type AppProviderState,
  type DropdownEvent,
  type DropdownProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<DropdownProps>(), {
  ...DROPDOWN_DEFAULT_PROPS,
});
const emit = defineEmits<DropdownEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const VIEWPORT_GUTTER = 8;

const rootRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const currentPlacement = ref<string>(props.placement);
const panelStyle = ref<Record<string, string>>({});
let positionFrame = 0;
let listening = false;
let resizeObserver: ResizeObserver | null = null;

// Computed properties
// ----------------------------------------------------------------------------
const wrapperAttrs = computed(() => {
  const role = props.role ?? unref(appState?.role) ?? "";
  const shape = props.shape ?? unref(appState?.shape) ?? "";

  return getDropdownAttrs({
    role,
    shape,
    size: props.size,
    open: isOpen.value,
    disabled: props.disabled,
    placement: currentPlacement.value,
  });
});

const panelAttrs = computed(() => getDropdownPanelAttrs({}));

// Methods
// ----------------------------------------------------------------------------
const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  emit("update:modelValue", isOpen.value);
};

const close = () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  emit("update:modelValue", false);
};

const showPanel = () => {
  const panel = panelRef.value;
  if (!panel || panel.matches(":popover-open")) return;
  panel.showPopover();
};

const hidePanel = () => {
  const panel = panelRef.value;
  if (!panel?.matches(":popover-open")) return;
  panel.hidePopover();
};

const getAnchor = (root: HTMLElement, panel: HTMLElement) => {
  const trigger = Array.from(root.children).find(
    (node): node is HTMLElement => node !== panel && node instanceof HTMLElement
  );
  return trigger ?? root;
};

const clipsOverflow = (el: HTMLElement) => {
  const style = window.getComputedStyle(el);
  return /(auto|scroll|hidden|clip|overlay)/.test(`${style.overflowX}${style.overflowY}`);
};

const isTriggerClipped = (el: HTMLElement, rect: DOMRect) => {
  let node = el.parentElement;

  while (node && node !== document.documentElement) {
    if (clipsOverflow(node)) {
      const bounds = node.getBoundingClientRect();
      const visible =
        rect.bottom > bounds.top &&
        rect.top < bounds.bottom &&
        rect.right > bounds.left &&
        rect.left < bounds.right;
      if (!visible) return true;
    }
    node = node.parentElement;
  }

  return false;
};

// Place the panel over the trigger. Width follows the trigger, not the page.
const updatePosition = () => {
  const root = rootRef.value;
  const panel = panelRef.value;
  if (!root || !panel || !isOpen.value) return;

  const anchor = getAnchor(root, panel);
  const rect = anchor.getBoundingClientRect();
  if ((rect.width === 0 && rect.height === 0) || isTriggerClipped(anchor, rect)) {
    panelStyle.value = { visibility: "hidden" };
    return;
  }

  panel.style.minWidth = `${rect.width}px`;
  const panelWidth = panel.offsetWidth;
  const panelHeight = panel.offsetHeight;
  const computedStyle = window.getComputedStyle(panel);
  const marginTop = Number.parseFloat(computedStyle.marginTop) || 0;
  const marginBottom = Number.parseFloat(computedStyle.marginBottom) || 0;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const [side, align] = props.placement.split("-");

  let nextSide = side;
  if (side === "bottom" && spaceBelow < panelHeight + marginTop && spaceAbove > spaceBelow)
    nextSide = "top";
  else if (side === "top" && spaceAbove < panelHeight + marginBottom && spaceBelow > spaceAbove)
    nextSide = "bottom";

  const overflowStart = Math.max(0, rect.left + panelWidth - window.innerWidth);
  const overflowEnd = Math.max(0, panelWidth - rect.right);

  let nextAlign = align;
  if (align === "start" && overflowStart > 0 && overflowEnd < overflowStart) nextAlign = "end";
  else if (align === "end" && overflowEnd > 0 && overflowStart < overflowEnd) nextAlign = "start";

  const nextPlacement = `${nextSide}-${nextAlign}`;
  if (currentPlacement.value !== nextPlacement) currentPlacement.value = nextPlacement;

  let left = nextAlign === "start" ? rect.left : rect.right - panelWidth;
  const available = window.innerWidth - VIEWPORT_GUTTER * 2;
  if (panelWidth >= available) left = VIEWPORT_GUTTER;
  else
    left = Math.min(
      Math.max(VIEWPORT_GUTTER, left),
      window.innerWidth - VIEWPORT_GUTTER - panelWidth
    );

  const top = nextSide === "bottom" ? rect.bottom : rect.top - panelHeight - marginTop - marginBottom;

  panelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    right: "auto",
    bottom: "auto",
    minWidth: `${rect.width}px`,
    visibility: "visible",
  };
};

const schedulePosition = () => {
  if (positionFrame) return;
  positionFrame = window.requestAnimationFrame(() => {
    positionFrame = 0;
    updatePosition();
  });
};

const onScroll = (event: Event) => {
  const target = event.target;
  const panel = panelRef.value;
  if (panel && target instanceof Node && panel.contains(target)) return;
  schedulePosition();
};

const observeAnchor = () => {
  resizeObserver?.disconnect();
  const root = rootRef.value;
  const panel = panelRef.value;
  if (!root || !panel || typeof ResizeObserver === "undefined") return;
  resizeObserver = new ResizeObserver(() => schedulePosition());
  resizeObserver.observe(getAnchor(root, panel));
};

const bindPositionListeners = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("resize", schedulePosition);
  window.addEventListener("scroll", onScroll, true);
  window.visualViewport?.addEventListener("resize", schedulePosition);
  window.visualViewport?.addEventListener("scroll", schedulePosition);
  observeAnchor();
};

const unbindPositionListeners = () => {
  if (positionFrame) {
    window.cancelAnimationFrame(positionFrame);
    positionFrame = 0;
  }
  if (!listening) return;
  listening = false;
  window.removeEventListener("resize", schedulePosition);
  window.removeEventListener("scroll", onScroll, true);
  window.visualViewport?.removeEventListener("resize", schedulePosition);
  window.visualViewport?.removeEventListener("scroll", schedulePosition);
  resizeObserver?.disconnect();
  resizeObserver = null;
};

const onDocPointerDown = (e: PointerEvent) => {
  if (!isOpen.value) return;
  const target = e.target;
  if (!(target instanceof Node)) return;
  if (rootRef.value?.contains(target)) return;
  close();
};

const onDocKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    e.preventDefault();
    close();
  }
};

const openPanel = () => {
  nextTick(() => {
    if (!isOpen.value) return;
    showPanel();
    updatePosition();
    bindPositionListeners();
  });
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => props.modelValue,
  (open) => {
    isOpen.value = open;
  },
  { immediate: true }
);

watch(
  () => props.placement,
  (placement) => {
    currentPlacement.value = placement;
    if (isOpen.value) nextTick(updatePosition);
  }
);

watch(isOpen, (next, prev) => {
  if (next) {
    currentPlacement.value = props.placement;
    panelStyle.value = { visibility: "hidden" };
    openPanel();
  } else {
    hidePanel();
    unbindPositionListeners();
  }
  if (next && !prev) emit("open");
  if (!next && prev) emit("close");
});

onMounted(() => {
  document.addEventListener("pointerdown", onDocPointerDown, true);
  document.addEventListener("keydown", onDocKeydown, true);
  if (isOpen.value) openPanel();
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", onDocPointerDown, true);
  document.removeEventListener("keydown", onDocKeydown, true);
  hidePanel();
  unbindPositionListeners();
});
</script>
