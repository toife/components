# RadioGroup (`t-radio-group`)

## Mô tả

Nhóm radio v-model.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const size = ref("m");
</script>

<template>
  <t-radio-group v-model="size" variant="outline" direction="horizontal">
    <t-radio value="s">S</t-radio>
    <t-radio value="m">M</t-radio>
    <t-radio value="l">L</t-radio>
  </t-radio-group>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string` hoặc `number` | — |  |
| `role` | `string` | — |  |
| `variant` | `RadioVariant` | — |  |
| `disabled` | `boolean` | — |  |
| `readonly` | `boolean` | — |  |
| `shadow` | `boolean` | — |  |
| `direction` | `'horizontal'` hoặc `'vertical'` | — |  |

## Events (emit)

- **`update:modelValue`** — `string | number`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `RADIO_GROUP_PROVIDER_STATE_KEY` — `modelValue`, `role`, `variant`, `disabled`, `readonly`, `shadow`, `setValue(val)`

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### Provide `RadioGroupProviderState`

[types.md — RadioGroupProviderState](./types.md#radiogroupproviderstate).

`Radio` con gọi `setValue(value)` khi chọn; đọc `modelValue`, `disabled`, `readonly`, `variant` từ provider.
