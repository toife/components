import { cssPrefix } from "../../utils";
import { RadioGroupAttrOptions } from "./radio-group.type";

export const getRadioGroupAttrs = (options: RadioGroupAttrOptions) => ({
  class: [cssPrefix("radio-group"), options.direction],
});
