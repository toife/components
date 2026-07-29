import { ref } from "vue";
import { type DecisionModalButton, type DecisionModalComposableProps } from "@/core";

const data = ref<DecisionModalComposableProps | null>(null);
const visible = ref(false);

export const useDecisionModal = () => {
  const open = (props: DecisionModalComposableProps) => {
    data.value = props;
    // Defer visibility so the modal mounts with props before entering the open transition
    setTimeout(() => {
      visible.value = true;
    }, 50);
  };

  const close = (type?: string) => {
    data.value?.onClose?.();
    visible.value = false;
  };

  const choose = (btn: DecisionModalButton) => {
    data.value?.onChoose?.(btn);
    visible.value = false;
  };

  return {
    open,
    close,
    choose,
    visible,
    data,
  };
};
