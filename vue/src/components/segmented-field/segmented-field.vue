<style lang="scss" src="@/core/features/segmented-field/segmented-field.scss" scoped></style>
<template src="./segmented-field.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, ref } from "vue";
import { Field } from "../field";
import {
  SEGMENTED_FIELD_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getSegmentedFieldContentAttrs,
  getSegmentedFieldMessageAttrs,
  getSegmentedFieldWrapperAttrs,
  type AppProviderState,
  type SegmentedFieldEvent,
  type SegmentedFieldProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<SegmentedFieldProps>(), {
  ...SEGMENTED_FIELD_DEFAULT_PROPS,
});
const emit = defineEmits<SegmentedFieldEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const keepValue = ref<string[]>([]);
const fields = ref<InstanceType<typeof Field>[]>([]);

// Computed properties
// ----------------------------------------------------------------------------
const segments = computed(() => {
  const source =
    props.modelValue !== undefined
      ? props.modelValue
      : props.value !== undefined
        ? props.value
        : keepValue.value;

  return Array.from({ length: props.length }, (_, i) => source?.[i] ?? "");
});

const firstEmptyIndex = computed(() => {
  const empty = segments.value.findIndex((char) => !char);
  return empty === -1 ? props.length - 1 : empty;
});

const wrapperAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  const direction = props.direction || unref(appState?.direction) || "left";

  return getSegmentedFieldWrapperAttrs({
    role,
    shape,
    direction,
    variant: props.variant,
    size: props.size,
    disabled: props.disabled,
  });
});

const contentAttrs = getSegmentedFieldContentAttrs();

const fieldAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  return {
    variant: props.variant,
    size: props.size,
    disabled: props.disabled,
    readonly: props.readonly,
    shape,
    role,
    type: props.type,
    maxLength: 1,
    autocomplete: "off",
  };
});

const messageAttrs = getSegmentedFieldMessageAttrs();

// Methods
// ----------------------------------------------------------------------------
const normalizeChar = (raw: string, index: number) => {
  if (!raw) return "";
  let char = raw.slice(-1);
  const pattern = props.pattern?.[index] ?? props.pattern?.[0];
  if (pattern && !new RegExp(pattern).test(char)) return "";
  return char;
};

const getFieldInput = (index: number) => {
  const root = fields.value[index]?.$el as HTMLElement | undefined;
  return root?.querySelector("input, textarea") as HTMLInputElement | HTMLTextAreaElement | null;
};

const syncFieldInputs = async () => {
  await nextTick();
  for (let i = 0; i < props.length; i++) {
    const input = getFieldInput(i);
    if (input) input.value = segments.value[i] ?? "";
  }
};

const updateValue = async (newValue: string[]) => {
  const normalized = Array.from({ length: props.length }, (_, i) => newValue[i] ?? "");
  keepValue.value = normalized;
  emit("update:modelValue", normalized);
  emit("input", normalized);

  if (normalized.every((char) => char)) {
    emit("complete", normalized);
  }

  await syncFieldInputs();
};

const focusInput = async (index: number) => {
  if (props.disabled || props.readonly) return;
  const safeIndex = Math.max(0, Math.min(index, props.length - 1));
  await nextTick();
  const input = getFieldInput(safeIndex);
  input?.focus();
  if (input && "select" in input) {
    input.select();
  }
};

const setCell = (index: number, char: string) => {
  const next = [...segments.value];
  next[index] = char;
  updateValue(next);
};

const applyChar = (index: number, raw: string) => {
  const char = normalizeChar(raw, index);
  if (!char) return;

  setCell(index, char);

  if (index < props.length - 1) {
    focusInput(index + 1);
  }
};

const handlePaste = (text: string, startIndex: number) => {
  const chars = text.replace(/\s/g, "").split("");
  if (!chars.length) return;

  const next = [...segments.value];
  let cursor = startIndex;

  for (const ch of chars) {
    if (cursor >= props.length) break;
    const normalized = normalizeChar(ch, cursor);
    if (!normalized) continue;
    next[cursor] = normalized;
    cursor += 1;
  }

  updateValue(next);
  focusInput(Math.min(cursor, props.length - 1));
};

const onFieldClick = () => {
  focusInput(firstEmptyIndex.value);
};

const onSegmentFocus = (ev: FocusEvent, index: number) => {
  emit("focus", ev);
  const input = getFieldInput(index);
  input?.select?.();
};

const onSegmentBeforeinput = (ev: InputEvent, index: number) => {
  if (props.disabled || props.readonly) return;

  const { inputType } = ev;

  if (inputType === "insertText" && ev.data != null) {
    ev.preventDefault();
    if (ev.data.length > 1) {
      handlePaste(ev.data, index);
    } else {
      applyChar(index, ev.data);
    }
    return;
  }

  if (inputType === "insertFromPaste" && ev.dataTransfer) {
    ev.preventDefault();
    const text = ev.dataTransfer.getData("text");
    handlePaste(text, index);
    return;
  }

  if (inputType === "deleteContentBackward") {
    ev.preventDefault();
    const next = [...segments.value];

    if (next[index]) {
      next[index] = "";
      updateValue(next);
      return;
    }

    if (index > 0) {
      next[index - 1] = "";
      updateValue(next);
      focusInput(index - 1);
    }
  }
};

const onSegmentInput = (ev: Event, index: number) => {
  if (props.disabled || props.readonly) return;

  const target = ev.target as HTMLInputElement | null;
  if (!target) return;

  const value = target.value;
  const current = segments.value[index] ?? "";

  // after beforeinput + preventDefault the input stays empty while state already updated
  if (!value) {
    if (!current) setCell(index, "");
    return;
  }

  if (value.length > 1) {
    handlePaste(value, index);
    return;
  }

  if (value === current) return;

  applyChar(index, value);
};
</script>
