import { cssPrefix, cssProperty } from "../../utils";
import { FieldAttrOptions } from "./field.type";

export const getFieldAttrs = (options: FieldAttrOptions) => ({
  class: [
    cssPrefix(["layer", "field"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("field"),
    cssPrefix(["size", options.size]),
    cssPrefix(["direction", options.direction]),
    options.type,
    {
      disabled: options.disabled,
      focus: options.focus,
      shadow: options.shadow,
      readonly: options.readonly,
    },
  ],
  style: {
    [cssProperty("line")]: options.line,
    [cssProperty("max-line")]: options.maxLine || options.line,
  },
});

export const getFieldContentAttrs = () => ({ class: [cssPrefix("field-content")] });
export const getFieldInputAttrs = () => ({ class: [cssPrefix("field-input")] });
export const getFieldMessageAttrs = () => ({ class: [cssPrefix("field-message")] });
