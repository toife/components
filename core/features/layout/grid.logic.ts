import { cssPrefix, cssProperty } from "../../utils";
import type { GridOption } from "./grid.type";

export const getGridAttrs = (options: GridOption[]) => ({
  class: [cssPrefix("grid")],
  style: options.map((option) => ({
    [cssProperty(["gap", option?.breakpoint || ""])]:
      typeof option.gap === "number" ? `${option.gap}px` : option.gap,
    [cssProperty(["columns", option?.breakpoint || ""])]: option.columns,
    [cssProperty(["rows", option?.breakpoint || ""])]: option.rows,
    [cssProperty(["auto-flow", option?.breakpoint || ""])]: option.autoFlow,
  })),
});
