import { cssPrefix } from "../../utils";
import { CardHeaderAttrOptions } from "./card.type";

export const getCardHeaderAttrs = (options: CardHeaderAttrOptions) => ({
  class: [cssPrefix("card-header"), { divider: options.divider }],
});
