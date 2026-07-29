export type CardProps = {
  role?: string;
  shape?: string;
  divider?: boolean;
};

export type CardProviderState = {
  role: string;
  shape: string;
  divider: boolean;
};

export type CardAttrOptions = { role: string; shape: string; divider: boolean };
export type CardHeaderAttrOptions = { divider: boolean };
export type CardFooterAttrOptions = { divider: boolean };
