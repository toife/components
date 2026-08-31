import {
  Action,
  App,
  Avatar,
  Button,
  Cable,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Checkbox,
  Collapse,
  Container,
  DecisionModal,
  Divider,
  Dropdown,
  Field,
  Flex,
  FlexItem,
  FormGroup,
  GestureIndicator,
  Grid,
  GridItem,
  Image,
  Modal,
  Page,
  Present,
  Radio,
  RadioGroup,
  Refresher,
  RouteNavigator,
  RouteWrapper,
  RouteProvider,
  RouteOutlet,
  Scrollbar,
  SegmentedField,
  Select,
  SlideRange,
  Skeleton,
  Switch,
  Tag,
  Tab,
  Tabs,
  Tooltip,
  Toast,
  ToastContent,
  Toolbar,
} from "./components";
import type { SubscribeOptions } from "./types";
import { preventDefault } from "@/core";

type CustomElementConstructor = new (...args: any[]) => HTMLElement;

type NamedElement = CustomElementConstructor & { tagName?: string };

const apps: Record<string, Toife> = {};
const defaultAppName = "toife";

const REGISTRY: Array<{ name: string; ctor: NamedElement }> = [
  { name: "app", ctor: App },
  { name: "action", ctor: Action },
  { name: "avatar", ctor: Avatar },
  { name: "button", ctor: Button },
  { name: "cable", ctor: Cable },
  { name: "card", ctor: Card },
  { name: "card-body", ctor: CardBody },
  { name: "card-header", ctor: CardHeader },
  { name: "card-footer", ctor: CardFooter },
  { name: "checkbox", ctor: Checkbox },
  { name: "radio", ctor: Radio },
  { name: "radio-group", ctor: RadioGroup },
  { name: "collapse", ctor: Collapse },
  { name: "container", ctor: Container },
  { name: "decision-modal", ctor: DecisionModal },
  { name: "divider", ctor: Divider },
  { name: "dropdown", ctor: Dropdown },
  { name: "field", ctor: Field },
  { name: "flex", ctor: Flex },
  { name: "flex-item", ctor: FlexItem },
  { name: "form-group", ctor: FormGroup },
  { name: "gesture-indicator", ctor: GestureIndicator },
  { name: "grid", ctor: Grid },
  { name: "grid-item", ctor: GridItem },
  { name: "image", ctor: Image },
  { name: "modal", ctor: Modal },
  { name: "page", ctor: Page },
  { name: "present", ctor: Present },
  { name: "refresher", ctor: Refresher },
  { name: "route-navigator", ctor: RouteNavigator },
  { name: "route-wrapper", ctor: RouteWrapper },
  { name: "route-provider", ctor: RouteProvider },
  { name: "route-outlet", ctor: RouteOutlet },
  { name: "scrollbar", ctor: Scrollbar },
  { name: "segmented-field", ctor: SegmentedField },
  { name: "select", ctor: Select },
  { name: "slide-range", ctor: SlideRange },
  { name: "skeleton", ctor: Skeleton },
  { name: "switch", ctor: Switch },
  { name: "tag", ctor: Tag },
  { name: "tab", ctor: Tab },
  { name: "tabs", ctor: Tabs },
  { name: "tooltip", ctor: Tooltip },
  { name: "toast", ctor: Toast },
  { name: "toast-content", ctor: ToastContent },
  { name: "toolbar", ctor: Toolbar },
];

function defineOnce(tag: string, ctor: CustomElementConstructor) {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}

class Toife {
  public options: Required<SubscribeOptions>;

  constructor(options?: SubscribeOptions) {
    this.options = {
      name: options?.name || defaultAppName,
      prefix: options?.prefix || "t-",
    };
  }

  /** Register every Toife custom element with the configured prefix. */
  subscribeAll() {
    const prefix = this.options.prefix;
    for (const { name, ctor } of REGISTRY) {
      defineOnce(prefix + name, ctor);
    }
    return this;
  }

  /** Register a single custom element (without prefix applied twice). */
  subscribe(name: string, component: CustomElementConstructor) {
    defineOnce(this.options.prefix + name, component);
    return this;
  }

  preventDefault() {
    preventDefault();
    return this;
  }
}

/**
 * Create a Toife Lit instance and optionally register components.
 *
 * @example
 * ```ts
 * import { createToife } from "@toife/lit";
 * import "@toife/lit/styles/index.css";
 *
 * createToife().subscribeAll();
 * ```
 */
export const createToife = (options?: SubscribeOptions) => {
  const instance = new Toife(options);
  apps[instance.options.name] = instance;
  return instance;
};

export const useApp = (name: string = defaultAppName) => {
  return apps[name] || null;
};

export const getApps = () => {
  return apps;
};
