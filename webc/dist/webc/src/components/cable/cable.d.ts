import { PropertyValues } from 'lit';
import { ToifeElement } from '../../shared';
export declare class Cable extends ToifeElement {
    static readonly tagName = "t-cable";
    keyboard: boolean;
    placement: string;
    private readonly cableState;
    private notifier?;
    connectedCallback(): void;
    updated(changed: PropertyValues): void;
    render(): import('lit').TemplateResult<1>;
}
