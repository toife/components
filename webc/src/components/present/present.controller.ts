let index = 1000;

export const usePresent = () => {
  const newIndex = () => {
    index += 2;
    return index;
  };

  const resetIndex = () => {
    index = 1000;
    return index;
  };

  return {
    get index() {
      return index;
    },
    newIndex,
    resetIndex,
  };
};
