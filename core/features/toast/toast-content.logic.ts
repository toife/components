import { cssPrefix } from "../../utils";
import { ToastContentAttrOptions } from "./toast.type";

export const getToastContentAttrs = (options: ToastContentAttrOptions) => ({
  class: [
    cssPrefix(["layer", "toast"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("toast-content"),
    { closing: options.closing },
  ],
});
