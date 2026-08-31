import { DropdownAttrOptions, DropdownPanelAttrOptions } from './dropdown.type';
export declare const getDropdownAttrs: (options: DropdownAttrOptions) => {
    class: (string | {
        open: boolean;
        disabled: boolean;
    })[];
};
export declare const getDropdownPanelAttrs: (options: DropdownPanelAttrOptions) => {
    class: string[];
};
