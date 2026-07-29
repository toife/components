// Type definitions
export type CollapseProps = {
  modelValue?: boolean;
  duration?: number;
  role?: string;
  disabled?: boolean;
};

export type CollapseEvent = {
  (e: "update:modelValue", value: boolean): void;
};

export type CollapseAttrOptions = { role: string; open: boolean; disabled: boolean };
export type CollapseTriggerAttrOptions = { open: boolean; disabled: boolean };
export type CollapseContentAttrOptions = { transition: boolean; duration?: string; height: string };
