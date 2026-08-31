import { GridOption } from './grid.type';
export declare const getGridAttrs: (options: GridOption[]) => {
    class: string[];
    style: {
        [x: string]: string | undefined;
    }[];
};
