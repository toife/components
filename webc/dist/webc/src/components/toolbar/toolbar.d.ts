import { ToifeElement } from '../../shared';
export declare class Toolbar extends ToifeElement {
    static readonly tagName = "t-toolbar";
    placement: string | null;
    safe: boolean;
    role: string;
    divider?: boolean;
    connectedCallback(): void;
    private get appState();
    private get cableState();
    private get toolbarAttrs();
    render(): import('lit').TemplateResult<1>;
}
