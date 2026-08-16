// Type definitions
export type ButtonVariant = "fill" | "outline" | "text";

export type ButtonSize = string;

export type ButtonProps = {
  role?: string;
  size?: ButtonSize;
  shape?: string;
  block?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
};

export type ButtonAttrOptions = {
  role: string;
  shape: string;
  size: string;
  block: boolean;
  variant: ButtonVariant;
  focus: boolean;
};
