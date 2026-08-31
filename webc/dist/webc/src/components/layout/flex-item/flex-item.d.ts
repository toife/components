import { FlexItemOption, FlexItemProps } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class FlexItem extends ToifeElement {
    static readonly tagName = "t-flex-item";
    options: FlexItemOption[];
    private get flexItemAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { FlexItemProps };
