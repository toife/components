<style lang="scss" src="@/core/features/decision-modal/decision-modal.scss" scoped></style>
<template src="./decision-modal.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import { Present } from "../present";
import { Button as CustomButton } from "../button";
import {
  DECISION_MODAL_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getDecisionModalAttrs,
  getDecisionModalBodyAttrs,
  getDecisionModalFooterAttrs,
  getDecisionModalHeaderAttrs,
  type DecisionModalButton,
  type AppProviderState,
  type DecisionModalEvent,
  type DecisionModalProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<DecisionModalProps>(), {
  ...DECISION_MODAL_DEFAULT_PROPS,
});
const emit = defineEmits<DecisionModalEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const pop = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const shape = computed(() => {
  return props.shape || unref(appState?.shape) || "";
});

const divider = computed(() => {
  return (props.divider !== undefined ? props.divider : unref(appState?.divider)) ?? false;
});

const decisionModalAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";

  return getDecisionModalAttrs({
    role,
    shape: shape.value,
    pop: pop.value,
    divider: divider.value,
  });
});

const decisionModalHeaderAttrs = computed(() => getDecisionModalHeaderAttrs());
const decisionModalBodyAttrs = computed(() => getDecisionModalBodyAttrs());
const decisionModalFooterAttrs = computed(() => getDecisionModalFooterAttrs({ direction: props.direction }));

// Methods
// ----------------------------------------------------------------------------
const onClose = (val: string) => {
  if (props.dismiss && props.dismiss.includes(val)) {
    emit("close", val);
  } else if (val === "backdrop") {
    pop.value = true;
    setTimeout(() => {
      pop.value = false;
    }, 300);
  }
};

const onChoose = (btn: DecisionModalButton) => {
  emit("close");
  btn.handler?.();
  emit("choose", btn);
};
</script>
