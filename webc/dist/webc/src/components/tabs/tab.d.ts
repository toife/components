import { TabProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Tab extends ToifeElement {
    static readonly tagName = "t-tab";
    value: string;
    disabled: boolean;
    connectedCallback(): void;
    private get tabsState();
    private get isActive();
    private get tabAttrs();
    private get buttonAttrs();
    private handleClick;
    render(): import('lit').TemplateResult<1>;
}
export type { TabProps };
