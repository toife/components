import type { AppDirection } from "../app/app.type";

export type CalloutVariant = "accent" | "outline";

export type CalloutSize = string;

export type CalloutProps = {
  role?: string;
  size?: CalloutSize;
  shape?: string;
  variant?: CalloutVariant;
  direction?: AppDirection;
  closable?: boolean;
};

export type CalloutEvent = {
  (e: "close"): void;
};

export type CalloutAttrOptions = {
  role: string;
  shape: string;
  size: string;
  direction: string;
  variant: CalloutVariant;
};
