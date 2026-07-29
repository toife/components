export type TooltipPlacement = "top" | "left" | "right" | "bottom";

export type TooltipSize = string;

export type TooltipProps = {
  placement?: TooltipPlacement;
  disabled?: boolean;
  role?: string;
  shape?: string;
  size?: TooltipSize;
};

export type TooltipAttrOptions = {
  role: string;
  shape: string;
  size: string;
  disabled: boolean;
};

export type TooltipContentAttrOptions = {
  placement: string;
};
