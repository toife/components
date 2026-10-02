import type { AppDirection } from "../app/app.type";

// Type definitions
export type DatePickerType = "date" | "time" | "datetime";

export type DatePickerView = "day" | "month" | "year";

export type DatePickerTimeUnit = "hours" | "minutes" | "seconds";

export type DatePickerSize = string;

export type DatePickerValue = Date | null;

export type DatePickerProps = {
  modelValue?: DatePickerValue;
  value?: DatePickerValue;
  type?: DatePickerType;
  min?: Date;
  max?: Date;
  seconds?: boolean;
  firstDay?: number;
  locale?: string;
  size?: DatePickerSize;
  role?: string;
  shape?: string;
  disabled?: boolean;
  direction?: AppDirection;
};

export type DatePickerEvent = {
  (e: "update:modelValue", value: Date): void;
  (e: "change", value: Date): void;
};

export type DatePickerCalendarOptions = {
  year: number;
  month: number;
  firstDay: number;
};

export type DatePickerAttrOptions = {
  role: string;
  shape: string;
  direction: string;
  size: string;
  disabled: boolean;
};

export type DatePickerCellAttrOptions = {
  active: boolean;
  today?: boolean;
  outside?: boolean;
};
