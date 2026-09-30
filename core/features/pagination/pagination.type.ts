import type { AppDirection } from "../app/app.type";
import type { ButtonVariant } from "../button/button.type";

// Type definitions
export type PaginationVariant = ButtonVariant;

export type PaginationSize = string;

export type PaginationItem = { type: "page"; page: number } | { type: "ellipsis"; key: string };

export type PaginationProps = {
  modelValue?: number;
  value?: number;
  length?: number;
  siblings?: number;
  boundaries?: number;
  variant?: PaginationVariant;
  activeVariant?: PaginationVariant;
  size?: PaginationSize;
  role?: string;
  shape?: string;
  disabled?: boolean;
  controls?: boolean;
  direction?: AppDirection;
};

export type PaginationEvent = {
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
};

export type PaginationItemsOptions = {
  current: number;
  length: number;
  siblings: number;
  boundaries: number;
};

export type PaginationAttrOptions = {
  direction: string;
  size: string;
  disabled: boolean;
};

export type PaginationItemAttrOptions = {
  active: boolean;
};
