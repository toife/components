<style lang="scss" src="@/core/features/present/present.scss" scoped></style>
<template src="./present.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, onMounted, reactive, ref, watch } from "vue";
import { usePresent } from "./present.composable";
import {
  PRESENT_DEFAULT_PROPS,
  PRESENT_DEFAULT_STYLES,
  APP_PROVIDER_STATE_KEY,
  getAppClassSelector,
  getPresentAttrs,
  getPresentBackdropAttrs,
  type AppProviderState,
  type PresentEvent,
  type PresentProps,
  type RenderOptions,
  type PresentStyles,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PresentProps>(), {
  ...PRESENT_DEFAULT_PROPS,
});
const emit = defineEmits(["close"]) as unknown as PresentEvent;
const presentIndex = usePresent();
const appState = inject<ProviderStateRefs<AppProviderState> | null>(APP_PROVIDER_STATE_KEY, null);

// Reactive state
// ----------------------------------------------------------------------------
const isBounced = ref(false);
const zIndex = ref(0);
const isShow = ref(false);
const isReadyBackdrop = ref(false);
const isTeleportReady = ref(false);
const styles = reactive<PresentStyles>({ ...PRESENT_DEFAULT_STYLES });

// Computed properties
// ----------------------------------------------------------------------------
const teleportTo = computed(() => {
  if (props.teleport) return props.teleport;
  if (unref(appState?.rootEl)) return unref(appState?.rootEl);
  return getAppClassSelector();
});

const syncTeleportReady = () => {
  if (props.teleport) {
    isTeleportReady.value = !!document.querySelector(props.teleport);
    return;
  }

  if (unref(appState?.rootEl)) {
    isTeleportReady.value = true;
    return;
  }

  isTeleportReady.value = !!document.querySelector(getAppClassSelector());
};

const backdropAttrs = computed(() =>
  getPresentBackdropAttrs({
    zIndex: zIndex.value - 1,
    backdropTransitionDuration: styles.backdropTransitionDuration,
    backdropOpacity: props.backdrop === "transparent" ? 0 : styles.backdropOpacity,
  })
);

// Present attributes
const presentAttrs = computed(() =>
  getPresentAttrs({
    zIndex: zIndex.value,
    presentTransitionDuration: styles.presentTransitionDuration,
    presentTranslate: styles.presentTranslate,
    presentOpacity: styles.presentOpacity,
    className: props.class,
    placement: props.placement,
    style: props.style,
  })
);

const isRender = computed(() => {
  return isShow.value || props.keepalive;
});

const time = computed(() => {
  return props.duration / 1000 + "s";
});

// Methods
// ----------------------------------------------------------------------------
const createIndex = () => {
  zIndex.value = presentIndex.newIndex();
};

const render = (data: RenderOptions) => {
  if (data.backdropTransitionDuration !== undefined) {
    styles.backdropTransitionDuration = data.backdropTransitionDuration;
  }
  if (data.presentTransitionDuration !== undefined) {
    styles.presentTransitionDuration = data.presentTransitionDuration;
  }

  styles.backdropOpacity = data.backdropOpacity;

  if (data.presentTranslate !== undefined) {
    styles.presentTranslate = data.presentTranslate;
  }
  if (data.presentOpacity !== undefined) {
    styles.presentOpacity = data.presentOpacity;
  }
};

// On click backdrop
const onClickBackdrop = (e: unknown) => {
  (e as Event).preventDefault();
  if (isReadyBackdrop.value) emit("close", "backdrop");
};

const open = () => {
  setTimeout(() => {
    isReadyBackdrop.value = true;
  }, 300);

  if (props.bounce && !isBounced.value) {
    isBounced.value = true;
    let presentTranslate = props.bounce;

    if (props.placement == "bottom" || props.placement == "right") {
      presentTranslate = `calc(${props.bounce} * -1)`;
    }

    render({
      backdropTransitionDuration: time.value,
      backdropOpacity: undefined,
      presentTranslate: String(presentTranslate),
      presentTransitionDuration: time.value,
      presentOpacity: 1,
    });

    setTimeout(() => {
      render({
        presentTranslate: "0px",
      });
    }, props.duration);
  } else {
    render({
      backdropOpacity: undefined,
      backdropTransitionDuration: time.value,
      presentTranslate: "0px",
      presentTransitionDuration: time.value,
      presentOpacity: 1,
    });
  }
};

const close = () => {
  isReadyBackdrop.value = false;
  isBounced.value = false;
  let presentTranslate = "0px";
  let presentOpacity = 1;

  if (props.placement == "bottom" || props.placement == "right") {
    presentTranslate = "100%";
  } else if (props.placement == "top" || props.placement == "left") {
    presentTranslate = "-100%";
  } else if (props.placement == "center") {
    presentTranslate = "0px";
    presentOpacity = 0;
  }

  render({
    backdropOpacity: 0,
    backdropTransitionDuration: time.value,
    presentTranslate,
    presentTransitionDuration: time.value,
    presentOpacity,
  });
};

// Lifecycle
// ----------------------------------------------------------------------------
onMounted(() => {
  syncTeleportReady();
  if (!isTeleportReady.value) {
    nextTick(() => {
      syncTeleportReady();
      if (!isTeleportReady.value) requestAnimationFrame(syncTeleportReady);
    });
  }

  if (props.visible) open();
  else close();
});

watch(
  () => [props.teleport, unref(appState?.rootEl)] as const,
  () => syncTeleportReady(),
  { immediate: true }
);

// Trigger visible
watch(
  () => props.visible,
  () => {
    if (props.visible) {
      createIndex();
      isShow.value = true;

      setTimeout(() => {
        open();
      }, 100);
    } else {
      close();

      setTimeout(() => {
        isShow.value = false;
      }, props.duration);
    }
  }
);

// Provide / expose (public API)
// ----------------------------------------------------------------------------
defineExpose({
  render,
  open,
  close,
});
</script>
