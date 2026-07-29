export type GridOption = {
  breakpoint?: string;
  gap?: string | number;
  columns?: string;
  rows?: string;
  autoFlow?: string;
};

// Type definitions
export type GridProps = {
  options?: GridOption[];
};
