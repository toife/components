import type { RouteMatched } from "../router-like";
import type { RouteStack } from "@/core";

let stack: RouteStack[] = [];

/** Recursively builds a nested stack from matched routes for the navigator. */
const buildTree = (matched: RouteMatched[], current: RouteStack[]): RouteStack[] => {
  if (matched.length === 0) return [];

  if (current.length > 1 && current[current.length - 2]?.name === matched[0].name) {
    current.pop();
  }

  if (
    current.length > 0 &&
    current[current.length - 1] &&
    current[current.length - 1].name === matched[0].name
  ) {
    const rest = [...matched];
    rest.shift();
    current[current.length - 1].stack = buildTree(rest, current[current.length - 1].stack);
  } else {
    const rest = [...matched];
    const name = String(rest[0].name);
    const component = rest[0].component;
    rest.shift();
    current.push({
      name,
      component,
      stack: buildTree(rest, []),
    });
  }

  return current;
};

export const useRouteWrapper = () => {
  const updateRoutes = (matched: RouteMatched[]) => {
    stack = buildTree([...matched], [...stack]);
  };

  const resetStack = () => {
    stack = [];
  };

  return {
    get stack() {
      return stack;
    },
    updateRoutes,
    resetStack,
  };
};
