import { PropertyValues } from 'lit';
import { DropdownPlacement } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class Dropdown extends ToifeElement {
    static readonly tagName = "t-dropdown";
    modelValue: boolean;
    disabled: boolean;
    placement: DropdownPlacement;
    role: string;
    shape: string;
    direction: string;
    size: string;
    private isOpen;
    private docPointerHandler;
    private docKeyHandler;
    connectedCallback(): void;
    disconnectedCallback(): void;
    willUpdate(changed: PropertyValues): void;
    /** Toggle panel open state (Vue scoped-slot `toggle`). */
    toggle: () => void;
    /** Close panel (Vue `close`). */
    close: () => void;
    private get appState();
    private setOpen;
    private onDocPointerDown;
    private onDocKeydown;
    private get wrapperAttrs();
    render(): import('lit').TemplateResult<1>;
}
