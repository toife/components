import { ScrollbarAttrOptions, ScrollbarAxis, ScrollbarAxisGeometry, ScrollbarDirection, ScrollbarGeometryOptions, ScrollbarMetrics, ScrollbarThumbAttrOptions, ScrollbarTrackAttrOptions } from './scrollbar.type';
export declare const getScrollbarAttrs: (options: ScrollbarAttrOptions) => {
    class: (string | {
        visible: boolean;
        dragging: boolean;
    })[];
    style: {
        [x: string]: string;
    };
};
export declare const getScrollbarContentAttrs: () => {
    class: string[];
};
export declare const getScrollbarTrackAttrs: (options: ScrollbarTrackAttrOptions) => {
    class: (string | {
        [x: string]: boolean;
    })[];
    style: {
        [x: string]: string;
    };
};
export declare const getScrollbarThumbAttrs: (options: ScrollbarThumbAttrOptions) => {
    class: string[];
    style: {
        [x: string]: string;
    };
};
/** Hit-testing a press against the thumb needs the class as a selector. */
export declare const getScrollbarThumbSelector: () => string;
/** Read the scrollport in one go — every number the geometry needs. */
export declare const getScrollbarMetrics: (element: Element) => ScrollbarMetrics;
/** Is this axis both allowed by `direction` and actually overflowing? */
export declare const hasScrollbarAxis: (axis: ScrollbarAxis, direction: ScrollbarDirection, metrics: ScrollbarMetrics) => boolean;
/**
 * Everything the track and thumb need for one axis. The thumb is the visible
 * share of the content, floored at `minThumb` so long documents keep a grabbable
 * handle.
 */
export declare const getScrollbarGeometry: (axis: ScrollbarAxis, metrics: ScrollbarMetrics, options: ScrollbarGeometryOptions) => ScrollbarAxisGeometry;
/**
 * Scroll offset that centers the thumb on `point`, measured in px from the start
 * of the track — what a click on the empty part of the track jumps to.
 */
export declare const getScrollbarScrollFromPoint: (geometry: ScrollbarAxisGeometry, point: number) => number;
/**
 * Scroll offset for a drag that has moved `delta` px since it grabbed the thumb
 * at `origin`. One px of thumb travel is `maxScroll / travel` px of content.
 */
export declare const getScrollbarScrollFromDelta: (geometry: ScrollbarAxisGeometry, origin: number, delta: number) => number;
/** Wheel deltas arrive in px, lines or pages depending on the device. */
export declare const getScrollbarWheelScale: (deltaMode: number, page: number) => number;
