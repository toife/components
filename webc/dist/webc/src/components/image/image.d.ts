import { PropertyValues } from 'lit';
import { ImageProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Image extends ToifeElement {
    static readonly tagName = "t-image";
    src: string;
    defaultSrc: string;
    private dataSrc;
    connectedCallback(): void;
    willUpdate(changed: PropertyValues<this>): void;
    private get appState();
    private get resolvedDefaultSrc();
    private onError;
    render(): import('lit').TemplateResult<1>;
}
export type { ImageProps };
