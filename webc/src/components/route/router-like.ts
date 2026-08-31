import type { RouteStack } from "@/core";

/** Minimal router surface for Lit route components (vue-router alternative). */
export type RouteMatched = {
  name: string;
  component: unknown;
};

export type RouterLike = {
  currentRoute: { path: string; fullPath: string; name?: string; meta?: Record<string, unknown> };
  /** Current matched route chain (vue-router `matched` equivalent). */
  matched?: RouteMatched[];
  push(to: string): void | Promise<void>;
  replace(to: string): void | Promise<void>;
  back(): void;
  /** Resolve a named route to its matched chain. */
  resolve?(to: { name: string }): { matched: RouteMatched[] };
  /** Optional subscription when navigation changes. */
  onChange?(listener: () => void): () => void;
};

export type { RouteStack };
