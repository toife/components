import { cssPrefix } from "../../utils";
import { CableAttrOptions } from "./cable.type";

export const getCableAttrs = (options: CableAttrOptions) => ({
  class: [cssPrefix(["layer", "cable"]), cssPrefix("cable"), options.placement],
});
