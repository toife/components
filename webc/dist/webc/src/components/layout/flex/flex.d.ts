import { FlexOption, FlexProps } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class Flex extends ToifeElement {
    static readonly tagName = "t-flex";
    options: FlexOption[];
    private get flexAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { FlexProps };
