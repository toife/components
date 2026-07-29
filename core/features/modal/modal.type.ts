// Props
export type ModalProps = {
  role?: string;
  class?: unknown;
  visible?: boolean;
  gesture?: boolean;
  fullscreen?: boolean;
  placement?: "top" | "left" | "right" | "center" | "bottom";
  keepalive?: boolean;
  backdrop?: "display" | "none" | "transparent";
  shape?: string;
  indicator?: boolean;
  duration?: number;
  bounce?: number | string;
  style?: unknown;
};

// Event
export type ModalEvent = {
  (e: "close", type?: string): void;
};

export type ModalAttrOptions = { role: string; shape: string; placement: string; fullscreen: boolean; className?: unknown; style?: unknown };
