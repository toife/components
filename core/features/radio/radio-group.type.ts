export type RadioVariant = "fill" | "outline";
export type RadioGroupDirection = "horizontal" | "vertical";

export type RadioGroupProps = {
  modelValue?: string | number;
  role?: string;
  shape?: string;
  variant?: RadioVariant;
  disabled?: boolean;
  readonly?: boolean;
  shadow?: boolean;
  direction?: RadioGroupDirection;
};

export type RadioGroupEvent = {
  (e: "update:modelValue", value: string | number): void;
};

export type RadioGroupProviderState = {
  modelValue: string | number | undefined;
  role: string;
  shape: string;
  variant: RadioVariant;
  disabled: boolean;
  readonly: boolean;
  shadow: boolean;
  setValue: (val: string | number) => void;
};

export type RadioGroupAttrOptions = { direction: string };
