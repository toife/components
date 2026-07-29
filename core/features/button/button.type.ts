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
  shadow?: boolean;
};

export type ButtonAttrOptions = {
  role: string;
  shape: string;
  size: string;
  block: boolean;
  variant: ButtonVariant;
  shadow: boolean;
  focus: boolean;
};
