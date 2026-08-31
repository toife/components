import { ButtonAttrOptions } from './button.type';
export declare const getButtonAttrs: (options: ButtonAttrOptions) => {
    class: (string | {
        block: boolean;
        focus: boolean;
    })[];
};
export declare const getButtonLoaderAttrs: () => {
    class: string[];
};
