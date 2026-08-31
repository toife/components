import { RadioAttrOptions } from './radio.type';
export declare const getRadioAttrs: (options: RadioAttrOptions) => {
    class: (string | {
        on: boolean;
        disabled: boolean;
        readonly: boolean;
        focus: boolean;
    })[];
};
export declare const getRadioIconAttrs: () => {
    class: string[];
};
