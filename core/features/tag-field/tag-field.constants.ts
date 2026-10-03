/**
 * TagField Default Props
 */
export const TAG_FIELD_DEFAULT_PROPS = {
  modelValue: () => [],
  variant: "outline",
  size: "standard",
  role: undefined,
  shape: undefined,
  direction: undefined,
  disabled: false,
  readonly: false,
  placeholder: "",
  message: "",
  max: undefined,
  separators: () => ["Enter", ","],
  allowDuplicates: false,
  addOnBlur: false,
  suggestions: () => [],
} as const;
