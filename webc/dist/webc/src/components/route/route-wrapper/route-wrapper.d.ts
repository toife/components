import { PropertyValues } from 'lit';
import { RouteWrapperProps } from '../../../../../core';
import { ToifeElement } from '../../../shared';
import { RouterLike } from '../router-like';
export declare class RouteWrapper extends ToifeElement {
    static readonly tagName = "t-route-wrapper";
    homeRouteName: string;
    router?: RouterLike;
    private wrapper;
    private unsubRoute?;
    private mounted;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private bootstrapStack;
    private syncFromRouter;
    render(): import('lit').TemplateResult<1>;
}
export type { RouteWrapperProps };
