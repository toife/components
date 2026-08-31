import { SwitchAttrOptions, SwitchWrapperAttrOptions } from './switch.type';
export declare const getSwitchWrapperAttrs: (options: SwitchWrapperAttrOptions) => {
    class: (string | {
        disabled: boolean;
        readonly: boolean;
        focus: boolean;
        on: boolean;
        transition?: undefined;
    } | {
        transition: boolean;
        disabled?: undefined;
        readonly?: undefined;
        focus?: undefined;
        on?: undefined;
    })[];
    style: {
        [x: string]: string | number;
    };
};
export declare const getSwitchAttrs: (options: SwitchAttrOptions) => {
    class: string[];
};
export declare const getSwitchIconAttrs: () => {
    class: string[];
};
