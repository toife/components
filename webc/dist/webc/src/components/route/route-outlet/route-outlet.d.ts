import { PropertyValues } from 'lit';
import { ToifeElement } from '../../../shared';
export declare class RouteOutlet extends ToifeElement {
    static readonly tagName = "t-route-outlet";
    component: unknown;
    private outlet?;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private resolveComponent;
    private resolveFromProp;
    private mountComponent;
    render(): import('lit').TemplateResult<1>;
}
