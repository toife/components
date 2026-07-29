import { cssPrefix } from "../../utils";
import { RadioAttrOptions } from "./radio.type";

export const getRadioAttrs = (options: RadioAttrOptions) => ({
  class: [
    cssPrefix(["layer", "radio"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("radio"),
    {
      on: options.checked,
      disabled: options.disabled,
      readonly: options.readonly,
      shadow: options.shadow,
      focus: options.focus,
    },
  ],
});

export const getRadioIconAttrs = () => ({
  class: [cssPrefix("radio-icon")],
});
