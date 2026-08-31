import { CheckboxAttrOptions } from './checkbox.type';
export declare const getCheckboxAttrs: (options: CheckboxAttrOptions) => {
    class: (string | {
        on: boolean;
        disabled: boolean;
        readonly: boolean;
        focus: boolean;
    })[];
};
export declare const getCheckboxIconAttrs: () => {
    class: string[];
};
