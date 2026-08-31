import { nothing } from 'lit';
import { ToastPlacement, ToastProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Toast extends ToifeElement {
    static readonly tagName = "t-toast";
    placement: ToastPlacement;
    private unsubscribe?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private get toastMessages();
    private dismiss;
    render(): import('lit').TemplateResult<1> | typeof nothing;
}
export type { ToastProps };
