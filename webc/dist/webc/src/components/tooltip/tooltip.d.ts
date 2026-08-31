import { TooltipPlacement } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Tooltip extends ToifeElement {
    static readonly tagName = "t-tooltip";
    placement: TooltipPlacement;
    disabled: boolean;
    role: string;
    shape: string;
    size: string;
    private visible;
    connectedCallback(): void;
    private get appState();
    private get wrapperAttrs();
    private show;
    private hide;
    private onFocusOut;
    render(): import('lit').TemplateResult<1>;
}
