import { cssPrefix } from "../../utils";
import { FormGroupAttrOptions } from "./form-group.type";

export const getFormGroupAttrs = (options: FormGroupAttrOptions) => ({
  class: [cssPrefix("form-group"), options.direction],
});
