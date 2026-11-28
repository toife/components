export type BadgeVariant = "fill" | "outline" | "text";

/** Edge (centered) or corner of the slotted component. */
export type BadgePlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type BadgeSize = string;

export type BadgeProps = {
  role?: string;
  size?: BadgeSize;
  shape?: string;
  variant?: BadgeVariant;
  /** Where the marker sits on the slotted component. */
  placement?: BadgePlacement;
  /** Marker with no label. */
  dot?: boolean;
  /** Marker label. Ignored when `dot` is set. Slot `content` overrides this. */
  content?: string | number;
};

export type BadgeMarkAttrOptions = {
  role: string;
  shape: string;
  size: string;
  variant: BadgeVariant;
  placement: BadgePlacement;
  dot: boolean;
};
