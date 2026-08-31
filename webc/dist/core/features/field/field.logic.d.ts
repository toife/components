import { FieldAttrOptions } from './field.type';
export declare const getFieldAttrs: (options: FieldAttrOptions) => {
    class: (string | {
        disabled: boolean;
        focus: boolean;
        readonly: boolean;
    })[];
    style: {
        [x: string]: number;
    };
};
export declare const getFieldContentAttrs: () => {
    class: string[];
};
export declare const getFieldInputAttrs: () => {
    class: string[];
};
export declare const getFieldMessageAttrs: () => {
    class: string[];
};
