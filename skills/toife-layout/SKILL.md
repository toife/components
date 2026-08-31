---
name: toife-layout
description: >-
  Build Toife app shell and layout: t-app, t-page, t-container, t-flex, t-grid,
  t-card, t-cable, t-toolbar, t-divider, t-scrollbar. Use when creating pages,
  headers, tab bars, cards, responsive grids, or sticky footers.
---

# Toife layout

Core types: `@toife/components/core/features/{app,page,container,layout,card,cable,toolbar,divider,scrollbar}`.

## App — `t-app`

Root shell. Provides theme (`shape`, `role`, `divider`, `triple`, `direction`, `rootEl`). Hosts Toast / Action / DecisionModal.

| Prop | Default | Notes |
|------|---------|-------|
| `shape` | `pill` | Theme corners |
| `role` | `mode` | Theme color |
| `divider` | `false` | |
| `triple` | `false` | |
| `direction` | `left` | `left` \| `right` |
| `data` | `{}` | Extra app bag |

Slots: default, `global`.

```vue
<t-app :shape="themeStore.shape" :divider="themeStore.divider"
  :shadow="themeStore.shadow" :direction="themeStore.direction">
  <t-route-wrapper>
    <t-route-navigator variant="swipe" />
  </t-route-wrapper>
</t-app>
```

Children inherit `shape` / `role` unless overridden.

## Page / Container — `t-page`, `t-container`

No props. Optional wrappers. Lamtoi often skips them and puts content directly under the route view + headers.

## Flex — `t-flex` / `t-flex-item`

**Only** `options: FlexOption[]`. There is no `direction` / `gap` prop.

```vue
<t-flex :options="[
  { direction: 'row', gap: 12, align: 'center' },
  { breakpoint: 'md', direction: 'column' },
]">
  <t-flex-item :options="[{ grow: 1 }]">…</t-flex-item>
  <t-flex-item :options="[{ shrink: 0 }]">…</t-flex-item>
</t-flex>
```

`FlexOption`: `breakpoint?`, `gap`, `direction` (`row` \| `column` \| `*-reverse`), `wrap`, `justify`, `align`.

`FlexItemOption`: `breakpoint?`, `grow`, `shrink`, `basis`, `order`.

Empty / omitted `breakpoint` = base. `number` gaps become `px`.

## Grid — `t-grid` / `t-grid-item`

Same `options` pattern.

```vue
<t-grid :options="[{ gap: 8, columns: '1fr 1fr' }, { breakpoint: 'md', gap: 16, columns: 'repeat(3, 1fr)' }]">
  <t-grid-item v-for="item in items" :key="item.id" :options="[{ column: 1 }]">
    <t-card>…</t-card>
  </t-grid-item>
</t-grid>
```

`GridOption`: `gap`, `columns`, `rows`, `autoFlow`.

`GridItemOption`: `row`, `column`, `justify` / `align` (`start` \| `end` \| `center` \| `stretch`).

## Card — `t-card`

| Prop | Notes |
|------|--------|
| `role`, `shape`, `divider` | Provide to header/footer |

```vue
<t-card>
  <t-card-header>Title</t-card-header>
  <t-card-body>
    …
    <t-divider />
    …
  </t-card-body>
  <t-card-footer>Actions</t-card-footer>
</t-card>
```

Header/body/footer have no own props. Body does not inject card state; header/footer do.

## Cable + Toolbar — sticky chrome

Safe-area rail + bar. Match `placement`.

| Cable | `keyboard?`, `placement` (`top` \| `bottom` \| `left` \| `right`) |
| Toolbar | `placement`, `safe?`, `role?`, `divider?` |

```vue
<!-- Top header -->
<t-cable placement="top">
  <t-toolbar>
    <t-button variant="text" @click="back">Back</t-button>
    <div class="header-title">Title</div>
  </t-toolbar>
</t-cable>

<!-- Bottom primary action -->
<t-cable placement="bottom">
  <t-toolbar>
    <t-button block size="large" :loading="submitting" @click="save">Save</t-button>
  </t-toolbar>
</t-cable>
```

Tab bar / sidebar in Lamtoi use the same pair (`placement="bottom"` or `"left"`).

## Divider — `t-divider`

`direction`: `horizontal` (default) \| `vertical`. Optional `role`.

## Scrollbar — `t-scrollbar`

Owns the scrollport. Parent needs a **definite height**.

| Prop | Default |
|------|---------|
| `direction` | `vertical` (`horizontal` \| `both`) |
| `size` | `10` (gutter px) |
| `thumbSize` | `6` |
| `minThumb` | `24` |
| `autoHide` | `true` |
| `hideDelay` | `500` |

Emits `scroll`. Expose: `scrollport`, `update()`, `metrics`.

```vue
<t-scrollbar direction="vertical" class="fill-parent">
  <div>long content</div>
</t-scrollbar>
```
