import { DecisionModalButton, DecisionModalDirection, DecisionModalProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class DecisionModal extends ToifeElement {
    static readonly tagName = "t-decision-modal";
    visible: boolean;
    title: string;
    message: string;
    actions: DecisionModalButton[];
    dismiss: string[];
    placement: string;
    role: string;
    shape: string;
    divider?: boolean;
    direction: DecisionModalDirection;
    keepalive: boolean;
    private pop;
    connectedCallback(): void;
    private get appState();
    private get shapeValue();
    private get dividerValue();
    private get decisionModalAttrs();
    private onClose;
    private onChoose;
    render(): import('lit').TemplateResult<1>;
}
export type { DecisionModalProps };
