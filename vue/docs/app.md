# App (`t-app`)

## Mô tả

Shell gốc của ứng dụng: theme (shape, role, shadow, direction), slot nội dung và `global`, tích hợp sẵn Toast/Action/DecisionModal qua composable.



## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { useAction, useToast } from "@toife/vue";

const action = useAction();
const toast = useToast();

function openSheet() {
  action.open({
    actions: [[{ text: "Hủy", variant: "text", handler: () => action.close() }]],
    dismiss: ["backdrop"],
  });
}
</script>

<template>
  <t-app shape="pill" role="mode" direction="left">
    <t-page>
      <t-button @click="openSheet">Mở action</t-button>
    </t-page>
    <template #global />
  </t-app>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `shape` | `string` | `pill` | Bo góc theme |
| `divider` | `boolean` | `false` | Divider theme |
| `role` | `string` | `mode` | Role theme |
| `shadow` | `boolean` | `false` | Shadow theme |
| `triple` | `boolean` | `false` | Triple theme |
| `direction` | `'left'` hoặc `'right'` | `left` | Hướng layout |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `APP_PROVIDER_STATE_KEY` (`"app-state"`)

**State (`AppProviderState`):** `shape`, `divider`, `role`, `shadow`, `triple`, `direction` (Ref); `rootEl` (Ref HTMLElement — teleport target).

## Composable trong App

- `useAction()`, `useDecisionModal()`, `useToast()`

## Slot

- default — nội dung
- `global` — overlay toàn cục

## Chi tiết kiểu dữ liệu

### Provide `AppProviderState`

[types.md — AppProviderState](./types.md#appproviderstate).

Các component con inject `APP_PROVIDER_STATE_KEY` để lấy `shape`, `role`, `shadow`, `divider`, `direction`, `rootEl` (teleport).
