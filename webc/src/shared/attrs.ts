import { classMap, type ClassInfo } from "lit/directives/class-map.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { DirectiveResult } from "lit/directive.js";

type AttrClass =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | AttrClass[];

export type CoreAttrs = {
  class?: AttrClass;
  style?:
    | string
    | Record<string, string | number | undefined | null>
    | Record<string, string | number | undefined | null>[];
  [key: string]: unknown;
};

/**
 * Flatten Vue-style class arrays / objects into a Lit `classMap` input.
 */
export function resolveClassInfo(input: AttrClass | undefined): ClassInfo {
  const result: ClassInfo = {};

  const walk = (value: AttrClass) => {
    if (!value && value !== 0) return;
    if (typeof value === "string" || typeof value === "number") {
      const name = String(value).trim();
      if (name) result[name] = true;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const [key, on] of Object.entries(value)) {
        if (on) result[key] = true;
      }
    }
  };

  walk(input);
  return result;
}

export function resolveClass(input: AttrClass | undefined): DirectiveResult {
  return classMap(resolveClassInfo(input));
}

export function resolveStyle(
  input: string | Record<string, string | number | undefined | null> | undefined,
): string | DirectiveResult {
  if (!input) return "";
  if (typeof input === "string") return input;
  const info: StyleInfo = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    info[key] = String(value);
  }
  return styleMap(info);
}

/** Read `class` from a core `get*Attrs()` result for Lit templates. */
export function attrsClass(attrs: CoreAttrs | undefined): DirectiveResult {
  return resolveClass(attrs?.class);
}

/** Read `style` from a core `get*Attrs()` result for Lit templates. */
export function attrsStyle(attrs: CoreAttrs | undefined): string | DirectiveResult {
  const style = attrs?.style;
  if (!style) return "";
  if (typeof style === "string") return style;
  if (Array.isArray(style)) {
    const info: StyleInfo = {};
    for (const part of style) {
      if (!part || typeof part !== "object") continue;
      for (const [key, value] of Object.entries(part)) {
        if (value === undefined || value === null) continue;
        info[key] = String(value);
      }
    }
    return styleMap(info);
  }
  return resolveStyle(style);
}
