import type { RouteStack } from "@/core";

/** Deep-clone the nested route stack tree (each level has its own `stack` branch). */
export const clone = (value: RouteStack[]): RouteStack[] => {
  return value.map((item: RouteStack) => ({
    ...item,
    stack: clone(item.stack),
  })) as RouteStack[];
};
