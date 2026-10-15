import { cssPrefix } from "../../utils";
import { CalloutAttrOptions } from "./callout.type";

export const getCalloutAttrs = (options: CalloutAttrOptions) => ({
  class: [
    cssPrefix(["layer", "callout"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("callout"),
    cssPrefix(["callout", options.variant]),
    cssPrefix(["size", options.size]),
    cssPrefix(["direction", options.direction]),
  ],
});

export const getCalloutBodyAttrs = () => ({
  class: [cssPrefix(["callout", "body"])],
});

export const getCalloutCloseAttrs = () => ({
  class: [cssPrefix(["callout", "close"])],
});
