# Collapse (`t-collapse`)

## Mô tả

Thu gọn nội dung.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const open = ref(false);
</script>

<template>
  <t-collapse v-model="open" :duration="300">
    <template #trigger>
      <span>{{ open ? "Thu gọn" : "Mở rộng" }}</span>
    </template>
    <p>Nội dung ẩn/hiện theo chiều cao.</p>
  </t-collapse>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `boolean` | `false` |  |
| `duration` | `number` | — | ms |
| `role` | `string` | — |  |
| `disabled` | `boolean` | `false` |  |

## Events (emit)

- **`update:modelValue`** — `boolean`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
