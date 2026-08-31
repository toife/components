import { TabsAttrOptions, TabsHighlightPosition, TabsHighlightPositionOptions, TabsHighlightStyleOptions } from './tabs.type';
export declare const getTabsAttrs: (options: TabsAttrOptions) => {
    class: (string | {
        transition: boolean;
    })[];
};
export declare const getTabsHighlightPosition: (options: TabsHighlightPositionOptions) => TabsHighlightPosition;
export declare const getTabsHighlightStyle: (options: TabsHighlightStyleOptions) => {
    [x: string]: string;
};
