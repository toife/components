import { ActionButton, ActionPlacement, ActionProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Action extends ToifeElement {
    static readonly tagName = "t-action";
    visible: boolean;
    dismiss: string[];
    actions: ActionButton[][];
    role: string;
    shape: string;
    divider?: boolean;
    placement: ActionPlacement;
    private pop;
    connectedCallback(): void;
    private get appState();
    private get actionAttrs();
    private onClose;
    private onChoose;
    render(): import('lit').TemplateResult<1>;
}
export type { ActionProps };
