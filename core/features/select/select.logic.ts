import { cssPrefix } from "../../utils";
import { SelectAttrOptions } from "./select.type";

export const getSelectAttrs = (options: SelectAttrOptions) => ({
  class: [
    cssPrefix(["layer", "select"]),
    cssPrefix(["role", options.role]),
    cssPrefix("select"),
    cssPrefix(["direction", options.direction]),
    cssPrefix(["size", options.size]),
    { disabled: options.disabled },
  ],
});

export const getSelectIconAttrs = () => ({ class: [cssPrefix("select-icon")] });
export const getSelectOptionAttrs = () => ({ class: [cssPrefix("select-option")] });
export const getSelectMessageAttrs = () => ({ class: [cssPrefix("select-message")] });
