import { RadioVariant } from './radio-group.type';
export type { RadioVariant };
export type RadioSize = string;
export type RadioProps = {
    value: string | number;
    role?: string;
    size?: RadioSize;
    shape?: string;
    variant?: RadioVariant;
    disabled?: boolean;
    readonly?: boolean;
};
export type RadioAttrOptions = {
    role: string;
    shape: string;
    size: string;
    variant: string;
    checked: boolean;
    disabled: boolean;
    readonly: boolean;
    focus: boolean;
};
