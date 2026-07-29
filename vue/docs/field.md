# Field (`t-field`)

## Mô tả

Input/textarea với message, help.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
</script>

<template>
  <t-field
    v-model="email"
    type="email"
    name="email"
    placeholder="you@example.com"
    variant="outline"
    message="Email không hợp lệ"
    help="Dùng email công ty"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string` hoặc `number` | `""` |  |
| `name` | `string` | — |  |
| `variant` | `FieldVariant` | `outline` |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |
| `size` | `FieldSize` | `standard` |  |
| `shadow` | `boolean` | — |  |
| `direction` | `AppDirection` | — |  |
| `id` | `string` | — |  |
| `value` | `string` hoặc `number` | — |  |
| `placeholder` | `string` | `""` |  |
| `disabled` | `boolean` | `false` |  |
| `readonly` | `boolean` | `false` |  |
| `autocomplete` | `string` | — |  |
| `maxLength` | `number` hoặc `string` | — |  |
| `tabindex` | `number` hoặc `string` | — |  |
| `type` | `FieldType` | `text` | text, number, email, password, tel, url, paragraph |
| `line` | `number` hoặc `string` | `1` |  |
| `maxLine` | `number` hoặc `string` | `1` |  |
| `message` | `string` | `""` |  |
| `help` | `string` | `""` |  |

## Events (emit)

- **`update:modelValue`** — `string`
- **`focus`** — `FocusEvent`
- **`blur`** — `FocusEvent`
- **`input`** — `Event`
- **`beforeinput`** — `Event`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### `type: FieldType`

| Giá trị | Mô tả |
|--------|--------|
| `text` | Input text |
| `number` | Số |
| `email` | Email |
| `password` | Mật khẩu |
| `tel` | Điện thoại |
| `url` | URL |
| `paragraph` | Textarea nhiều dòng (`line`, `maxLine`) |

### `variant: FieldVariant`

`outline` \| `fill` \| `underline` — kiểu viền/nền wrapper.
