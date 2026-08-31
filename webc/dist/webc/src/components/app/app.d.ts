import { PropertyValues } from 'lit';
import { AppData, AppDirection, AppProps } from '../../../../core';
import { ToifeElement } from '../../shared';
export declare class App extends ToifeElement {
    static readonly tagName = "t-app";
    shape: string;
    divider: boolean;
    role: string;
    triple: boolean;
    direction: AppDirection;
    data: AppData;
    private rootDiv?;
    private readonly appState;
    private notifier?;
    private unsubAction?;
    private unsubDecision?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private syncAppState;
    private onActionClose;
    private onActionChoose;
    private onDecisionClose;
    private onDecisionChoose;
    render(): import('lit').TemplateResult<1>;
}
export type { AppProps };
