export type ScrollbarDirection = "vertical" | "horizontal" | "both";

export type ScrollbarAxis = "x" | "y";

export type ScrollbarProps = {
  direction?: ScrollbarDirection;
  /** Gutter width in px — the hit area of the track. */
  size?: number;
  /** Painted thumb width in px, centered inside the gutter. */
  thumbSize?: number;
  /** Shortest the thumb may get on very long content. */
  minThumb?: number;
  /** Fade the tracks out when idle. */
  autoHide?: boolean;
  /** Idle time in ms before fading out after a scroll. */
  hideDelay?: number;
  role?: string;
};

export type ScrollbarEvent = {
  (e: "scroll", event: Event): void;
};

/** Live geometry of the scrollport, read straight off the element. */
export type ScrollbarMetrics = {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
};

export type ScrollbarGeometryOptions = {
  /** Px taken off the track end so the two tracks never meet in the corner. */
  inset: number;
  minThumb: number;
};

/** One axis of `ScrollbarMetrics`, resolved into px the track can be drawn from. */
export type ScrollbarAxisGeometry = {
  /** Length of the track. */
  track: number;
  /** Length of the thumb. */
  thumb: number;
  /** How far the thumb can travel — the scale between thumb px and content px. */
  travel: number;
  /** How far the content can scroll. */
  maxScroll: number;
  /** Where the thumb sits right now. */
  offset: number;
};

export type ScrollbarAttrOptions = {
  role: string;
  size: number;
  thumbSize: number;
  visible: boolean;
  dragging: boolean;
};

export type ScrollbarTrackAttrOptions = {
  axis: ScrollbarAxis;
  inset: number;
};

export type ScrollbarThumbAttrOptions = {
  length: number;
  offset: number;
};
