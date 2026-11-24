// Type definitions
export type BadgeSize = string;

export type BadgeProps = {
  role?: string;
  size?: BadgeSize;
  shape?: string;
  /** Marker with no label. Ignores the default slot. */
  dot?: boolean;
};

export type BadgeAttrOptions = {
  role: string;
  shape: string;
  size: string;
  dot: boolean;
};
