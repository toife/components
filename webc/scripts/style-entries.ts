import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const coreFeatures = path.join(packageRoot, "../core/features");

/**
 * CSS basename → absolute path to core SCSS.
 * Mirrors Vue's per-component style emission (`button.css`, `card-header.css`, …).
 */
export const STYLE_MAP: Record<string, string> = {
  action: path.join(coreFeatures, "action/action.scss"),
  app: path.join(coreFeatures, "app/app.scss"),
  avatar: path.join(coreFeatures, "avatar/avatar.scss"),
  button: path.join(coreFeatures, "button/button.scss"),
  cable: path.join(coreFeatures, "cable/cable.scss"),
  card: path.join(coreFeatures, "card/card.scss"),
  "card-body": path.join(coreFeatures, "card/card-body.scss"),
  "card-footer": path.join(coreFeatures, "card/card-footer.scss"),
  "card-header": path.join(coreFeatures, "card/card-header.scss"),
  checkbox: path.join(coreFeatures, "checkbox/checkbox.scss"),
  collapse: path.join(coreFeatures, "collapse/collapse.scss"),
  container: path.join(coreFeatures, "container/container.scss"),
  "decision-modal": path.join(coreFeatures, "decision-modal/decision-modal.scss"),
  divider: path.join(coreFeatures, "divider/divider.scss"),
  dropdown: path.join(coreFeatures, "dropdown/dropdown.scss"),
  field: path.join(coreFeatures, "field/field.scss"),
  flex: path.join(coreFeatures, "layout/flex.scss"),
  "flex-item": path.join(coreFeatures, "layout/flex-item.scss"),
  "form-group": path.join(coreFeatures, "form-group/form-group.scss"),
  "gesture-indicator": path.join(coreFeatures, "gesture-indicator/gesture-indicator.scss"),
  grid: path.join(coreFeatures, "layout/grid.scss"),
  "grid-item": path.join(coreFeatures, "layout/grid-item.scss"),
  modal: path.join(coreFeatures, "modal/modal.scss"),
  page: path.join(coreFeatures, "page/page.scss"),
  present: path.join(coreFeatures, "present/present.scss"),
  progress: path.join(coreFeatures, "progress/progress.scss"),
  radio: path.join(coreFeatures, "radio/radio.scss"),
  "radio-group": path.join(coreFeatures, "radio/radio-group.scss"),
  refresher: path.join(coreFeatures, "refresher/refresher.scss"),
  "route-navigator": path.join(coreFeatures, "route/route-navigator.scss"),
  scrollbar: path.join(coreFeatures, "scrollbar/scrollbar.scss"),
  "segmented-field": path.join(coreFeatures, "segmented-field/segmented-field.scss"),
  select: path.join(coreFeatures, "select/select.scss"),
  "slide-range": path.join(coreFeatures, "slide-range/slide-range.scss"),
  skeleton: path.join(coreFeatures, "skeleton/skeleton.scss"),
  switch: path.join(coreFeatures, "switch/switch.scss"),
  tag: path.join(coreFeatures, "tag/tag.scss"),
  tab: path.join(coreFeatures, "tabs/tab.scss"),
  tabs: path.join(coreFeatures, "tabs/tabs.scss"),
  tooltip: path.join(coreFeatures, "tooltip/tooltip.scss"),
  toast: path.join(coreFeatures, "toast/toast.scss"),
  "toast-content": path.join(coreFeatures, "toast/toast-content.scss"),
  toolbar: path.join(coreFeatures, "toolbar/toolbar.scss"),
};

export type StyleEntry = {
  name: string;
  file: string;
};

export function getStyleEntries(): StyleEntry[] {
  return Object.entries(STYLE_MAP)
    .map(([name, file]) => ({ name, file }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getStyleInput(): Record<string, string> {
  return Object.fromEntries(getStyleEntries().map(({ name, file }) => [name, file]));
}

export function buildStylesIndexCss(): string {
  const imports = getStyleEntries()
    .map(({ name }) => `@import "./${name}.css";`)
    .join("\n");

  return `${imports}\n`;
}
