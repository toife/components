import type { DecisionModalButton, DecisionModalComposableProps } from "@/core";
import { createNotifier } from "../../shared/reactive";

let data: DecisionModalComposableProps | null = null;
let visible = false;
const notifier = createNotifier();

export const useDecisionModal = () => {
  const open = (props: DecisionModalComposableProps) => {
    data = props;
    setTimeout(() => {
      visible = true;
      notifier.notify();
    }, 50);
    notifier.notify();
  };

  const close = (type?: string) => {
    data?.onClose?.();
    visible = false;
    notifier.notify();
  };

  const choose = (btn: DecisionModalButton) => {
    data?.onChoose?.(btn);
    visible = false;
    notifier.notify();
  };

  return {
    get data() {
      return data;
    },
    get visible() {
      return visible;
    },
    open,
    close,
    choose,
    subscribe: notifier.subscribe,
  };
};
