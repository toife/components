---
name: toife-components
description: >-
  Use Toife UI components (@toife/vue, @toife/lit) that wrap @toife/components/core.
  Use when building or editing Vue/Lit UI, templates with t-* tags, theme (role/shape/variant),
  createToife, or when choosing between native HTML and Toife components.
---

# Toife components

Toife is a design-system. **Do not** invent native `<button>`, `<input>`, `<select>`, `<progress>`, or ad-hoc sheets when a Toife tag exists.

Types, defaults, attr builders, and SCSS live in `@toife/components/core`. Vue (`@toife/vue`) and Lit (`@toife/lit`) only adapt that core.

## Pick a skill

| Need | Skill |
|------|--------|
| Shell, layout, cards, chrome | `toife-layout` |
| Forms and controls | `toife-forms` |
| Modal, toast, action, dropdown | `toife-overlays` |
| Router stack, tabs, refresh | `toife-navigation` |
| Button, avatar, tag, image, progress | `toife-primitives` |

Read the matching skill **before** writing markup.

## Tag prefix: `t-` (not `toife-`)

Registered tags are always **`t-` + kebab name**. Never `toife-`, `tf-`, or another prefix.

| Wrong | Right |
|-------|--------|
| `<toife-button>` | `<t-button>` |
| `<toife-app>` | `<t-app>` |
| `<tf-field>` | `<t-field>` |

Custom subscribe uses the same prefix: `toife.subscribe("back-header", Comp)` → `<t-back-header>`.

`createToife(app)` already sets `prefix: "t-"`. Do not pass `prefix: "toife-"`.

## Vue setup (Lamtoi / `@toife/vue`)

Register once:

```ts
import { createToife } from "@toife/vue";

const toife = createToife(vueApp);
toife.subscribeAll();
toife.subscribe("back-header", BackHeaderComponent); // custom → <t-back-header>
```

Import composables from `@toife/vue`: `useAction`, `useDecisionModal`, `useToast`, `useRouteWrapper`, `useFullscreen`.

Named imports (no prefix) also work: `import { Button, Field } from "@toife/vue"`.

## Lit setup (`@toife/lit`)

```ts
import { createToife } from "@toife/lit";
import "@toife/lit/styles/index.css";

createToife().subscribeAll();
```

Light DOM. Form events are `CustomEvent` (`event.detail`). Same tags as Vue.

## Theme tokens (inherited from `t-app`)

Most components inject `APP_PROVIDER_STATE_KEY` (`"app-state"`) and fall back to App for:

| Token | Typical values | Meaning |
|-------|----------------|---------|
| `role` | `mode`, `primary`, `danger`, `success`, `warning`, `reverse` | Color |
| `shape` | `pill`, `flat` (plus theme shapes) | Corner radius |
| `variant` | `fill`, `outline`, `text` (fields also `underline`) | Chrome |
| `size` | `small`, `standard`, `large`, or CSS (`32px`) | Scale |

Override on the component when needed (`role="danger"`). Do not hard-code colors that the theme already maps via `role`.

## Shell

Wrap the app in `t-app`. Theme + overlay composables require it. `t-app` already mounts toasts, Action, and DecisionModal.

```vue
<t-app :shape="themeStore.shape" :direction="themeStore.direction">
  <t-route-wrapper>
    <t-route-navigator variant="swipe" />
  </t-route-wrapper>
</t-app>
```

Page chrome pattern used in Lamtoi:

```vue
<t-back-header>Title</t-back-header>
<!-- scrollable content -->
<t-cable placement="bottom">
  <t-toolbar>
    <t-button block size="large" :loading="saving" @click="save">Save</t-button>
  </t-toolbar>
</t-cable>
```

## Binding rules

| Pattern | Components |
|---------|------------|
| `v-model` | Field, Select, Checkbox, Switch, RadioGroup, Tabs, Collapse, Dropdown, SlideRange, SegmentedField |
| `:visible` + `@close` | Modal, Present, Action, DecisionModal — **never** `v-model` |
| Native `@click` | Button (no custom emit) |
| Composable `.open()` | `useAction`, `useDecisionModal`, `useToast` (preferred over declaring the tag) |

## Parent / child

| Parent | Children |
|--------|----------|
| `t-app` | routes/pages; enables overlay composables |
| `t-card` | `t-card-header`, `t-card-body`, `t-card-footer` |
| `t-cable` | `t-toolbar` |
| `t-radio-group` | `t-radio` (required) |
| `t-tabs` | `t-tab`; **panels are your own `v-if`**, not inside Tabs |
| `t-flex` / `t-grid` | `t-flex-item` / `t-grid-item` with `:options` |
| `t-route-wrapper` | `t-route-navigator` |
| `t-dropdown` | `#trigger` + default panel |
| `t-scrollbar` | optional `t-virtual-list` for long lists |

## Source of truth

When unsure about a prop, read the core type — not guess:

`@toife/components/core/features/<name>/<name>.type.ts`

Vue usage examples: `@toife/components/vue/docs/<name>.md`.

## Do not

- Write tags as `<toife-*>` or `<tf-*>`. Always `<t-*>`.
- Pass layout as HTML attrs on `t-flex` (`direction="row"` is ignored). Use `:options`.
- Skip `t-app` then call `useToast` / `useAction` / `useDecisionModal`.
- Re-style with one-off CSS when `role` / `variant` / `size` already exist.
