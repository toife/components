import type { AppDirection } from "../app/app.type";
import type { FieldSize, FieldVariant } from "../field/field.type";

export type TextFieldVariant = FieldVariant;
export type TextFieldSize = FieldSize;
export type TextFieldType = "text" | "number" | "email" | "password" | "tel" | "url" | "paragraph";

export type TextFieldProps = {
  // Wrapper
  modelValue?: string | number;
  name?: string;
  variant?: TextFieldVariant;
  role?: string;
  shape?: string;
  size?: TextFieldSize;
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
  type?: TextFieldType;
  line?: number | string;
  maxLine?: number | string;

  // Support — rendered by Field, outside the box
  message?: string;
  hint?: string;
};

export type TextFieldEvent = {
  (e: "update:modelValue", value: string): void;
  (e: "focus", ev: FocusEvent): void;
  (e: "blur", ev: FocusEvent): void;
  (e: "input", ev: Event): void;
  (e: "beforeinput", ev: Event): void;
};

export type TextFieldAttrOptions = {
  role: string;
  shape: string;
  size: string;
  direction: string;
  variant: TextFieldVariant;
  type: string;
  disabled: boolean;
  focus: boolean;
  readonly: boolean;
  line: number;
  maxLine?: number;
};
