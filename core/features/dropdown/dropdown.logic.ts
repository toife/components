import { cssPrefix } from "../../utils";
import { DropdownAttrOptions, DropdownPanelAttrOptions } from "./dropdown.type";

export const getDropdownAttrs = (options: DropdownAttrOptions) => ({
  class: [
    cssPrefix(["layer", "dropdown"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("dropdown"),
    { open: options.open, disabled: options.disabled, shadow: options.shadow },
  ],
});

export const getDropdownPanelAttrs = (options: DropdownPanelAttrOptions) => ({
  class: [cssPrefix("dropdown-panel"), options.placement],
});
