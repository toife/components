import { RouteNavigatorAttrOptions, RouteNavigatorBackdropAttrOptions, RouteNavigatorComponentAttrOptions } from './route-navigator.type';
export declare const getRouteNavigatorTransitionDuration: (options: Pick<RouteNavigatorAttrOptions, "variant" | "transform">) => string | undefined;
export declare const getRouteNavigatorAttrs: (options: RouteNavigatorAttrOptions) => {
    class: (string | {
        moving: boolean;
    })[];
    style: {
        [x: string]: string | number | undefined;
    };
};
export declare const getRouteNavigatorComponentAttrs: (options: RouteNavigatorComponentAttrOptions) => {
    class: string[];
};
export declare const getRouteNavigatorBackdropAttrs: (options: RouteNavigatorBackdropAttrOptions) => {
    class: string[];
    style: {
        zIndex: number;
    };
};
