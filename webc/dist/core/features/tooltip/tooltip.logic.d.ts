import { TooltipAttrOptions, TooltipContentAttrOptions } from './tooltip.type';
export declare const getTooltipAttrs: (options: TooltipAttrOptions) => {
    class: (string | {
        disabled: boolean;
    })[];
};
export declare const getTooltipContentAttrs: (options: TooltipContentAttrOptions) => {
    class: string[];
};
export declare const getTooltipTriggerAttrs: () => {
    class: string[];
};
