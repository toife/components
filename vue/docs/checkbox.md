# Checkbox (`t-checkbox`)

## Mô tả

Checkbox v-model.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const agreed = ref(false);
</script>

<template>
  <t-checkbox v-model="agreed" variant="outline" size="standard">
    Tôi đồng ý điều khoản
  </t-checkbox>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `boolean` | — |  |
| `role` | `string` | — |  |
| `size` | `CheckboxSize` | — |  |
| `shape` | `string` | — |  |
| `variant` | `'fill'` hoặc `'outline'` | — |  |
| `readonly` | `boolean` | — |  |
| `disabled` | `boolean` | — |  |
| `shadow` | `boolean` | — |  |

## Events (emit)

- **`update:modelValue`** — `boolean`
- **`focus`** — 
- **`blur`** — 

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
