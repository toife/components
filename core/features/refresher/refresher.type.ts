export type RefresherEventData = {
  refresh: () => () => void;
  offset?: number;
};

export type RefresherEvent = {
  (e: "move", event: RefresherEventData): void;
  (e: "cancel"): void;
  (e: "end", event: RefresherEventData): void;
  (e: "start"): void;
};
