import { cssPrefix } from "../../utils";
import { CheckboxAttrOptions } from "./checkbox.type";

export const getCheckboxAttrs = (options: CheckboxAttrOptions) => ({
  class: [
    cssPrefix(["layer", "checkbox"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("checkbox"),
    {
      on: options.modelValue,
      disabled: options.disabled,
      readonly: options.readonly,
      focus: options.focus,
    },
  ],
});

export const getCheckboxIconAttrs = () => ({
  class: [cssPrefix("checkbox-icon")],
});
