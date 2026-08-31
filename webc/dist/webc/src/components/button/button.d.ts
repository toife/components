import { ButtonProps, ButtonVariant } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Button extends ToifeElement {
    static readonly tagName = "t-button";
    role: string;
    size: string;
    shape: string;
    block: boolean;
    loading: boolean;
    variant: ButtonVariant;
    private focused;
    connectedCallback(): void;
    private get appState();
    private get buttonAttrs();
    private get loaderAttrs();
    private onFocus;
    private onBlur;
    render(): import('lit').TemplateResult<1>;
}
export type { ButtonProps };
