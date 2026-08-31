export type GridOption = {
    breakpoint?: string;
    gap?: string | number;
    columns?: string;
    rows?: string;
    autoFlow?: string;
};
export type GridProps = {
    options?: GridOption[];
};
