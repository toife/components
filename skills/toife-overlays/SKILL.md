---
name: toife-overlays
description: >-
  Build Toife overlays: t-modal, t-present, t-action, t-decision-modal, t-toast,
  t-dropdown, t-tooltip, useAction, useDecisionModal, useToast. Use when adding
  dialogs, sheets, confirms, toasts, menus, or hover tooltips.
---

# Toife overlays

Core types: `@toife/components/core/features/{present,modal,action,decision-modal,toast,dropdown,tooltip}`.

Must be under `t-app` (teleport target + composables). `t-app` already mounts all toast placements, Action, and DecisionModal.

## Control model

| API | How to open/close |
|-----|-------------------|
| Modal, Present | `:visible` + `@close` — **not** `v-model` |
| Action, DecisionModal, Toast | Prefer composable `.open()` |
| Dropdown | `v-model` boolean |
| Tooltip | hover/focus; no v-model |

## Modal — `t-modal`

Sheet / dialog on Present, with gesture dismiss.

```vue
<t-modal
  :visible="visible"
  :placement="isMobile ? 'bottom' : 'center'"
  :gesture="isMobile"
  :indicator="isMobile"
  @close="close"
>
  <div class="padding-2">…</div>
</t-modal>
```

| Prop | Default | Notes |
|------|---------|-------|
| `visible` | `false` | |
| `placement` | `bottom` | `top` \| `left` \| `right` \| `center` \| `bottom` |
| `gesture` | `true` | Drag to dismiss |
| `indicator` | `true` | Handle; often `false` on side drawers |
| `fullscreen` | `false` | |
| `keepalive` | `true` | |
| `backdrop` | `display` | `display` \| `none` \| `transparent` |
| `duration` | `200` | ms |
| `shape` | | Use `flat` for edge-to-edge drawers |

Gesture axis follows `placement` (`center` fades). Side drawer example:

```vue
<t-modal :visible="open" placement="right" shape="flat" :gesture="isMobile" :indicator="false" @close="close">
  …
</t-modal>
```

## Present — `t-present`

Low-level overlay. Use Modal unless you need custom chrome.

Props: `visible`, `keepalive`, `backdrop`, `placement`, `duration`, `bounce`, `teleport`. Expose: `open()`, `close()`, `render(RenderOptions)`. Emits `close`.

## Action sheet — `useAction()`

Grouped buttons. **`actions` is `ActionButton[][]`** (outer = groups).

```ts
import { useAction } from "@toife/vue";

const action = useAction();
action.open({
  placement: "bottom",
  dismiss: ["backdrop"],
  actions: [
    [{ text: "Take photo" }, { text: "Library" }],
    [{ text: "Cancel", variant: "text", role: "danger" }],
  ],
  onChoose: (btn) => { /* btn.text / btn.data */ },
  onClose: (type) => {},
});
```

`ActionButton`: `text`, `role`, `variant` (`fill` \| `outline` \| `text`), `handler?`, `data?`.

Backdrop closes only if listed in `dismiss`. Call `action.close()` from a handler if needed.

## Confirm — `useDecisionModal()`

Flat `actions: DecisionModalButton[]` (not grouped). `message` is required.

```ts
import { useDecisionModal } from "@toife/vue";

const decisionModal = useDecisionModal();
decisionModal.open({
  title: t("profile.logoutTitle"),
  message: t("profile.logoutMessage"),
  direction: "row",
  actions: [
    { text: t("common.logout"), role: "danger", variant: "fill", handler: () => void confirmLogout() },
    { text: t("common.cancel"), variant: "text" },
  ],
});
```

`direction`: `row` \| `column`.

## Toast — `useToast()`

`t-app` already mounts every placement. Do not add extra `<t-toast>` tags.

```ts
import { useToast } from "@toife/vue";

const toast = useToast();
toast.open({
  message: "Saved",
  duration: 3000,
  placement: "bottom-center",
  variant: "fill",
  role: "success",
});
```

`placement`: `bottom-start` \| `bottom-center` \| `bottom-end` \| `top-start` \| `top-center` \| `top-end`.

`variant`: `fill` \| `text`.

## Dropdown — `t-dropdown`

```vue
<t-dropdown v-model="open" placement="bottom-end">
  <template #trigger="{ toggle, isOpen }">
    <t-button variant="outline" @click="toggle">Menu</t-button>
  </template>
  <t-button variant="text" block @click="open = false">Item</t-button>
</t-dropdown>
```

`placement`: `bottom-start` \| `bottom-end` \| `top-start` \| `top-end`. Closes on outside click / Escape.

## Tooltip — `t-tooltip`

Default slot = trigger. `#content` = bubble. Show on hover/focus.

```vue
<t-tooltip placement="right">
  <t-button role="reverse">…</t-button>
  <template #content>Label</template>
</t-tooltip>
```

`placement`: `top` \| `left` \| `right` \| `bottom`. `disabled` skips the bubble.
