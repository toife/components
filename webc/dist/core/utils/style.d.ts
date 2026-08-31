/**
 * Get the separator from the document element
 */
export declare const getCssSeparator: () => string;
/**
 * Get the prefix from the document element
 */
export declare const getCssPrefix: () => string;
/**
 * Generate the prefixed name
 */
export declare const cssPrefix: (name: string | string[]) => string;
/**
 * Generate the property name
 */
export declare const cssProperty: (name: string | string[]) => string;
/**
 * Generate the name with var() syntax
 */
export declare const cssVariable: (name: string | string[]) => string;
