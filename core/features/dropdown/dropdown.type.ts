import type { AppDirection } from "../app/app.type";

export type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export type DropdownSize = string;

export type DropdownProps = {
  modelValue?: boolean;
  disabled?: boolean;
  placement?: DropdownPlacement;
  role?: string;
  shadow?: boolean;
  shape?: string;
  direction?: AppDirection;
  size?: DropdownSize;
};

export type DropdownEvent = {
  (e: "update:modelValue", open: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
};

export type DropdownAttrOptions = { role: string; shape: string; size: string; open: boolean; disabled: boolean; shadow: boolean };
export type DropdownPanelAttrOptions = { placement: string };
