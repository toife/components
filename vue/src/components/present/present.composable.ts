import { ref } from "vue";

// Base z-index for stacked overlays; increments by 2 so backdrop sits one level below its sheet
const index = ref(1000);

// Stack of currently visible presents (last = topmost), used to route Escape to the top layer only
const stack = ref<symbol[]>([]);

export const usePresent = () => {
  const newIndex = () => {
    index.value += 2;
    return index.value;
  };

  const resetIndex = () => {
    index.value = 1000;
    return index.value;
  };

  const pushStack = (id: symbol) => {
    if (!stack.value.includes(id)) stack.value.push(id);
  };

  const removeStack = (id: symbol) => {
    stack.value = stack.value.filter((item) => item !== id);
  };

  const isTop = (id: symbol) => stack.value[stack.value.length - 1] === id;

  return {
    pushStack,
    removeStack,
    isTop,
    newIndex,
    resetIndex,
    index,
  };
};
