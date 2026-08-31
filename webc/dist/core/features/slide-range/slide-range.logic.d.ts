import { SlideRangeAttrOptions, SlideRangeTrackFrontAttrOptions, SlideRangeThumbAttrOptions, SlideRangeTickAttrOptions } from './slide-range.type';
export declare const getSlideRangeAttrs: (options: SlideRangeAttrOptions) => {
    class: (string | {
        disabled: boolean;
        readonly: boolean;
    })[];
};
export declare const getSlideRangeTrackContainerAttrs: () => {
    class: string[];
};
export declare const getSlideRangeTrackBodyAttrs: () => {
    class: string[];
};
export declare const getSlideRangeTrackBackAttrs: () => {
    class: string[];
};
export declare const getSlideRangeTrackFrontAttrs: (options: SlideRangeTrackFrontAttrOptions) => {
    class: string[];
    style: {
        [x: string]: string;
    };
};
export declare const getSlideRangeThumbAttrs: (options: SlideRangeThumbAttrOptions) => {
    class: string[];
    style: {
        [x: string]: string;
    };
};
export declare const getSlideRangeThumbInnerAttrs: () => {
    class: string[];
};
export declare const getSlideRangeTooltipAttrs: () => {
    class: string[];
};
export declare const getSlideRangeTickAttrs: (options: SlideRangeTickAttrOptions) => {
    class: (string | {
        active: boolean;
    })[];
    style: {
        [x: string]: string;
    };
};
