import { PropertyValues } from 'lit';
import { RadioVariant } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class RadioGroup extends ToifeElement {
    static readonly tagName = "t-radio-group";
    modelValue?: string | number;
    role: string;
    shape: string;
    variant: RadioVariant;
    disabled: boolean;
    readonly: boolean;
    direction: string;
    private readonly groupState;
    private notifier?;
    connectedCallback(): void;
    updated(changed: PropertyValues): void;
    private get appState();
    private syncGroupState;
    private get radioGroupAttrs();
    render(): import('lit').TemplateResult<1>;
}
