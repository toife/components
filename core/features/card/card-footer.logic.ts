import { cssPrefix } from "../../utils";
import { CardFooterAttrOptions } from "./card.type";

export const getCardFooterAttrs = (options: CardFooterAttrOptions) => ({
  class: [cssPrefix("card-footer"), { divider: options.divider }],
});
