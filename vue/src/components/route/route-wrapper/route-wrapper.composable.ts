import { shallowRef } from "vue";
import { type RouteComponent, type RouteLocationMatched } from "vue-router";
import { getRouteStackKey, type RouteStack } from "@/core";

const stack = shallowRef<RouteStack[]>([]);

const activate = (
  item: RouteStack,
  rest: RouteLocationMatched[],
  fullPath: string,
): void => {
  item.fullPath = fullPath;
  item.stack = buildTree(rest, item.stack, fullPath);
};

/** Recursively builds a nested stack from vue-router `matched` for the navigator. */
const buildTree = (
  matched: RouteLocationMatched[],
  current: RouteStack[],
  fullPath: string,
): RouteStack[] => {
  // No deeper matched routes — drop stale leaf entries (e.g. parent navigated back).
  if (matched.length === 0) return [];

  const record = matched[0];
  const name = String(record.name);
  const rest = matched.slice(1);
  const key = getRouteStackKey(name, rest.length === 0, fullPath);

  // One-step back: drop the top page so we merge into the previous segment.
  if (current.length > 1 && current[current.length - 2]?.key === key) {
    current.pop();
  }

  const last = current[current.length - 1];

  // Same page already on top: refresh nested children only.
  if (last?.key === key) {
    activate(last, rest, fullPath);
    return current;
  }

  // Same full URL (leaf) or layout name already in this stack: reuse, no duplicate.
  const existingIndex = current.findIndex((item) => item.key === key);
  if (existingIndex >= 0) {
    const [existing] = current.splice(existingIndex, 1);
    current.push(existing);
    activate(existing, rest, fullPath);
    return current;
  }

  current.push({
    name,
    component: record.components as RouteComponent,
    stack: buildTree(rest, [], fullPath),
    key,
    fullPath,
  });

  return current;
};

export const useRouteWrapper = () => {
  const updateRoutes = (matched: RouteLocationMatched[], fullPath = "") => {
    stack.value = buildTree([...matched], [...stack.value], fullPath);
  };

  return {
    stack,
    updateRoutes,
  };
};
