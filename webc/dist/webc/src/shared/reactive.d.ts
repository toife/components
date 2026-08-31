/** Simple pub/sub for Lit controller singletons (Vue composable equivalent). */
export type Unsubscribe = () => void;
export declare function createNotifier(): {
    notify(): void;
    subscribe(fn: () => void): Unsubscribe;
};
