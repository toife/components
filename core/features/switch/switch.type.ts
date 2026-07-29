export type SwitchSize = string;

// Type definitions
export type SwitchProps = {
  modelValue?: boolean;
  role?: string;
  size?: SwitchSize;
  shape?: string;
  disabled?: boolean;
  readonly?: boolean;
  shadow?: boolean;
  bounce?: number | string;
};

export type SwitchEvent = {
  (e: "update:modelValue", value: boolean): void;
};

export type SwitchWrapperAttrOptions = { disabled: boolean; readonly: boolean; shadow: boolean; focus: boolean; modelValue: boolean; transition: boolean; bounce: number | string };
export type SwitchAttrOptions = { role: string; shape: string; size: string };
