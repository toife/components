import { AvatarProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Avatar extends ToifeElement {
    static readonly tagName = "t-avatar";
    role: string;
    shape: string;
    size: string;
    src: string;
    divider?: boolean;
    connectedCallback(): void;
    private get appState();
    private get effectiveDivider();
    private get avatarAttrs();
    render(): import('lit').TemplateResult<1>;
}
export type { AvatarProps };
