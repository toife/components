export type RouteStack = {
    name: string;
    component: unknown;
    stack: RouteStack[];
};
