export type RouteStack = {
  name: string;
  component: unknown;
  stack: RouteStack[];
  /** Unique identity: leaf pages use `fullPath`, layouts use route `name`. */
  key: string;
  /** Location `fullPath` when this entry was last activated. */
  fullPath: string;
};

/** Leaf pages are unique by full URL; layout segments stay unique by route name. */
export const getRouteStackKey = (name: string, isLeaf: boolean, fullPath: string): string =>
  isLeaf && fullPath ? fullPath : name;
