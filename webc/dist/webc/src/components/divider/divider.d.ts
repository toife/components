import { DividerDirection } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Divider extends ToifeElement {
    static readonly tagName = "t-divider";
    role: string;
    direction: DividerDirection;
    connectedCallback(): void;
    private get appState();
    render(): import('lit').TemplateResult<1>;
}
