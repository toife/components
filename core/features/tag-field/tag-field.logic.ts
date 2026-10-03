import { cssPrefix } from "../../utils";
import { TagFieldAttrOptions } from "./tag-field.type";

export const getTagFieldAttrs = (options: TagFieldAttrOptions) => ({
  class: [
    cssPrefix(["layer", "tag-field"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("tag-field"),
    cssPrefix(["size", options.size]),
    cssPrefix(["direction", options.direction]),
    {
      disabled: options.disabled,
      focus: options.focus,
      readonly: options.readonly,
      full: options.full,
    },
  ],
});

export const getTagFieldContentAttrs = () => ({ class: [cssPrefix("tag-field-content")] });
export const getTagFieldChipAttrs = () => ({ class: [cssPrefix("tag-field-chip")] });
export const getTagFieldTextAttrs = () => ({ class: [cssPrefix("tag-field-text")] });
export const getTagFieldRemoveAttrs = () => ({ class: [cssPrefix("tag-field-remove")] });
export const getTagFieldInputAttrs = () => ({ class: [cssPrefix("tag-field-input")] });
export const getTagFieldMessageAttrs = () => ({ class: [cssPrefix("tag-field-message")] });
export const getTagFieldSuggestionsAttrs = () => ({ class: [cssPrefix("tag-field-suggestions")] });
export const getTagFieldSuggestionAttrs = () => ({ class: [cssPrefix("tag-field-suggestion")] });

/**
 * Clean the text of one tag: trimmed, inner whitespace collapsed.
 */
export const normalizeTagText = (text: string): string => text.trim().replace(/\s+/g, " ");

/**
 * Split pasted text into tags at every separator that is a single character
 * (`Enter` counts as a line break) and drop the empty ones.
 */
export const splitTagText = (text: string, separators: string[]): string[] => {
  const characters = separators.flatMap((separator) =>
    separator === "Enter" ? ["\n", "\r"] : separator.length === 1 ? [separator] : [],
  );
  const escaped = characters.map((character) => character.replace(/[\\^$.*+?()[\]{}|/-]/g, "\\$&"));
  const parts = escaped.length ? text.split(new RegExp(`[${escaped.join("")}]`)) : [text];

  return parts.map(normalizeTagText).filter(Boolean);
};

/**
 * Whether a tag is already in the list (case-insensitive).
 */
export const hasTag = (tags: string[], tag: string): boolean => {
  const key = tag.toLowerCase();

  return tags.some((item) => item.toLowerCase() === key);
};
