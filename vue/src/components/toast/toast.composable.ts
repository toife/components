import { ref } from "vue";
import { type ToastContentProps } from "@/core";

// Queue of active toast payloads (each open() appends with a monotonic id)
const messages = ref<ToastContentProps[]>([]);
const messageId = ref(1);

export const useToast = () => {
  const open = (message: ToastContentProps) => {
    messages.value.push({ ...message, id: messageId.value++ });
  };

  const close = (id: number) => {
    messages.value = messages.value.filter((item) => item.id !== id);
  };

  return {
    messages,
    open,
    close,
  };
};
