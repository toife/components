# Dropdown (`t-dropdown`)

## Mô tả

Dropdown v-model mở/đóng.


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const open = ref(false);
</script>

<template>
  <t-dropdown v-model="open" placement="bottom-end">
    <template #trigger="{ toggle, isOpen }">
      <t-button variant="outline" @click="toggle">
        Menu {{ isOpen ? "▲" : "▼" }}
      </t-button>
    </template>
    <t-button variant="text" block @click="open = false">Mục 1</t-button>
    <t-button variant="text" block @click="open = false">Mục 2</t-button>
  </t-dropdown>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `placement` | `DropdownPlacement` | `bottom-start` |  |
| `role` | `string` | — |  |
| `shadow` | `boolean` | — |  |
| `shape` | `string` | — |  |
| `direction` | `AppDirection` | — |  |
| `size` | `DropdownSize` | `standard` |  |

## Events (emit)

- **`update:modelValue`** — `boolean`
- **`open`** — 
- **`close`** — 

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
