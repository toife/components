import { DecisionModalAttrOptions, DecisionModalFooterAttrOptions } from './decision-modal.type';
export declare const getDecisionModalAttrs: (options: DecisionModalAttrOptions) => {
    class: (string | {
        pop: boolean;
        divider: boolean;
    })[];
};
export declare const getDecisionModalHeaderAttrs: () => {
    class: string[];
};
export declare const getDecisionModalBodyAttrs: () => {
    class: string[];
};
export declare const getDecisionModalFooterAttrs: (options: DecisionModalFooterAttrOptions) => {
    class: string[];
};
