import { RouteMatched } from '../router-like';
import { RouteStack } from '../../../../../core';
export declare const useRouteWrapper: () => {
    readonly stack: RouteStack[];
    updateRoutes: (matched: RouteMatched[]) => void;
    resetStack: () => void;
};
