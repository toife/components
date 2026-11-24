export type FieldVariant = "outline" | "fill" | "underline";
export type FieldSize = string;

/**
 * Chrome around an input: message and hint sit outside the box.
 * The box itself lives on text-field, tag-field, or segmented-field.
 */
export type FieldProps = {
  message?: string;
  hint?: string;
};
