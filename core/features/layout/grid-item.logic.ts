import { cssPrefix, cssProperty } from "../../utils";
import type { GridItemOption } from "./grid-item.type";

export const getGridItemAttrs = (options: GridItemOption[]) => ({
  class: [cssPrefix("grid-item")],
  style: options.map((option) => ({
    [cssProperty(["row", option?.breakpoint || ""])]: option.row,
    [cssProperty(["column", option?.breakpoint || ""])]: option.column,
    [cssProperty(["justify", option?.breakpoint || ""])]: option.justify,
    [cssProperty(["align", option?.breakpoint || ""])]: option.align,
  })),
});
