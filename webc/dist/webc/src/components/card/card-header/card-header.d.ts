import { ToifeElement } from '../../../shared';
export declare class CardHeader extends ToifeElement {
    static readonly tagName = "t-card-header";
    connectedCallback(): void;
    private get cardState();
    private get cardHeaderAttrs();
    render(): import('lit').TemplateResult<1>;
}
