import { ButtonVariant } from '../button/button.type';
import { PresentPlacement } from '../present/present.type';
export type ActionPlacement = PresentPlacement;
export type ActionButton = {
    text?: string;
    role?: string;
    variant?: ButtonVariant;
    handler?: () => void;
    data?: unknown;
};
/**
 * Action Props Type
 */
export type ActionProps = {
    visible?: boolean;
    dismiss?: string[];
    actions: Array<ActionButton[]>;
    role?: string;
    shape?: string;
    divider?: boolean;
    placement?: ActionPlacement;
};
/**
 * Action Composable Props Type
 */
export type ActionComposableProps = ActionProps & {
    onClose?: (type?: string) => void;
    onChoose?: (btn?: ActionButton) => void;
};
/**
 * Action Event Type
 */
export type ActionEvent = {
    (e: "close", type?: string): void;
    (e: "choose", btn: ActionButton): void;
};
export type ActionAttrOptions = {
    role: string;
    shape: string;
    placement: string;
    divider: boolean;
    pop: boolean;
};
