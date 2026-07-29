# Present (`t-present`)

## Mô tả

Overlay/sheet (Modal, Action dùng component này).


## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const visible = ref(false);
</script>

<template>
  <t-button @click="visible = true">Mở sheet</t-button>
  <t-present
    :visible="visible"
    placement="bottom"
    backdrop="display"
    :duration="200"
    @close="visible = false"
  >
    <div class="padding-2">Bottom sheet</div>
  </t-present>
</template>
```

**Điều khiển qua ref (expose):**

```vue
<script setup lang="ts">
import { ref } from "vue";
const present = ref();
present.value?.open();
present.value?.render({ presentTranslate: "0px" });
</script>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `keepalive` | `boolean` | `false` |  |
| `visible` | `boolean` | `false` |  |
| `backdrop` | `display`, `none`, `transparent` | `display` |  |
| `placement` | `PresentPlacement` | `bottom` |  |
| `style` | `unknown` | — |  |
| `class` | `unknown` | — |  |
| `bounce` | `number`, `string`, `boolean` | — |  |
| `duration` | `number` | `200` | ms |
| `teleport` | `string` | — | CSS selector |

## Events (emit)

- **`close`** — `type?: string`

## Expose

- `render(options: RenderOptions)` — cập nhật transition/translate/opacity
- `open()` — mở animation
- `close()` — đóng animation

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY` (optional) — `rootEl` teleport

## Chi tiết kiểu dữ liệu

### `RenderOptions` (expose `render()`)

[types.md — RenderOptions](./types.md#renderoptions).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `backdropTransitionDuration` | `string` | VD. `"0.2s"` |
| `backdropOpacity` | `number` | `0`–`1`; `undefined` = hiện backdrop |
| `presentTransitionDuration` | `string` | Transition panel |
| `presentTranslate` | `string` | `"0px"`, `"100%"`, … |
| `presentOpacity` | `number` | Dùng với placement `center` |
