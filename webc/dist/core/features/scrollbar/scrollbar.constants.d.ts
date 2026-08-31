/**
 * Scrollbar Default Props
 */
export declare const SCROLLBAR_DEFAULT_PROPS: {
    readonly direction: "vertical";
    readonly size: 10;
    readonly thumbSize: 6;
    readonly minThumb: 24;
    readonly autoHide: true;
    readonly hideDelay: 500;
    readonly role: "";
};
/** Overflow of 1px or less is rounding noise, not something worth a scrollbar. */
export declare const SCROLLBAR_OVERFLOW_EPSILON = 1;
/** `WheelEvent.deltaMode: 1` is lines; browsers expose no size for one. */
export declare const SCROLLBAR_WHEEL_LINE = 16;
/** A `click` this soon after a drag is that drag's release, not a new click. */
export declare const SCROLLBAR_CLICK_AFTER_DRAG = 200;
