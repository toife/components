export type FieldVariant = "outline" | "fill" | "underline";
export type FieldSize = string;

/**
 * Chrome around an input: message and help sit outside the box.
 * The box itself lives on text-field, tag-field, or segmented-field.
 */
export type FieldProps = {
  message?: string;
  help?: string;
};

/** Attributes from a control that uses this wrapper, merged onto the field root. */
export type FieldAttrOptions = {
  class?: unknown;
  style?: unknown;
  [key: string]: unknown;
};
