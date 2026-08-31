import { TagVariant } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Tag extends ToifeElement {
    static readonly tagName = "t-tag";
    role: string;
    size: string;
    shape: string;
    variant: TagVariant;
    connectedCallback(): void;
    private get appState();
    private get tagAttrs();
    render(): import('lit').TemplateResult<1>;
}
