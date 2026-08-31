import { GridItemOption, GridItemProps } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class GridItem extends ToifeElement {
    static readonly tagName = "t-grid-item";
    options: GridItemOption[];
    private get gridItemAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { GridItemProps };
