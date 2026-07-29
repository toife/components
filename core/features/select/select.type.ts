import type { FieldSize, FieldVariant } from "../field";
import type { AppDirection } from "../app/app.type";

export type SelectVariant = FieldVariant;
export type SelectSize = FieldSize;

export type SelectOption = {
  label?: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  // Wrapper
  modelValue?: string;
  name?: string;
  variant?: FieldVariant;
  role?: string;
  shape?: string;
  size?: FieldSize;
  shadow?: boolean;
  direction?: AppDirection;

  // Input
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: string;
  tabindex?: number | string;
  line?: number | string;
  maxLine?: number | string;

  // Support
  message?: string;

  // Data
  options: Array<SelectOption>;
};

export type SelectEvent = {
  (e: "update:modelValue", value: string): void;
  (e: "select", option: SelectOption): void;
};

export type SelectAttrOptions = { role: string; direction: string; size: string; disabled: boolean };
