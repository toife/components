import { cssPrefix, cssProperty } from "../../utils";
import type { FlexItemOption } from "./flex-item.type";

export const getFlexItemAttrs = (options: FlexItemOption[]) => ({
  class: [cssPrefix("flex-item")],
  style: options.map((option) => ({
    [cssProperty(["grow", option?.breakpoint || ""])]: option.grow,
    [cssProperty(["shrink", option?.breakpoint || ""])]: option.shrink,
    [cssProperty(["basis", option?.breakpoint || ""])]: option.basis,
    [cssProperty(["order", option?.breakpoint || ""])]: option.order,
  })),
});
