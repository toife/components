import { RadioVariant } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class Radio extends ToifeElement {
    static readonly tagName = "t-radio";
    value: string | number;
    role: string;
    size: string;
    shape: string;
    variant: RadioVariant | "";
    disabled: boolean;
    readonly: boolean;
    private isFocused;
    connectedCallback(): void;
    private get appState();
    private get radioGroupState();
    private get effectiveDisabled();
    private get effectiveReadonly();
    private get radioAttrs();
    private onRadio;
    private onFocus;
    private onBlur;
    private onKeydown;
    render(): import('lit').TemplateResult<1>;
}
