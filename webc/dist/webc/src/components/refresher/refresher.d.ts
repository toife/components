import { ToifeElement } from '../../shared';
export declare class Refresher extends ToifeElement {
    static readonly tagName = "t-refresher";
    private container?;
    private ges?;
    private refreshing;
    private isPulling;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private bindGesture;
    private close;
    private refresh;
    private end;
    private cancel;
    render(): import('lit').TemplateResult<1>;
}
