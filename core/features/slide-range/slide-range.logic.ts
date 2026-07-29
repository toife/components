import { cssPrefix, cssProperty } from "../../utils";
import {
  SlideRangeAttrOptions,
  SlideRangeTrackFrontAttrOptions,
  SlideRangeThumbAttrOptions,
  SlideRangeTickAttrOptions,
} from "./slide-range.type";

export const getSlideRangeAttrs = (options: SlideRangeAttrOptions) => ({
  class: [
    cssPrefix("slide-range"),
    cssPrefix(["layer", "slide-range"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    { disabled: options.disabled, readonly: options.readonly },
  ],
});

export const getSlideRangeTrackContainerAttrs = () => ({
  class: [cssPrefix("slide-range-track-container")],
});

export const getSlideRangeTrackBodyAttrs = () => ({
  class: [cssPrefix("slide-range-track-body")],
});

export const getSlideRangeTrackBackAttrs = () => ({
  class: [cssPrefix("slide-range-track"), "back"],
});

export const getSlideRangeTrackFrontAttrs = (options: SlideRangeTrackFrontAttrOptions) => ({
  class: [cssPrefix("slide-range-track"), "front"],
  style: { [cssProperty("percent")]: `${options.percent}%` },
});

export const getSlideRangeThumbAttrs = (options: SlideRangeThumbAttrOptions) => ({
  class: [cssPrefix("slide-range-thumb")],
  style: { [cssProperty("percent")]: `${options.percent}%` },
});

export const getSlideRangeThumbInnerAttrs = () => ({
  class: [cssPrefix("slide-range-thumb-inner")],
});

export const getSlideRangeTooltipAttrs = () => ({
  class: [cssPrefix("slide-range-tooltip")],
});

export const getSlideRangeTickAttrs = (options: SlideRangeTickAttrOptions) => ({
  class: [cssPrefix("slide-range-tick"), { active: options.active }],
  style: { [cssProperty("left")]: `${options.percent}%` },
});
