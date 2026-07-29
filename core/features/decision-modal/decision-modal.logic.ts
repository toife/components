import { cssPrefix } from "../../utils";
import { DecisionModalAttrOptions, DecisionModalFooterAttrOptions } from "./decision-modal.type";

export const getDecisionModalAttrs = (options: DecisionModalAttrOptions) => ({
  class: [
    cssPrefix(["layer", "modal"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("decision-modal"),
    { pop: options.pop, divider: options.divider },
  ],
});

export const getDecisionModalHeaderAttrs = () => ({
  class: [cssPrefix("decision-modal-header")],
});

export const getDecisionModalBodyAttrs = () => ({
  class: [cssPrefix("decision-modal-body")],
});

export const getDecisionModalFooterAttrs = (options: DecisionModalFooterAttrOptions) => ({
  class: [cssPrefix("decision-modal-footer"), `actions-flow-${options.flow}`],
});
