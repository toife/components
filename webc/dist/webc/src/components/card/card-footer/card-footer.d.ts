import { ToifeElement } from '../../../shared';
export declare class CardFooter extends ToifeElement {
    static readonly tagName = "t-card-footer";
    connectedCallback(): void;
    private get cardState();
    private get cardFooterAttrs();
    render(): import('lit').TemplateResult<1>;
}
