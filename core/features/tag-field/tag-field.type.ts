import type { AppDirection } from "../app/app.type";

export type TagFieldVariant = "outline" | "fill" | "underline";
export type TagFieldSize = string;

// Type definitions
export type TagFieldProps = {
  // Value
  modelValue?: string[];

  // Wrapper
  name?: string;
  variant?: TagFieldVariant;
  role?: string;
  shape?: string;
  size?: TagFieldSize;
  direction?: AppDirection;

  // Input
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  maxLength?: number | string;
  tabindex?: number | string;

  // Support
  message?: string;

  // Behavior
  /** Maximum number of tags; once reached the text input is hidden. */
  max?: number | string;
  /** `KeyboardEvent.key` values (and pasted characters) that turn the text into a tag. */
  separators?: string[];
  /** Allow the same tag twice. Comparison ignores case. */
  allowDuplicates?: boolean;
  /** Turn the text left in the input into a tag when it loses focus. */
  addOnBlur?: boolean;
  /** Tags offered under the field; picking one adds it. */
  suggestions?: string[];
};

export type TagFieldEvent = {
  (e: "update:modelValue", value: string[]): void;
  /** A tag was added by the user. */
  (e: "add", tag: string): void;
  /** A tag was removed by the user. */
  (e: "remove", tag: string): void;
  /** The text being typed changed (use it to load `suggestions`). */
  (e: "input", text: string): void;
  (e: "focus", ev: FocusEvent): void;
  (e: "blur", ev: FocusEvent): void;
};

export type TagFieldAttrOptions = {
  role: string;
  shape: string;
  size: string;
  direction: string;
  variant: TagFieldVariant;
  disabled: boolean;
  focus: boolean;
  readonly: boolean;
  full: boolean;
};
