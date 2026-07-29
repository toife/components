import type { SelectOption } from "./select.type";

/**
 * Select Default Props
 */
export const SELECT_DEFAULT_PROPS = {
  modelValue: "",
  size: "standard",
  disabled: false,
  message: "",
  variant: "outline",
  placeholder: "",
  shadow: undefined,
  direction: undefined,
  options: () => [] as Array<SelectOption>,
} as const;