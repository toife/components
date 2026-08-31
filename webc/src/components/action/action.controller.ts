import type { ActionButton, ActionComposableProps } from "@/core";
import { createNotifier } from "../../shared/reactive";

let data: ActionComposableProps | null = null;
let visible = false;
const notifier = createNotifier();

export const useAction = () => {
  const open = (props: ActionComposableProps) => {
    data = props;
    setTimeout(() => {
      visible = true;
      notifier.notify();
    }, 50);
    notifier.notify();
  };

  const close = (type?: string) => {
    data?.onClose?.(type);
    visible = false;
    notifier.notify();
  };

  const choose = (btn: ActionButton) => {
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
