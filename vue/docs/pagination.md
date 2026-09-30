# Pagination (`t-pagination`)

## Mô tả

Thanh phân trang: nút trước/sau, danh sách trang, rút gọn bằng dấu `…` khi có nhiều trang. Mỗi trang render bằng `t-button` nên ăn theo theme (`role`, `shape`, `size`) của App.

## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const page = ref(1);
</script>

<template>
  <t-pagination v-model="page" :length="20" @change="fetchPage" />

  <!-- Nhiều trang lân cận hơn, nút dạng outline -->
  <t-pagination v-model="page" :length="50" :siblings="2" variant="outline" />

  <!-- Tuỳ biến icon -->
  <t-pagination v-model="page" :length="10">
    <template #prev><Icon name="chevron-left" /></template>
    <template #next><Icon name="chevron-right" /></template>
  </t-pagination>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `number` | — | Trang hiện tại (bắt đầu từ 1) |
| `value` | `number` | — | Giá trị khởi tạo khi không dùng `v-model` |
| `length` | `number` | `1` | Tổng số trang |
| `siblings` | `number` | `1` | Số trang hiển thị mỗi bên trang hiện tại |
| `boundaries` | `number` | `1` | Số trang luôn hiển thị ở đầu/cuối |
| `variant` | `'fill'`, `'outline'`, `'text'` | `text` | Variant của các nút không active |
| `activeVariant` | `'fill'`, `'outline'`, `'text'` | `fill` | Variant của trang đang chọn |
| `size` | `PaginationSize` | `standard` |  |
| `role` | `string` | — | Fallback từ App |
| `shape` | `string` | — | Fallback từ App |
| `disabled` | `boolean` | `false` |  |
| `controls` | `boolean` | `true` | Hiển thị nút trước/sau |
| `direction` | `AppDirection` | — | `right` đảo chiều hiển thị. Fallback từ App |

## Events (emit)

- **`update:modelValue`** — `number`
- **`change`** — `number` (chỉ emit khi trang thực sự thay đổi)

## Slots

- **`prev`** / **`next`** — nội dung nút trước/sau (mặc định `‹` / `›`)
- **`page`** — `{ page: number, active: boolean }`
- **`ellipsis`** — nội dung dấu rút gọn (mặc định `…`)

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### `getPaginationItems(options)` (core)

Hàm thuần tính danh sách item hiển thị, dùng lại được ở adapter khác:

```ts
getPaginationItems({ current: 5, length: 10, siblings: 1, boundaries: 1 });
// 1 … 4 5 6 … 10
```

Trả về `PaginationItem[]` = `{ type: "page", page } | { type: "ellipsis", key }`. Số item luôn cố định (`boundaries * 2 + siblings * 2 + 3`) khi `length` lớn hơn con số đó, nên thanh phân trang không bị nhảy độ rộng.
