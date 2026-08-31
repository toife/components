import { PropertyValues } from 'lit';
import { ToifeElement } from '../../shared';
export declare class Collapse extends ToifeElement {
    static readonly tagName = "t-collapse";
    modelValue: boolean;
    duration?: number;
    role: string;
    disabled: boolean;
    private isOpen;
    private contentHeight;
    private isFirstOpen;
    private contentRef?;
    connectedCallback(): void;
    willUpdate(changed: PropertyValues): void;
    firstUpdated(): void;
    updated(): void;
    private get appState();
    private scheduleMeasure;
    private measureContent;
    private toggle;
    private onKeydown;
    private get roleValue();
    private get durationCss();
    render(): import('lit').TemplateResult<1>;
}
