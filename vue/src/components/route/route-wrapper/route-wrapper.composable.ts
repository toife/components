import { shallowRef } from "vue";
import { type RouteComponent, type RouteLocationMatched } from "vue-router";
import type { RouteStack } from "@/core";

const stack = shallowRef<RouteStack[]>([]);

/** Recursively builds a nested stack from vue-router `matched` for the navigator. */
const buildTree = (matched: RouteLocationMatched[], current: RouteStack[]) => {
  // No deeper matched routes — drop stale leaf entries (e.g. parent navigated back).
  if (matched.length === 0) return [];

  // User navigated back: drop the leaf so we merge into the parent segment
  if (current.length > 1 && current[current.length - 2]?.name === matched[0].name) {
    current.pop();
  }

  // Same route record: update nested stack only
  if (
    current.length > 0 &&
    current[current.length - 1] &&
    current[current.length - 1].name === matched[0].name
  ) {
    matched.shift();
    current[current.length - 1].stack = buildTree(matched, current[current.length - 1].stack);
  }
  // Push a new segment (forward navigation)
  else {
    const name = String(matched[0].name);
    const component = matched[0].components as RouteComponent;
    matched.shift();
    current.push({
      name,
      component,
      stack: buildTree(matched, []),
    });
  }

  return current;
};

export const useRouteWrapper = () => {
  const updateRoutes = (matched: RouteLocationMatched[]) => {
    stack.value = buildTree([...matched], [...stack.value]);
  };

  return {
    stack,
    updateRoutes,
  };
};
