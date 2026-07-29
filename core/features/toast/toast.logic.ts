import { cssPrefix } from "../../utils";
import { ToastAttrOptions } from "./toast.type";

export const getToastAttrs = (options: ToastAttrOptions) => ({
  class: [cssPrefix("toast"), options.placement],
});
