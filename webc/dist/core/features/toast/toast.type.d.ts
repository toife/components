export type ToastPlacement = "bottom-start" | "bottom-center" | "bottom-end" | "top-start" | "top-center" | "top-end";
export type ToastContentVariant = "fill" | "text";
export type ToastProps = {
    placement: ToastPlacement;
};
export type ToastContentProps = {
    id?: number;
    message: string;
    duration?: number;
    role?: string;
    variant?: ToastContentVariant;
    placement?: ToastPlacement;
    shape?: string;
};
export type ToastContentEvent = {
    (e: "close"): void;
};
export type ToastAttrOptions = {
    placement: string;
};
export type ToastContentAttrOptions = {
    role: string;
    shape: string;
    variant: ToastContentVariant;
    closing: boolean;
};
