---
name: toife-navigation
description: >-
  Build Toife navigation: t-route-wrapper, t-route-navigator, t-route-provider,
  t-route-outlet, t-tabs, t-tab, t-collapse, t-refresher, useRouteWrapper.
  Use when adding vue-router stacks, swipe/fade transitions, tab bars, accordions,
  or pull-to-refresh.
---

# Toife navigation

Core types: `@toife/components/core/features/{route,tabs,collapse,refresher}`.

Requires `vue-router` for route components. Swipe navigator / refresher need `@toife/gesture`.

## Route stack

Typical root (Lamtoi):

```vue
<t-app …>
  <t-route-wrapper>
    <t-route-navigator name="root-navigator" variant="swipe" />
  </t-route-wrapper>
</t-app>
```

Nested layout:

```vue
<main>
  <t-route-navigator name="main-layout-navigator" variant="fade" />
</main>
```

### `t-route-wrapper`

Syncs `route.matched` into a stack. Prop: `homeRouteName` (default `home`).

Composable `useRouteWrapper()` → `stack`, `updateRoutes(matched)`. Used to show chrome only on certain stack tops (e.g. tab bar when top is `"main"`).

### `t-route-navigator`

Must sit under Wrapper/Provider.

| Prop | Default | Notes |
|------|---------|-------|
| `variant` | `none` | `none` \| `swipe` \| `fade` |
| `direction` | | `left` \| `right` \| `up` \| `down` |
| `keepalive` | `false` | |
| `gesture` | | Swipe back |
| `name` | | Distinguish nested navigators |

Emits `transform`: `{ back, prepare, active, backdrop, duration }`.

### `t-route-provider` / `t-route-outlet`

Provider takes required `stack: RouteStack[]`. Wrapper already builds this — do not declare Provider by hand unless customizing.

`RouteStack`: `{ name, component, stack: RouteStack[] }`.

Outlet is internal to Navigator. Rarely used directly.

## Tabs — `t-tabs` + `t-tab`

Tabs are the **bar only**. Render panels with `v-if` / `v-show` beside them.

```vue
<t-tabs v-model="filter" variant="text" placement="top-start">
  <t-tab v-for="item in filters" :key="item" :value="item">{{ item }}</t-tab>
</t-tabs>
<ListA v-if="filter === 'a'" />
<ListB v-else />
```

| Prop | Notes |
|------|--------|
| `modelValue` | Active tab `value` (string) |
| `variant` | `fill` \| `underline` \| `text` |
| `placement` | `top-start`, `top-end`, `bottom-*`, `left-*`, `right-*` |
| `border` | underline: `[thicknessPx, highlightWidth]` default `[2, 0]` (`0` = full tab) |
| `margin` | `[vertical, horizontal]` default `[0, 0]` |
| `transition` | Highlight animation |
| `size`, `role`, `shape` | Theme |

`t-tab`: `value` (required), `disabled?`. Must be inside `t-tabs`.

## Collapse — `t-collapse`

```vue
<t-collapse v-model="open">
  <template #trigger>Toggle</template>
  <div>Hidden content</div>
</t-collapse>
```

Props: `duration`, `role`, `disabled`. Height-animates.

## Refresher — `t-refresher`

No props. Wrap the scrollable list. On `@end`, start loading with `refresh()` and **always** call the returned `done()`.

```vue
<t-refresher @end="onEnd" @move="onMove" @cancel="onCancel">
  <div class="list">…</div>
</t-refresher>
```

```ts
async function onEnd({ refresh }: { refresh: () => () => void }) {
  const done = refresh();
  await load();
  done();
}
```

Also emits `start`, `move` (`{ refresh, offset? }`), `cancel`.

Lamtoi wraps this in subscribed `<t-refresh-logo @refresh="…">` — prefer that in the web app if the header logo animation is required.
