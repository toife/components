export type FlexItemOption = {
  breakpoint?: string;
  grow?: number;
  shrink?: number;
  basis?: string;
  order?: number;
};

export type FlexItemProps = {
  options?: FlexItemOption[];
};
