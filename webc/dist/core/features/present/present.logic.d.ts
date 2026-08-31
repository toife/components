import { PresentAttrOptions, PresentBackdropAttrOptions } from './present.type';
export declare const getAppClassSelector: () => string;
export declare const getPresentBackdropAttrs: (options: PresentBackdropAttrOptions) => {
    class: string[];
    style: {
        [x: string]: string | number | undefined;
        zIndex: number;
    };
};
export declare const getPresentAttrs: (options: PresentAttrOptions) => {
    class: unknown[];
    style: unknown[];
};
