import { AppDirection } from "../app/app.type";
import type { FieldVariant, FieldSize } from "../field/field.type";

export type SegmentedFieldVariant = FieldVariant;
export type SegmentedFieldSize = FieldSize;

export type SegmentedFieldProps = {
  modelValue?: string[];
  value?: string[];
  length?: number;
  variant?: SegmentedFieldVariant;
  size?: SegmentedFieldSize;
  disabled?: boolean;
  readonly?: boolean;
  type?: string;
  role?: string;
  shape?: string;
  shadow?: boolean;
  message?: string;
  pattern?: string[];
  direction?: AppDirection;
};

export type SegmentedFieldEvent = {
  (e: "update:modelValue", value: string[]): void;
  (e: "complete", value: string[]): void;
  (e: "focus", ev: FocusEvent): void;
  (e: "blur", ev: FocusEvent): void;
  (e: "input", value: string[]): void;
};

export type SegmentedFieldAttrOptions = {
  role: string;
  shape: string;
  direction: string;
  variant: SegmentedFieldVariant;
  size: string;
  disabled: boolean;
};
