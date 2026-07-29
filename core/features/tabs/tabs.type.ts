export type TabsVariant = "fill" | "underline" | "text";
export type TabsSize = string;
export type TabsPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

export type TabsProps = {
  placement?: TabsPlacement;
  variant?: TabsVariant;
  role?: string;
  modelValue?: string;
  border?: number[];
  margin?: number[];
  shape?: string;
  transition?: boolean;
  size?: TabsSize;
};

export type TabsEvent = {
  (e: "update:modelValue", value: string): void;
};

export type TabsProviderState = {
  activeValue: string;
  role: string;
  shape: string;
  size: TabsSize;
  setValue: (val: string) => void;
};

export type TabsAttrOptions = {
  role: string;
  shape: string;
  placement: TabsPlacement;
  variant: TabsVariant;
  transition: boolean;
};

export type TabsHighlightPositionOptions = {
  top: number;
  left: number;
  width: number;
  height: number;
  margin: number[];
  border: number[];
  variant: TabsVariant;
  placement: TabsPlacement;
};

export type TabsHighlightPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type TabsHighlightStyleOptions = {
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
  marginX: number;
  marginY: number;
};
