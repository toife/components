import { CheckboxProps, CheckboxVariant } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Checkbox extends ToifeElement {
    static readonly tagName = "t-checkbox";
    modelValue: boolean;
    role: string;
    shape: string;
    size: string;
    variant: CheckboxVariant;
    disabled: boolean;
    readonly: boolean;
    private focused;
    connectedCallback(): void;
    private get appState();
    private get checkboxAttrs();
    private get checkboxIconAttrs();
    private onCheckbox;
    private onFocus;
    private onBlur;
    private onKeydown;
    render(): import('lit').TemplateResult<1>;
}
export type { CheckboxProps };
