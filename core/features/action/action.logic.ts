import { cssPrefix } from "../../utils";
import { ActionAttrOptions } from "./action.type";

export const getActionAttrs = (options: ActionAttrOptions) => {
  return {
    class: [
      cssPrefix("action"),
      cssPrefix(["layer", "action"]),
      cssPrefix(["role", options.role]),
      cssPrefix(["shape", options.shape]),
      options.placement,
      {
        pop: options.pop,
        divider: options.divider,
        shadow: options.shadow,
      },
    ],
  };
};
