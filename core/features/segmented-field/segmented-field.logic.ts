import { cssPrefix } from "../../utils";
import { SegmentedFieldAttrOptions } from "./segmented-field.type";

export const getSegmentedFieldWrapperAttrs = (options: SegmentedFieldAttrOptions) => ({
  class: [
    cssPrefix("segmented-field-wrapper"),
    cssPrefix(["layer", "segmented-field"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["direction", options.direction]),
    options.size,
    { disabled: options.disabled },
  ],
});

export const getSegmentedFieldContentAttrs = () => ({
  class: [cssPrefix("segmented-field-content")],
});

export const getSegmentedFieldMessageAttrs = () => ({
  class: [cssPrefix("segmented-field-message")],
});
