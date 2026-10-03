<style lang="scss" src="@/core/features/tag-field/tag-field.scss" scoped></style>
<template src="./tag-field.html"></template>
<script lang="ts" setup>
import { computed, inject, ref, unref, watch } from "vue";
import {
  APP_PROVIDER_STATE_KEY,
  TAG_FIELD_DEFAULT_PROPS,
  getTagFieldAttrs,
  getTagFieldContentAttrs,
  getTagFieldInputAttrs,
  getTagFieldChipAttrs,
  getTagFieldMessageAttrs,
  getTagFieldRemoveAttrs,
  getTagFieldSuggestionAttrs,
  getTagFieldSuggestionsAttrs,
  getTagFieldTextAttrs,
  hasTag,
  normalizeTagText,
  splitTagText,
  type AppProviderState,
  type TagFieldEvent,
  type TagFieldProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TagFieldProps>(), {
  ...TAG_FIELD_DEFAULT_PROPS,
});
const emit = defineEmits<TagFieldEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const input = ref<HTMLInputElement | null>(null);
const isFocus = ref(false);
/** Text being typed, not yet a tag. */
const text = ref("");

// Computed properties
// ----------------------------------------------------------------------------
const limit = computed(() => (props.max === undefined || props.max === "" ? Infinity : Number(props.max)));
const full = computed(() => props.modelValue.length >= limit.value);
/** Suggestions that are not tags yet. */
const available = computed(() => props.suggestions.filter((tag) => !hasTag(props.modelValue, tag)));

const tagFieldAttrs = computed(() =>
  getTagFieldAttrs({
    role: props.role || unref(appState?.role) || "",
    shape: props.shape || unref(appState?.shape) || "",
    size: props.size,
    direction: props.direction || unref(appState?.direction) || "left",
    variant: props.variant,
    disabled: props.disabled,
    focus: isFocus.value,
    readonly: props.readonly,
    full: full.value,
  }),
);
const contentAttrs = computed(() => getTagFieldContentAttrs());
const chipAttrs = computed(() => getTagFieldChipAttrs());
const textAttrs = computed(() => getTagFieldTextAttrs());
const removeAttrs = computed(() => getTagFieldRemoveAttrs());
const messageAttrs = computed(() => getTagFieldMessageAttrs());
const suggestionsAttrs = computed(() => getTagFieldSuggestionsAttrs());
const suggestionAttrs = computed(() => getTagFieldSuggestionAttrs());
const inputAttrs = computed(() => ({
  ...getTagFieldInputAttrs(),
  name: props.name,
  id: props.id,
  type: "text",
  placeholder: props.modelValue.length > 0 ? "" : props.placeholder,
  autocomplete: props.autocomplete,
  readonly: props.readonly || full.value,
  disabled: props.disabled,
  maxlength: props.maxLength,
  tabindex: props.tabindex,
}));

// Methods
// ----------------------------------------------------------------------------
const locked = () => props.disabled || props.readonly;

/** Add one tag; returns whether it was accepted. */
const add = (raw: string) => {
  const tag = normalizeTagText(raw);

  if (!tag || locked() || full.value) return false;
  if (!props.allowDuplicates && hasTag(props.modelValue, tag)) return false;

  emit("update:modelValue", [...props.modelValue, tag]);
  emit("add", tag);

  return true;
};

const remove = (tag: string) => {
  if (locked()) return;

  emit("update:modelValue", props.modelValue.filter((item) => item !== tag));
  emit("remove", tag);
};

/** Turn the typed text into a tag and clear the input. */
const commit = () => {
  add(text.value);
  text.value = "";
};

const onKeydown = (ev: KeyboardEvent) => {
  // A key that commits an IME candidate (Vietnamese, Japanese…) is not ours.
  if (ev.isComposing || ev.keyCode === 229) return;

  if (props.separators.includes(ev.key)) {
    ev.preventDefault();
    commit();
    return;
  }

  // Backspace on an empty input takes the last tag back.
  if (ev.key === "Backspace" && !text.value && props.modelValue.length > 0) {
    remove(props.modelValue[props.modelValue.length - 1]);
  }
};

/** Pasted text holding separators becomes several tags. */
const onPaste = (ev: ClipboardEvent) => {
  const pasted = ev.clipboardData?.getData("text") ?? "";
  const parts = splitTagText(pasted, props.separators);

  if (locked() || (parts.length <= 1 && !/[\n\r]/.test(pasted) && parts[0] === normalizeTagText(pasted))) return;

  ev.preventDefault();
  parts.forEach(add);
};

const onFocus = (ev: FocusEvent) => {
  if (props.disabled) return;
  isFocus.value = true;
  emit("focus", ev);
};

const onBlur = (ev: FocusEvent) => {
  if (props.disabled) return;
  isFocus.value = false;
  if (props.addOnBlur) commit();
  emit("blur", ev);
};

/** A click on the box (not on a chip's button) goes to the input. */
const onClick = (ev: MouseEvent) => {
  if ((ev.target as HTMLElement).closest("button, [role=button]")) return;

  input.value?.focus();
};

// Watchers
// ----------------------------------------------------------------------------
watch(text, (value) => emit("input", value));
</script>
