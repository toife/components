import { cssPrefix, cssProperty } from "../../utils";
import { SwitchAttrOptions, SwitchWrapperAttrOptions } from "./switch.type";

export const getSwitchWrapperAttrs = (options: SwitchWrapperAttrOptions) => ({
  class: [
    cssPrefix("switch-wrapper"),
    {
      disabled: options.disabled,
      readonly: options.readonly,
      shadow: options.shadow,
      focus: options.focus,
      on: options.modelValue,
    },
    { transition: options.transition },
  ],
  style: { [cssProperty(["bounce", "ratio"])]: options.bounce },
});

export const getSwitchAttrs = (options: SwitchAttrOptions) => ({
  class: [
    cssPrefix(["layer", "switch"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("switch"),
  ],
});

export const getSwitchIconAttrs = () => ({ class: [cssPrefix("switch-icon")] });
