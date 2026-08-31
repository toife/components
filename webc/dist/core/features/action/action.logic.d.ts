import { ActionAttrOptions } from './action.type';
export declare const getActionAttrs: (options: ActionAttrOptions) => {
    class: (string | {
        pop: boolean;
        divider: boolean;
    })[];
};
