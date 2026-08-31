export type PresentPlacement = "top" | "left" | "right" | "center" | "bottom";
export type PresentProps = {
    keepalive?: boolean;
    visible?: boolean;
    backdrop?: "display" | "none" | "transparent";
    placement?: PresentPlacement;
    style?: unknown;
    class?: unknown;
    bounce?: number | string | boolean;
    duration?: number;
    teleport?: string;
};
export type PresentEvent = {
    (e: "close", type?: string): void;
};
export type RenderOptions = {
    backdropTransitionDuration?: string;
    backdropOpacity?: number;
    presentTransitionDuration?: string;
    presentTranslate?: string;
    presentOpacity?: number;
};
export type PresentStyles = {
    backdropTransitionDuration: string;
    backdropOpacity: number | undefined;
    presentTransitionDuration: string;
    presentTranslate: string;
    presentOpacity: number;
};
export type PresentBackdropAttrOptions = {
    zIndex: number;
    backdropTransitionDuration: string;
    backdropOpacity?: number;
};
export type PresentAttrOptions = {
    zIndex: number;
    presentTransitionDuration: string;
    presentTranslate: string;
    presentOpacity: number;
    className?: unknown;
    placement: string;
    style?: unknown;
};
