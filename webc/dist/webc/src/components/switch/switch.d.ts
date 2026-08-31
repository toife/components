import { SwitchProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Switch extends ToifeElement {
    static readonly tagName = "t-switch";
    modelValue: boolean;
    role: string;
    shape: string;
    size: string;
    disabled: boolean;
    readonly: boolean;
    bounce: number;
    private focused;
    private isFirstRender;
    connectedCallback(): void;
    private get appState();
    private get switchWrapperAttrs();
    private get switchAttrs();
    private get switchIconAttrs();
    private onSwitch;
    private onFocus;
    private onBlur;
    private onKeydown;
    render(): import('lit').TemplateResult<1>;
}
export type { SwitchProps };
