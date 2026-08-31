export type GridItemJustify = "start" | "end" | "center" | "stretch";
export type GridItemAlign = "start" | "end" | "center" | "stretch";
export type GridItemOption = {
    breakpoint?: string;
    row?: number;
    column?: number;
    justify?: GridItemJustify;
    align?: GridItemAlign;
};
export type GridItemProps = {
    options?: GridItemOption[];
};
