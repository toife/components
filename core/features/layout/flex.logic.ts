import { cssPrefix, cssProperty } from "../../utils";
import type { FlexOption } from "./flex.type";

export const getFlexAttrs = (options: FlexOption[]) => ({
  class: [cssPrefix("flex")],
  style: options.map((option) => ({
    [cssProperty(["gap", option?.breakpoint || ""])]:
      typeof option.gap === "number" ? `${option.gap}px` : option.gap,
    [cssProperty(["direction", option?.breakpoint || ""])]: option.direction,
    [cssProperty(["wrap", option?.breakpoint || ""])]: option.wrap,
    [cssProperty(["justify", option?.breakpoint || ""])]: option.justify,
    [cssProperty(["align", option?.breakpoint || ""])]: option.align,
  })),
});
