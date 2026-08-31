import { FormGroupDirection, FormGroupProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class FormGroup extends ToifeElement {
    static readonly tagName = "t-form-group";
    direction: FormGroupDirection;
    private get formGroupAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { FormGroupProps };
