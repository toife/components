/**
 * Check if the target is a form element
 */
export const isFormElement = (target: EventTarget | null) => {
  if (!target || !(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
};

/**
 * Blur the current active element
 */
export const blurCurrentActive = () => {
  const active = document.activeElement;
  if (
    active instanceof HTMLElement &&
    (active.tagName === "INPUT" ||
      active.tagName === "TEXTAREA" ||
      active.isContentEditable)
  ) {
    active.blur();
  }
};
