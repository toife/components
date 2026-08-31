import { RouteProviderState } from '../../../../../core';
import { ToifeElement } from '../../../shared';
export declare class RouteProvider extends ToifeElement {
    static readonly tagName = "t-route-provider";
    stack: RouteProviderState["stack"];
    private readonly providerState;
    private notifier?;
    connectedCallback(): void;
    updated(): void;
    render(): import('lit').TemplateResult<1>;
}
