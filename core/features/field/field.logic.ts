import { cssPrefix } from "../../utils";
import { FieldAttrOptions } from "./field.type";

/**
 * Root attributes. This wrapper always owns `t-layer-field`.
 * Class, style, and the caller's own layer (for example `t-layer-select`) are merged in.
 */
export const getFieldAttrs = (options: FieldAttrOptions = {}) => {
  const { class: className, style, ...rest } = options;

  return {
    ...rest,
    class: [cssPrefix(["layer", "field"]), cssPrefix("field"), className],
    style,
  };
};

export const getFieldMessageAttrs = () => ({
  class: [cssPrefix("field-message")],
});

export const getFieldHelpAttrs = () => ({
  class: [cssPrefix("field-help")],
});
