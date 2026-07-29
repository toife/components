import { ref } from "vue";
import { type ActionButton, type ActionComposableProps } from "@/core";

const data = ref<ActionComposableProps | null>(null);
const visible = ref(false);

export const useAction = () => {
  const open = (props: ActionComposableProps) => {
    data.value = props;
    setTimeout(() => {
      visible.value = true;
    }, 50);
  };

  const close = (type?: string) => {
    data.value?.onClose?.(type);
    visible.value = false;
  };

  const choose = (btn: ActionButton) => {
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
