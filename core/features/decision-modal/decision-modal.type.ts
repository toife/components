import { ButtonVariant } from "../button/button.type";

// Type definitions
export type DecisionModalButton = {
  text?: string;
  role?: string;
  variant?: ButtonVariant;
  handler?: () => void;
  data?: unknown;
};

export type DecisionModalFlow = "row" | "column";

export type DecisionModalProps = {
  visible?: boolean;
  title?: string;
  message: string;
  actions: DecisionModalButton[];
  dismiss?: Array<string>;
  placement?: string;
  role?: string;
  shape?: string;
  divider?: boolean;
  flow?: DecisionModalFlow;
  keepalive?: boolean;
};

export type DecisionModalComposableProps = DecisionModalProps & {
  onClose?: (type?: string) => void;
  onChoose?: (btn?: DecisionModalButton) => void;
};

export type DecisionModalEvent = {
  (e: "close", type?: string): void;
  (e: "choose", btn: DecisionModalButton): void;
};

export type DecisionModalAttrOptions = {
  role: string;
  shape: string;
  pop: boolean;
  divider: boolean;
};
export type DecisionModalFooterAttrOptions = { flow: string };
