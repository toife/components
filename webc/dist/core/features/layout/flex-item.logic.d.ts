import { FlexItemOption } from './flex-item.type';
export declare const getFlexItemAttrs: (options: FlexItemOption[]) => {
    class: string[];
    style: {
        [x: string]: string | number | undefined;
    }[];
};
