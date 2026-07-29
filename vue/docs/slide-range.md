# SlideRange (`t-slide-range`)

## Mô tả

Thanh trượt số.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const leverage = ref(10);
</script>

<template>
  <t-slide-range
    v-model="leverage"
    :min="1"
    :max="125"
    :step="1"
    unit="x"
    @change="onChange"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string` hoặc `number` | — |  |
| `min` | `number` | — |  |
| `max` | `number` | — |  |
| `step` | `number` | — |  |
| `unit` | `string` | — |  |
| `disabled` | `boolean` | — |  |
| `readonly` | `boolean` | — |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |

## Events (emit)

- **`update:modelValue`** — `string`
- **`change`** — `string`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
