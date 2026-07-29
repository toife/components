import type { AppDirection } from "../app/app.type";

export type FieldVariant = "outline" | "fill" | "underline";
export type FieldSize = string;
export type FieldType = "text" | "number" | "email" | "password" | "tel" | "url" | "paragraph";

// Type definitions
export type FieldProps = {
  // Wrapper
  modelValue?: string | number;
  name?: string;
  variant?: FieldVariant;
  role?: string;
  shape?: string;
  size?: FieldSize;
  shadow?: boolean;
  direction?: AppDirection;

  // Input
  id?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  maxLength?: number | string;
  tabindex?: number | string;
  type?: FieldType;
  line?: number | string;
  maxLine?: number | string;

  // Support
  message?: string;
};

export type FieldEvent = {
  (e: "update:modelValue", value: string): void;
  (e: "focus", ev: FocusEvent): void;
  (e: "blur", ev: FocusEvent): void;
  (e: "input", ev: Event): void;
  (e: "beforeinput", ev: Event): void;
};

export type FieldAttrOptions = {
  role: string;
  shape: string;
  size: string;
  direction: string;
  variant: FieldVariant;
  type: string;
  disabled: boolean;
  focus: boolean;
  shadow: boolean;
  readonly: boolean;
  line: number;
  maxLine?: number;
};
