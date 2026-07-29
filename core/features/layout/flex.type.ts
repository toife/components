export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

export type FlexOption = {
  breakpoint?: string;
  gap?: string | number;
  direction?: FlexDirection;
  wrap?: string;
  justify?: string;
  align?: string;
};

export type FlexProps = {
  options?: FlexOption[];
};
