/**
 * App Direction Type
 */
export type AppDirection = "left" | "right";

/**
 * App Data Type
 */
export type AppData = Record<string, unknown>;

/**
 * App Props Type
 */
export type AppProps = {
  shape?: string;
  divider?: boolean;
  role?: string;
  shadow?: boolean;
  triple?: boolean;
  direction?: AppDirection;
  data?: AppData;
};

/**
 * App Provider State Type
 */
export type AppProviderState = {
  shape: string;
  divider: boolean;
  role: string;
  shadow: boolean;
  triple: boolean;
  direction: AppDirection;
  rootEl: HTMLElement | undefined;
  data: AppData;
};

export type AppAttrOptions = { shape: string };
