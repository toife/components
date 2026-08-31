import { FieldSize, FieldVariant } from '../field';
import { AppDirection } from '../app/app.type';
export type SelectVariant = FieldVariant;
export type SelectSize = FieldSize;
export type SelectOption = {
    label?: string;
    value: string;
    disabled?: boolean;
};
export type SelectProps = {
    modelValue?: string;
    name?: string;
    variant?: FieldVariant;
    role?: string;
    shape?: string;
    size?: FieldSize;
    direction?: AppDirection;
    id?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    autocomplete?: string;
    tabindex?: number | string;
    line?: number | string;
    maxLine?: number | string;
    message?: string;
    options: Array<SelectOption>;
};
export type SelectEvent = {
    (e: "update:modelValue", value: string): void;
    (e: "select", option: SelectOption): void;
};
export type SelectAttrOptions = {
    role: string;
    direction: string;
    size: string;
    disabled: boolean;
};
