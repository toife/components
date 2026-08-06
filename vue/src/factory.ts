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
import { type SubscribeOptions } from "./types";
import { DefineComponent, ref, type App as VueApp } from "vue";
import { preventDefault } from "@/core";

const apps = ref<Record<string, any>>({});
const defaultAppName = "toife";

class Toife {
  /**
   * Subscribe options
   */
  public options: SubscribeOptions;
  public app: VueApp;

  /**
   * Constructor
   */
  constructor(app: VueApp, options?: SubscribeOptions) {
    this.options = {
      name: options?.name || defaultAppName,
      prefix: options?.prefix || "t-",
    };

    this.app = app;
  }

  /**
   * Subscribe components
   */
  subscribeAll() {
    const prefix = this.options.prefix;
    this.app.component(prefix + "app", App);
    this.app.component(prefix + "action", Action);
    this.app.component(prefix + "avatar", Avatar);
    this.app.component(prefix + "button", Button);
    this.app.component(prefix + "cable", Cable);
    this.app.component(prefix + "card", Card);
    this.app.component(prefix + "card-body", CardBody);
    this.app.component(prefix + "card-header", CardHeader);
    this.app.component(prefix + "card-footer", CardFooter);
    this.app.component(prefix + "checkbox", Checkbox);
    this.app.component(prefix + "radio", Radio);
    this.app.component(prefix + "radio-group", RadioGroup);
    this.app.component(prefix + "collapse", Collapse);
    this.app.component(prefix + "container", Container);
    this.app.component(prefix + "decision-modal", DecisionModal);
    this.app.component(prefix + "divider", Divider);
    this.app.component(prefix + "dropdown", Dropdown);
    this.app.component(prefix + "field", Field);
    this.app.component(prefix + "flex", Flex);
    this.app.component(prefix + "flex-item", FlexItem);
    this.app.component(prefix + "form-group", FormGroup);
    this.app.component(prefix + "gesture-indicator", GestureIndicator);
    this.app.component(prefix + "grid", Grid);
    this.app.component(prefix + "grid-item", GridItem);
    this.app.component(prefix + "image", Image);
    this.app.component(prefix + "modal", Modal);
    this.app.component(prefix + "page", Page);
    this.app.component(prefix + "present", Present);
    this.app.component(prefix + "refresher", Refresher);
    this.app.component(prefix + "route-navigator", RouteNavigator);
    this.app.component(prefix + "route-wrapper", RouteWrapper);
    this.app.component(prefix + "route-provider", RouteProvider);
    this.app.component(prefix + "route-outlet", RouteOutlet);
    this.app.component(prefix + "scrollbar", Scrollbar);
    this.app.component(prefix + "segmented-field", SegmentedField);
    this.app.component(prefix + "select", Select);
    this.app.component(prefix + "slide-range", SlideRange);
    this.app.component(prefix + "skeleton", Skeleton);
    this.app.component(prefix + "switch", Switch);
    this.app.component(prefix + "tag", Tag);
    this.app.component(prefix + "tab", Tab);
    this.app.component(prefix + "tabs", Tabs);
    this.app.component(prefix + "tooltip", Tooltip);
    this.app.component(prefix + "toast", Toast);
    this.app.component(prefix + "toast-content", ToastContent);
    this.app.component(prefix + "toolbar", Toolbar);
  }

  /**
   * Subscribe a component
   */
  subscribe(name: string, component: DefineComponent<{}, {}, any>) {
    if (!this.app.component(this.options.prefix + name)) {
      this.app.component(this.options.prefix + name, component);
    }
  }

  /**
   * Prevent default behavior
   */
  preventDefault() {
    preventDefault();
  }
}

/**
 * Subscribe components
 */
export const createToife = (app: VueApp, options?: SubscribeOptions) => {
  const instance = new Toife(app, options);
  apps.value[instance.options.name] = instance;
  return instance;
};

/**
 * Get component name
 */
export const useApp = (name: string = defaultAppName) => {
  return apps.value[name] || null;
};

/**
 * Get all apps
 */
export const getApps = () => {
  return apps.value;
};
