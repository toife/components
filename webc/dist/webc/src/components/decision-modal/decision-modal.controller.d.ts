import { DecisionModalButton, DecisionModalComposableProps } from '../../../../core';
export declare const useDecisionModal: () => {
    readonly data: DecisionModalComposableProps | null;
    readonly visible: boolean;
    open: (props: DecisionModalComposableProps) => void;
    close: (type?: string) => void;
    choose: (btn: DecisionModalButton) => void;
    subscribe: (fn: () => void) => import('../../shared').Unsubscribe;
};
