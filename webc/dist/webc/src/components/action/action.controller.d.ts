import { ActionButton, ActionComposableProps } from '../../../../core';
export declare const useAction: () => {
    readonly data: ActionComposableProps | null;
    readonly visible: boolean;
    open: (props: ActionComposableProps) => void;
    close: (type?: string) => void;
    choose: (btn: ActionButton) => void;
    subscribe: (fn: () => void) => import('../../shared').Unsubscribe;
};
