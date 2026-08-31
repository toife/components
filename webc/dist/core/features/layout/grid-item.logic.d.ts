import { GridItemOption } from './grid-item.type';
export declare const getGridItemAttrs: (options: GridItemOption[]) => {
    class: string[];
    style: {
        [x: string]: number | "center" | "start" | "end" | "stretch" | undefined;
    }[];
};
