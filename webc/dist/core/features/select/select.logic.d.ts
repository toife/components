import { SelectAttrOptions } from './select.type';
export declare const getSelectAttrs: (options: SelectAttrOptions) => {
    class: (string | {
        disabled: boolean;
    })[];
};
export declare const getSelectIconAttrs: () => {
    class: string[];
};
export declare const getSelectOptionAttrs: () => {
    class: string[];
};
export declare const getSelectMessageAttrs: () => {
    class: string[];
};
