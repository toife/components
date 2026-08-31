export declare function createFullscreen(): {
    isFullscreen: () => boolean;
    enter: (element: HTMLElement) => Promise<void>;
    exit: () => Promise<void>;
    toggle: (element: HTMLElement) => Promise<void>;
    subscribe: (listener: (isFullscreen: boolean) => void) => () => void;
};
