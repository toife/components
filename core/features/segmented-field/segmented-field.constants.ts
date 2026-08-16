/**
 * Segmented Field Default Props
 */
export const SEGMENTED_FIELD_DEFAULT_PROPS = {
  modelValue: undefined,
  value: undefined,
  direction: undefined,
  length: 6,
  variant: "outline",
  size: "standard",
  disabled: false,
  readonly: false,
  type: "text",
  message: "",
  pattern: (): string[] => [],
} as const;