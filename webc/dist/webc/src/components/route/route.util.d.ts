import { RouteStack } from '../../../../core';
/** Deep-clone the nested route stack tree (each level has its own `stack` branch). */
export declare const clone: (value: RouteStack[]) => RouteStack[];
