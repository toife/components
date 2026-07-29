<style lang="scss" src="@/core/features/action/action.scss" scoped></style>
<template src="./action.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import { Present } from "../present";
import { Button as CustomButton } from "../button";
import { FormGroup } from "../form-group";
import {
  ACTION_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getActionAttrs,
  type ActionButton,
  type ActionEvent,
  type ActionProps,
  type AppProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ActionProps>(), {
  ...ACTION_DEFAULT_PROPS,
});
const emit = defineEmits<ActionEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
// Brief "pop" class toggle when backdrop is tapped but the sheet stays open (visual feedback)
const pop = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const actionAttrs = computed(() => {
  const divider =
    (props?.divider !== undefined ? props.divider : unref(appState?.divider)) ?? false;
  const shadow = (props?.shadow !== undefined ? props.shadow : unref(appState?.shadow)) ?? false;
  const shape = props.shape ?? unref(appState?.shape) ?? "";
  const role = props.role ?? unref(appState?.role) ?? "";
  return getActionAttrs({
    role,
    shape,
    placement: props.placement,
    divider,
    shadow,
    pop: pop.value,
  });
});

// Methods
// ----------------------------------------------------------------------------
const onClose = (val: string) => {
  // Named dismiss sources close the sheet; backdrop tap may only play feedback unless listed in dismiss
  if (props.dismiss && props.dismiss.includes(val)) {
    emit("close", val);
  } else if (val === "backdrop") {
    pop.value = true;
    setTimeout(() => {
      pop.value = false;
    }, 300);
  }
};

const onChoose = (btn: ActionButton) => {
  emit("close");
  btn.handler?.();
  emit("choose", btn);
};
</script>
