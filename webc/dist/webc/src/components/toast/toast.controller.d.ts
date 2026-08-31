import { ToastContentProps } from '../../../../core';
export declare const useToast: () => {
    readonly messages: ToastContentProps[];
    open: (message: ToastContentProps) => void;
    close: (id: number) => void;
    subscribe: (fn: () => void) => import('../../shared').Unsubscribe;
};
