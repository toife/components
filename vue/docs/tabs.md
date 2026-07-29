# Tabs (`t-tabs`)

## Mô tả

Tab bar + panel.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const tab = ref("favorite");
</script>

<template>
  <t-card>
    <t-tabs v-model="tab" variant="text" placement="top-start">
      <t-tab value="favorite">Yêu thích</t-tab>
      <t-tab value="hot">Hot</t-tab>
    </t-tabs>
    <FamousList v-if="tab === 'favorite'" />
    <HotList v-else />
  </t-card>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `placement` | `TabsPlacement` | — |  |
| `variant` | `fill`, `underline`, `text` | — |  |
| `role` | `string` | — |  |
| `modelValue` | `string` | — | Tab active |
| `border` | `number[]` | — |  |
| `margin` | `number[]` | — |  |
| `shape` | `string` | — |  |
| `transition` | `boolean` | — |  |
| `size` | `TabsSize` | — |  |

## Events (emit)

- **`update:modelValue`** — `string`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `TABS_PROVIDER_STATE_KEY` — `activeValue`, `role`, `shape`, `size`, `setValue(val)`

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### `border: number[]` (mặc định `[2, 0]`)

Dùng cho variant `underline`. [types.md — Tabs border/margin](./types.md#mảng-đặc-biệt--tabs-border--margin).

| Index | Mô tả |
|-------|--------|
| `[0]` | Độ dày gạch chân (px) |
| `[1]` | Chiều rộng highlight (`0` = full tab) |

### `margin: number[]` (mặc định `[0, 0]`)

| Index | Mô tả |
|-------|--------|
| `[0]` | Lề dọc |
| `[1]` | Lề ngang |

### Provide `TabsProviderState`

[types.md — TabsProviderState](./types.md#tabsproviderstate).
