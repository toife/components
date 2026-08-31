export type ProgressVariant = "bar" | "circle";

export type ProgressSize = string;

export type ProgressProps = {
  variant?: ProgressVariant;
  value?: number;
  max?: number;
  indeterminate?: boolean;
  role?: string;
  shape?: string;
  size?: ProgressSize;
};

export type ProgressAttrOptions = {
  role: string;
  shape: string;
  size: string;
  variant: ProgressVariant;
  indeterminate: boolean;
  percent: number;
};
