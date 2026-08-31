import { SkeletonProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Skeleton extends ToifeElement {
    static readonly tagName = "t-skeleton";
    role: string;
    shape: string;
    width: string;
    height: string;
    connectedCallback(): void;
    private get appState();
    private get skeletonAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { SkeletonProps };
