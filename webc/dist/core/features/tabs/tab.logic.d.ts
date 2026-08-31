import { TabAttrOptions, TabButtonAttrOptions } from './tab.type';
export declare const getTabAttrs: (options: TabAttrOptions) => {
    class: (string | {
        active: boolean;
    })[];
};
export declare const getTabButtonAttrs: (options: TabButtonAttrOptions) => {
    class: string[];
};
