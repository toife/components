import { cssPrefix } from "../../utils";
import { AppAttrOptions } from "./app.type";

export const getAppAttrs = (options: AppAttrOptions) => ({
  class: [
    cssPrefix("app"),
    cssPrefix(["layer", "app"]),
    cssPrefix(["shape", options.shape]),
  ],
});
