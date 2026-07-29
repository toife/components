import { ref } from "vue";

// Base z-index for stacked overlays; increments by 2 so backdrop sits one level below its sheet
const index = ref(1000);

export const usePresent = () => {
  const newIndex = () => {
    index.value += 2;
    return index.value;
  };

  const resetIndex = () => {
    index.value = 1000;
    return index.value;
  };

  return {
    newIndex,
    resetIndex,
    index,
  };
};
