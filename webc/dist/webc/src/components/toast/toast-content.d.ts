import { ToastContentProps, ToastContentVariant } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class ToastContent extends ToifeElement {
    static readonly tagName = "t-toast-content";
    toastId: number;
    message: "";
    duration: number;
    role: string;
    shape: string;
    variant: ToastContentVariant;
    placement: string;
    private isClosing;
    private closeTimer?;
    private dismissTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private get appState();
    private get contentAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { ToastContentProps };
