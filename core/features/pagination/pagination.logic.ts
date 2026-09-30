import { cssPrefix } from "../../utils";
import type {
  PaginationAttrOptions,
  PaginationItem,
  PaginationItemAttrOptions,
  PaginationItemsOptions,
} from "./pagination.type";

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

/**
 * Clamp a page into [1, length]
 */
export const clampPaginationPage = (page: number, length: number) => {
  const max = Math.max(1, Math.floor(length));
  return Math.min(Math.max(1, Math.floor(page) || 1), max);
};

/**
 * Build the visible page list, e.g. [1, …, 4, 5, 6, …, 10]
 */
export const getPaginationItems = (options: PaginationItemsOptions): PaginationItem[] => {
  const length = Math.max(1, Math.floor(options.length));
  const siblings = Math.max(0, Math.floor(options.siblings));
  const boundaries = Math.max(0, Math.floor(options.boundaries));
  const current = clampPaginationPage(options.current, length);

  const toPages = (pages: number[]): PaginationItem[] =>
    pages.map((page) => ({ type: "page", page }));

  // boundaries + siblings + current + 2 ellipsis slots
  const totalSlots = boundaries * 2 + siblings * 2 + 3;
  if (length <= totalSlots) return toPages(range(1, length));

  const startPages = range(1, boundaries);
  const endPages = range(length - boundaries + 1, length);

  const siblingsStart = Math.max(
    Math.min(current - siblings, length - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundaries + siblings * 2 + 2),
    length - boundaries - 1,
  );

  const items: PaginationItem[] = [...toPages(startPages)];

  if (siblingsStart > boundaries + 2) {
    items.push({ type: "ellipsis", key: "start" });
  } else {
    items.push({ type: "page", page: boundaries + 1 });
  }

  items.push(...toPages(range(siblingsStart, siblingsEnd)));

  if (siblingsEnd < length - boundaries - 1) {
    items.push({ type: "ellipsis", key: "end" });
  } else {
    items.push({ type: "page", page: length - boundaries });
  }

  items.push(...toPages(endPages));

  return items;
};

export const getPaginationAttrs = (options: PaginationAttrOptions) => ({
  class: [
    cssPrefix("pagination"),
    cssPrefix(["direction", options.direction]),
    cssPrefix(["size", options.size]),
    { disabled: options.disabled },
  ],
});

export const getPaginationItemAttrs = (options: PaginationItemAttrOptions) => ({
  class: [cssPrefix("pagination-item"), { active: options.active }],
});

export const getPaginationEllipsisAttrs = () => ({
  class: [cssPrefix("pagination-ellipsis")],
});
