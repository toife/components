import { ClassInfo } from 'lit/directives/class-map.js';
import { DirectiveResult } from 'lit/directive.js';
type AttrClass = string | number | null | undefined | false | Record<string, boolean | null | undefined> | AttrClass[];
export type CoreAttrs = {
    class?: AttrClass;
    style?: string | Record<string, string | number | undefined | null> | Record<string, string | number | undefined | null>[];
    [key: string]: unknown;
};
/**
 * Flatten Vue-style class arrays / objects into a Lit `classMap` input.
 */
export declare function resolveClassInfo(input: AttrClass | undefined): ClassInfo;
export declare function resolveClass(input: AttrClass | undefined): DirectiveResult;
export declare function resolveStyle(input: string | Record<string, string | number | undefined | null> | undefined): string | DirectiveResult;
/** Read `class` from a core `get*Attrs()` result for Lit templates. */
export declare function attrsClass(attrs: CoreAttrs | undefined): DirectiveResult;
/** Read `style` from a core `get*Attrs()` result for Lit templates. */
export declare function attrsStyle(attrs: CoreAttrs | undefined): string | DirectiveResult;
export {};
