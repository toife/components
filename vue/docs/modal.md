# Modal (`t-modal`)

## Mô tả

Modal trên Present; gesture đóng.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const show = ref(false);
</script>

<template>
  <t-button @click="show = true">Mở modal</t-button>
  <t-modal
    :visible="show"
    placement="bottom"
    :gesture="true"
    :indicator="true"
    backdrop="display"
    @close="show = false"
  >
    <div class="padding-2">Nội dung modal</div>
  </t-modal>
</template>
```

> Lưu ý: prop là `visible`, không phải `v-model` — dùng `:visible` + `@close`.

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `role` | `string` | — |  |
| `class` | `unknown` | — |  |
| `visible` | `boolean` | `false` |  |
| `gesture` | `boolean` | `true` |  |
| `fullscreen` | `boolean` | `false` |  |
| `placement` | `top`, `left`, `right`, `center`, `bottom` | `bottom` |  |
| `keepalive` | `boolean` | `true` |  |
| `backdrop` | `display`, `none`, `transparent` | `display` |  |
| `shape` | `string` | — |  |
| `indicator` | `boolean` | `true` |  |
| `duration` | `number` | `200` | ms |
| `bounce` | `number` hoặc `string` | `0` |  |
| `style` | `unknown` | — |  |

## Events (emit)

- **`close`** — `type?: string`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

Bọc **`Present`** — các prop `placement`, `backdrop`, `keepalive`, `duration`, `bounce` giống Present.

| `placement` | Hành vi đóng gesture |
|-------------|---------------------|
| `bottom` | Kéo xuống |
| `top` | Kéo lên |
| `left` / `right` | Kéo ngang |
| `center` | Fade (opacity) |
