# @toife/vue

Vue 3 component library for Toife. The package ships **source** (`src/`): your app bundles it and compiles Sass with your own configuration.

## Documentation

Tài liệu sử dụng component: **[docs/README.md](docs/README.md)** (cài đặt: [docs/common.md](docs/common.md)).

## Requirements

| Package | Notes |
|---------|--------|
| `vue` ^3.5 | Required |
| `vue-router` ^4 | Required when using route-related components |
| `@toife/gesture` | Gestures |
| `@toife/sass-layer` | Component SCSS uses `@use`; install in the app and configure Sass (e.g. Vite `css.preprocessorOptions`) |

## Installation

```bash
npm install @toife/vue
# or
yarn add @toife/vue
```

Install any missing peer dependencies if npm/yarn reports them.

## Global registration (plugin)

`createToife()` registers most components as **kebab-case** tags with the default prefix `t-`.

```ts
// main.ts
import { createApp } from "vue";
import { createToife } from "@toife/vue";
import App from "./App.vue";

const app = createApp(App);
app.use(createToife()); // prefix "t-" → <t-app>, <t-button>, …
app.mount("#app");
```

```vue
<!-- Example: default prefix "t-" -->
<template>
  <t-app>
    <t-page>
      <t-toolbar />
      <t-container>
        <t-button>OK</t-button>
      </t-container>
    </t-page>
  </t-app>
</template>
```

### `createToife` options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `prefix` | `string` | `"t-"` | Tag name prefix (e.g. `my-` → `<my-button>`) |

## Tags after `app.use(createToife())`

The default prefix is `t-`. The **Tag** column is `prefix` + name (e.g. `t-button`).

| Tag (prefix `t-`) | Component |
|-------------------|-----------|
| `t-app` | App |
| `t-action` | Action |
| `t-avatar` | Avatar |
| `t-button` | Button |
| `t-cable` | Cable |
| `t-card` | Card |
| `t-card-body` | CardBody |
| `t-card-header` | CardHeader |
| `t-card-footer` | CardFooter |
| `t-checkbox` | Checkbox |
| `t-radio` | Radio |
| `t-radio-group` | RadioGroup |
| `t-collapse` | Collapse |
| `t-container` | Container |
| `t-decision-modal` | DecisionModal |
| `t-divider` | Divider |
| `t-field` | Field |
| `t-form-group` | FormGroup |
| `t-gesture-indicator` | GestureIndicator |
| `t-image` | Image |
| `t-modal` | Modal |
| `t-page` | Page |
| `t-present` | Present |
| `t-refresher` | Refresher |
| `t-route-navigator` | RouteNavigator |
| `t-route-wrapper` | RouteWrapper |
| `t-route-provider` | RouteProvider |
| `t-route-outlet` | RouteOutlet |
| `t-segmented-field` | SegmentedField |
| `t-skeleton` | Skeleton |
| `t-switch` | Switch |
| `t-tabs` | Tabs |
| `t-toast` | Toast |
| `t-toast-content` | ToastContent |
| `t-toolbar` | Toolbar |

### Components not registered by the plugin

These are **still exported** from `@toife/vue` but are **not** included in `createToife().install` — import them directly and call `app.component(...)` yourself if you need globals:

- `Tab` — used inside `Tabs`; `import { Tab, Tabs } from "@toife/vue"`.
- `OutlineField` — `import { OutlineField } from "@toife/vue"`.

```ts
import { Tab, OutlineField } from "@toife/vue";

app.component("t-tab", Tab);
app.component("t-outline-field", OutlineField);
```

Or use them only in SFCs: `import { Tab } from "@toife/vue"` and register locally / use in a parent template.

## Named imports (without the plugin)

You can always import components and register them manually or use them locally:

```vue
<script setup lang="ts">
import { Button, App, RouteNavigator, RouteWrapper } from "@toife/vue";
</script>

<template>
  <App>
    <RouteWrapper>
      <RouteNavigator variant="swipe" />
    </RouteWrapper>
  </App>
</template>
```

Public exports are defined in `src/index.ts` (factory, re-exported `./components`, and `utils`).

## Vue Router

`RouteNavigator`, `RouteWrapper`, `RouteProvider`, and `RouteOutlet` expect `vue-router` to be installed and configured in your app.

## TypeScript

The package includes `*.vue` declarations via the entry; if your IDE still complains about `.vue` modules, add this to your project (Vite):

```ts
// env.d.ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

## Utilities

```ts
import { utils } from "@toife/vue";
// utils.* — see exports under src/utils
```

See [src/utils/element.md](src/utils/element.md), [src/utils/events.md](src/utils/events.md), [src/utils/style.md](src/utils/style.md) and `src/utils/*.ts` for concrete APIs.

## Sass / theming

Component styles use `@use "@toife/sass-layer"` and SCSS under `src`. Configure **sass-embedded** / **sass** and any aliases in **your** app so tokens, layers, and variables resolve when you build.

## License

MIT
