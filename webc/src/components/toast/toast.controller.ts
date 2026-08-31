import type { ToastContentProps } from "@/core";
import { createNotifier } from "../../shared/reactive";

let messages: ToastContentProps[] = [];
let messageId = 1;
const notifier = createNotifier();

export const useToast = () => {
  const open = (message: ToastContentProps) => {
    messages = [...messages, { ...message, id: messageId++ }];
    notifier.notify();
  };

  const close = (id: number) => {
    messages = messages.filter((item) => item.id !== id);
    notifier.notify();
  };

  return {
    get messages() {
      return messages;
    },
    open,
    close,
    subscribe: notifier.subscribe,
  };
};
