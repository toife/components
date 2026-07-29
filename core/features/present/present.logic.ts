import { cssPrefix, cssProperty } from "../../utils";
import {
  PresentAttrOptions,
  PresentBackdropAttrOptions,
} from "./present.type";

export const getAppClassSelector = () => "." + cssPrefix("app");

export const getPresentBackdropAttrs = (options: PresentBackdropAttrOptions) => ({
  class: [cssPrefix(["layer", "backdrop"]), cssPrefix("present-backdrop")],
  style: {
    zIndex: options.zIndex,
    [cssProperty("transition-duration")]: options.backdropTransitionDuration,
    [cssProperty("opacity")]: options.backdropOpacity,
  },
});

export const getPresentAttrs = (options: PresentAttrOptions) => ({
  class: [cssPrefix("present"), options.className, options.placement],
  style: [
    {
      zIndex: options.zIndex,
      [cssProperty("transition-duration")]: options.presentTransitionDuration,
      [cssProperty("translate")]: options.presentTranslate,
      [cssProperty("opacity")]: options.presentOpacity,
    },
    options.style,
  ],
});
