export type CheckboxVariant = "fill" | "outline";
export type CheckboxSize = string;

export type CheckboxProps = {
  modelValue?: boolean;
  role?: string;
  size?: CheckboxSize;
  shape?: string;
  variant?: CheckboxVariant;
  readonly?: boolean;
  disabled?: boolean;
  shadow?: boolean;
};

export type CheckboxEvent = {
  (e: "update:modelValue", value: boolean): void;
  (e: "focus"): void;
  (e: "blur"): void;
};

export type CheckboxAttrOptions = {
  role: string;
  shape: string;
  size: string;
  variant: CheckboxVariant;
  modelValue: boolean;
  disabled: boolean;
  readonly: boolean;
  shadow: boolean;
  focus: boolean;
};
