# SegmentedField (`t-segmented-field`)

## Mô tả

Nhiều ô input (OTP).


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const otp = ref<string[]>([]);
</script>

<template>
  <t-segmented-field
    v-model="otp"
    :length="6"
    variant="outline"
    message="Nhập đủ 6 số"
    @complete="onOtpComplete"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string[]` | — |  |
| `value` | `string[]` | — |  |
| `length` | `number` | — |  |
| `variant` | `SegmentedFieldVariant` | — |  |
| `size` | `SegmentedFieldSize` | — |  |
| `disabled` | `boolean` | — |  |
| `readonly` | `boolean` | — |  |
| `type` | `string` | — |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |
| `shadow` | `boolean` | — |  |
| `message` | `string` | — |  |
| `help` | `string` | — |  |
| `pattern` | `string[]` | — |  |
| `direction` | `AppDirection` | — |  |

## Events (emit)

- **`update:modelValue`** — `string[]`
- **`complete`** — `string[]`
- **`focus`** — `FocusEvent`
- **`blur`** — `FocusEvent`
- **`input`** — `string[]`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### `pattern: string[]`

Mảng pattern (regex hoặc ký tự cho phép) cho từng ô — tùy implementation input; dùng validate từng segment.

### `modelValue` / `value: string[]`

Mỗi phần tử = nội dung một ô. `length` giới hạn số ô (nếu set).
