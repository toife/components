export declare function useFullscreen(): {
    readonly isFullscreen: boolean;
    subscribe(fn: (value: boolean) => void): () => boolean;
    enter: (element: HTMLElement) => Promise<void>;
    exit: () => Promise<void>;
    toggle: (element: HTMLElement) => Promise<void>;
    dispose: () => void;
};
