import { ToifeElement } from '../../shared';
export declare class GestureIndicator extends ToifeElement {
    static readonly tagName = "t-gesture-indicator";
    placement: string;
    role: string;
    connectedCallback(): void;
    private get appState();
    private get gestureIndicatorAttrs();
    render(): import('lit').TemplateResult<1>;
}
