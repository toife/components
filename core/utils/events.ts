import { blurCurrentActive, isFormElement } from "./element";

/** Subset of the Virtual Keyboard API used for layout. */
type VirtualKeyboardOverlay = { overlaysContent: boolean };

/**
 * Prevent default behavior
 */
export const preventDefault = () => {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("pointerup", (e) => {
    if (!isFormElement(e.target)) blurCurrentActive();
  });

  if ("virtualKeyboard" in navigator && navigator.virtualKeyboard) {
    (navigator.virtualKeyboard as VirtualKeyboardOverlay).overlaysContent = true;
  }
};
