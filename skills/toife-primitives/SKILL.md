---
name: toife-primitives
description: >-
  Use Toife primitive components: t-button, t-avatar, t-image, t-tag, t-skeleton,
  t-gesture-indicator. Use when adding CTAs, avatars, status chips, placeholders,
  images, or sheet drag handles.
---

# Toife primitives

Core types: `@toife/components/core/features/{button,avatar,image,tag,skeleton,gesture-indicator}`.

Theme (`role`, `shape`, `size`) falls back to `t-app` except `t-image`.

## Button — `t-button`

Use instead of `<button>`. Native `@click` only (no custom emit).

```vue
<t-button variant="fill" size="large" :loading="saving" @click="save">Save</t-button>
<t-button variant="outline" block role="danger">Delete</t-button>
<t-button variant="text" @click="cancel">Cancel</t-button>
```

| Prop | Default | Notes |
|------|---------|-------|
| `variant` | `fill` | `fill` \| `outline` \| `text` |
| `size` | `standard` | `small` \| `standard` \| `large` |
| `block` | `false` | Full width |
| `loading` | `false` | Shows loader slot |
| `role` | App | `primary`, `danger`, `mode`, `reverse`, … |
| `shape` | App | |

Slot: default label. Slot `loading` for custom spinner.

Lamtoi: primary CTA is often `block size="large"`; header back is `variant="text"`; sidebar icons toggle `role` between `mode` and `reverse`.

## Avatar — `t-avatar`

```vue
<t-avatar size="32px" shape="pill" :src="user.avatar">{{ initials }}</t-avatar>
<t-avatar size="72px" shape="pill">{{ avatarLabel }}</t-avatar>
```

Props: `src`, `size` (string or number), `shape`, `role`, `divider`. Default slot = fallback (initials).

## Image — `t-image`

```vue
<t-image :src="url" :default-src="fallbackUrl" />
```

Does **not** inject App. `defaultSrc` is the error/empty fallback.

## Tag — `t-tag`

Status / count chip. Same variants as Button.

```vue
<t-tag role="danger" size="small">{{ count }}</t-tag>
<t-tag :role="statusRole" size="small">{{ status }}</t-tag>
```

Lamtoi status map: `active → success`, `upcoming → warning`, else `primary`.

| Prop | Default |
|------|---------|
| `variant` | `fill` (`outline` \| `text`) |
| `size` | `standard` |
| `role`, `shape` | Theme |

## Skeleton — `t-skeleton`

Loading placeholder.

```vue
<t-skeleton width="120px" height="16px" />
<t-skeleton :width="64" :height="64" shape="pill" />
```

Props: `width`, `height` (string or number), `role`, `shape`.

## Gesture indicator — `t-gesture-indicator`

Drag handle for sheets. Modal already renders one when `indicator` is true. Use only with custom `t-present`.

Props: `placement`, `role`.
