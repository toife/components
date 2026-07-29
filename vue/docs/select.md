# Select (`t-select`)

## Mô tả

Chọn từ danh sách `options`.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const city = ref("hn");
const cities = [
  { label: "Hà Nội", value: "hn" },
  { label: "TP.HCM", value: "hcm" },
  { label: "Đà Nẵng", value: "dn", disabled: true },
];
</script>

<template>
  <t-select
    v-model="city"
    :options="cities"
    placeholder="Chọn thành phố"
    variant="outline"
    @select="(opt) => console.log(opt)"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string` | — |  |
| `name` | `string` | — |  |
| `variant` | `FieldVariant` | — |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |
| `size` | `FieldSize` | — |  |
| `shadow` | `boolean` | — |  |
| `direction` | `AppDirection` | — |  |
| `id` | `string` | — |  |
| `value` | `string` | — |  |
| `placeholder` | `string` | — |  |
| `disabled` | `boolean` | — |  |
| `autocomplete` | `string` | — |  |
| `tabindex` | `number` hoặc `string` | — |  |
| `line` | `number` hoặc `string` | — |  |
| `maxLine` | `number` hoặc `string` | — |  |
| `message` | `string` | — |  |
| `help` | `string` | — |  |
| `options` | `SelectOption[]` | — | Bắt buộc — xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |

## Events (emit)

- **`update:modelValue`** — `string`
- **`select`** — `SelectOption`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### `options: SelectOption[]` (bắt buộc)

[types.md — SelectOption](./types.md#selectoption).

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `value` | `string` | Có | Giá trị `modelValue` |
| `label` | `string` | Không | Text hiển thị |
| `disabled` | `boolean` | Không | Vô hiệu mục |

Emit **`select`** trả về cả object `SelectOption` vừa chọn.
