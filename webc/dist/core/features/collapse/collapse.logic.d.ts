import { CollapseAttrOptions, CollapseContentAttrOptions, CollapseTriggerAttrOptions } from './collapse.type';
export declare const getCollapseAttrs: (options: CollapseAttrOptions) => {
    class: (string | {
        open: boolean;
        disabled: boolean;
    })[];
};
export declare const getCollapseTriggerAttrs: (options: CollapseTriggerAttrOptions) => {
    class: string[];
    "aria-expanded": boolean;
    "aria-disabled": boolean;
};
export declare const getCollapseContentAttrs: (options: CollapseContentAttrOptions) => {
    class: (string | {
        transition: boolean;
    })[];
    style: {
        [x: string]: string | undefined;
    };
};
export declare const getCollapseContentInnerClass: () => string;
