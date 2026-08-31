/** Simple pub/sub for Lit controller singletons (Vue composable equivalent). */
export type Unsubscribe = () => void;

export function createNotifier() {
  const listeners = new Set<() => void>();
  return {
    notify() {
      for (const fn of listeners) fn();
    },
    subscribe(fn: () => void): Unsubscribe {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
