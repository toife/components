import { cssPrefix } from "../../utils";
import { TabAttrOptions } from "./tab.type";

export const getTabAttrs = (options: TabAttrOptions) => ({
  class: [cssPrefix("tab"), { active: options.active }],
});
