import { cssPrefix, cssProperty } from "../../utils";
import { TextFieldAttrOptions } from "./text-field.type";

export const getTextFieldAttrs = (options: TextFieldAttrOptions) => ({
  class: [
    cssPrefix(["layer", "field"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("text-field"),
    cssPrefix(["size", options.size]),
    cssPrefix(["direction", options.direction]),
    options.type,
    {
      disabled: options.disabled,
      focus: options.focus,
      readonly: options.readonly,
    },
  ],
  style: {
    [cssProperty("line")]: options.line,
    [cssProperty("max-line")]: options.maxLine || options.line,
  },
});

export const getTextFieldContentAttrs = () => ({ class: [cssPrefix("text-field-content")] });
export const getTextFieldInputAttrs = () => ({ class: [cssPrefix("text-field-input")] });
