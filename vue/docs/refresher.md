# Refresher (`t-refresher`)

## Mô tả

Pull-to-refresh (`@toife/gesture`). Không có props.



## Ví dụ sử dụng

```vue
<script setup lang="ts">
async function onRefreshEnd({ refresh }: { refresh: () => () => void }) {
  const done = refresh();
  await fetch("/api/list");
  done();
}
</script>

<template>
  <t-refresher @start="onStart" @move="onMove" @end="onRefreshEnd" @cancel="onCancel">
    <div class="scroll-list">...</div>
  </t-refresher>
</template>
```

## Props

Không có props.

## Events (emit)

- **`start`** — 
- **`move`** — `{ refresh, offset? }`
- **`cancel`** — 
- **`end`** — `{ refresh }`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## Chi tiết kiểu dữ liệu

### Payload `RefreshEvent` (emit `move`, `end`)

[types.md — RefreshEvent](./types.md#refreshevent).

| Thuộc tính | Emit | Mô tả |
|------------|------|--------|
| `refresh` | `move`, `end` | `const done = refresh()` bật loading; gọi `done()` khi xong |
| `offset` | `move` | Số px kéo (≥ 0) |
