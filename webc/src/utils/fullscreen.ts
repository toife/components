import { createFullscreen } from "@/core";

export function useFullscreen() {
  let fullscreen: ReturnType<typeof createFullscreen> | undefined;
  let unsubscribe: (() => void) | undefined;
  let isFullscreen = false;
  const listeners = new Set<(value: boolean) => void>();

  const ensure = () => {
    if (!fullscreen) {
      fullscreen = createFullscreen();
      unsubscribe = fullscreen.subscribe((value) => {
        isFullscreen = value;
        for (const fn of listeners) fn(value);
      });
    }
    return fullscreen;
  };

  return {
    get isFullscreen() {
      return isFullscreen;
    },
    subscribe(fn: (value: boolean) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    enter: (element: HTMLElement) => ensure().enter(element),
    exit: () => ensure().exit(),
    toggle: (element: HTMLElement) => ensure().toggle(element),
    dispose: () => {
      unsubscribe?.();
      unsubscribe = undefined;
      fullscreen = undefined;
      listeners.clear();
    },
  };
}
