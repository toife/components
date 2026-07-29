# Switch (`t-switch`)

## Mô tả

Công tắc.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const enabled = ref(true);
</script>

<template>
  <t-switch v-model="enabled" size="standard" :bounce="8" />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `boolean` | — |  |
| `role` | `string` | — |  |
| `size` | `SwitchSize` | — |  |
| `shape` | `string` | — |  |
| `disabled` | `boolean` | — |  |
| `readonly` | `boolean` | — |  |
| `shadow` | `boolean` | — |  |
| `bounce` | `number` hoặc `string` | — |  |

## Events (emit)

- **`update:modelValue`** — `boolean`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
