import { PropertyValues } from 'lit';
import { CardProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Card extends ToifeElement {
    #private;
    static readonly tagName = "t-card";
    role: string;
    shape: string;
    divider?: boolean;
    connectedCallback(): void;
    updated(_changed: PropertyValues<this>): void;
    private get appState();
    private get effectiveDivider();
    private get effectiveShape();
    private get effectiveRole();
    private get cardProviderState();
    private get cardAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { CardProps };
