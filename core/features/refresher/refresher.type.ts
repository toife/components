export type RefreshEvent = {
  refresh: () => () => void;
  offset?: number;
};

export type RefresherEvent = {
  (e: "move", event: RefreshEvent): void;
  (e: "cancel"): void;
  (e: "end", event: RefreshEvent): void;
  (e: "start"): void;
};
