let prefix: string | null = null;
let separator: string | null = null;

/**
 * Get the separator from the document element
 */
export const getCssSeparator = () => {
  if (!separator)
    separator = getComputedStyle(document.documentElement).getPropertyValue("--separator").trim();

  return separator;
};

/**
 * Get the prefix from the document element
 */
export const getCssPrefix = () => {
  if (!prefix)
    prefix = getComputedStyle(document.documentElement).getPropertyValue("--prefix").trim();

  return prefix;
};

/**
 * Generate the prefixed name
 */
export const cssPrefix = (name: string | string[]) => {
  const p = getCssPrefix();
  const s = getCssSeparator();
  let names = [];

  if (typeof name === "string") {
    names = [name];
  } else {
    names = [...name];
  }

  if (p) {
    names = [p, ...names];
  }

  return names.filter((item) => item !== undefined && item !== null && item !== "").join(s);
};

/**
 * Generate the property name
 */
export const cssProperty = (name: string | string[]) => {
  return `--${cssPrefix(name)}`;
};

/**
 * Generate the name with var() syntax
 */
export const cssVariable = (name: string | string[]) => {
  return `var(${cssProperty(name)})`;
};
