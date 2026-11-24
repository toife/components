import { cssPrefix } from "../../utils";

export const getFieldAttrs = () => ({
  class: [cssPrefix("field")],
});

export const getFieldMessageAttrs = () => ({
  class: [cssPrefix("field-message")],
});

export const getFieldHintAttrs = () => ({
  class: [cssPrefix("field-hint")],
});
