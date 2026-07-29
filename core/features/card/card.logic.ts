import { cssPrefix } from "../../utils";
import { CardAttrOptions } from "./card.type";

export const getCardAttrs = (options: CardAttrOptions) => ({
  class: [
    cssPrefix(["layer", "card"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("card"),
    { divider: options.divider },
  ],
});
