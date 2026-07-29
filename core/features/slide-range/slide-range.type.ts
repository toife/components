export type SlideRangeValue = string | number;

export type SlideRangeProps = {
  modelValue?: SlideRangeValue;
  min?: SlideRangeValue;
  max?: SlideRangeValue;
  step?: SlideRangeValue;
  unit?: string;
  disabled?: boolean;
  readonly?: boolean;
  role?: string;
  shape?: string;
  tick?: boolean | SlideRangeValue;
};

export type SlideRangeEvent = {
  (e: "update:modelValue", value: SlideRangeValue): void;
  (e: "change", value: SlideRangeValue): void;
};

export type SlideRangeAttrOptions = { role: string; shape: string; disabled: boolean; readonly: boolean };
export type SlideRangeTrackFrontAttrOptions = { percent: number };
export type SlideRangeThumbAttrOptions = { percent: number };
export type SlideRangeTickAttrOptions = { active: boolean; percent: number };
