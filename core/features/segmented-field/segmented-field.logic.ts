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

/** One cell. Uses the field layer so the box follows the same role colors as a text field. */
export const getSegmentedFieldInputAttrs = (options: SegmentedFieldAttrOptions) => ({
  class: [
    cssPrefix(["layer", "field"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("segmented-field-input"),
  ],
});
