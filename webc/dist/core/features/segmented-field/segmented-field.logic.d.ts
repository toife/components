import { SegmentedFieldAttrOptions } from './segmented-field.type';
export declare const getSegmentedFieldWrapperAttrs: (options: SegmentedFieldAttrOptions) => {
    class: (string | {
        disabled: boolean;
    })[];
};
export declare const getSegmentedFieldContentAttrs: () => {
    class: string[];
};
export declare const getSegmentedFieldMessageAttrs: () => {
    class: string[];
};
