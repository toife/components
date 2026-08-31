import { GridOption, GridProps } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class Grid extends ToifeElement {
    static readonly tagName = "t-grid";
    options: GridOption[];
    private get gridAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { GridProps };
