# DecisionModal (`t-decision-modal`)

## Mô tả

Modal xác nhận; hoặc `useDecisionModal()`.


## Ví dụ sử dụng

```ts
import { useDecisionModal } from "@toife/vue";

const modal = useDecisionModal();
modal.open({
  title: "Xác nhận",
  message: "Bạn có chắc muốn xóa?",
  direction: "column",
  actions: [
    { text: "Xóa", role: "danger", variant: "fill", handler: () => {} },
    { text: "Hủy", variant: "text" },
  ],
  dismiss: ["backdrop"],
});
```

```vue
<t-decision-modal
  :visible="show"
  message="Thoát ứng dụng?"
  :actions="[{ text: 'Có' }, { text: 'Không', variant: 'text' }]"
  @choose="onChoose"
  @close="show = false"
/>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `visible` | `boolean` | `false` |  |
| `title` | `string` | — |  |
| `message` | `string` | — | Bắt buộc |
| `actions` | `DecisionModalButton[]` | — | Bắt buộc |
| `dismiss` | `string[]` | — |  |
| `placement` | `string` | — |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |
| `divider` | `boolean` | — |  |
| `direction` | `'row'` hoặc `'column'` | — |  |

## Events (emit)

- **`close`** — `type?: string`
- **`choose`** — `DecisionModalButton`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## `useDecisionModal()`

`open(props)`, `close()`, `choose(btn)`

## Chi tiết kiểu dữ liệu

### `actions: DecisionModalButton[]`

Mảng phẳng các nút (không nhóm như Action). [types.md — DecisionModalButton](./types.md#decisionmodalbutton).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `text` | `string` | Nhãn |
| `role` | `string` | Role theme |
| `variant` | `fill` \| `outline` \| `text` | Kiểu nút |
| `handler` | `() => void` | Callback |
| `data` | `unknown` | Payload |

### `flow`

`row` — nút xếp ngang; `column` — xếp dọc.

### `useDecisionModal().open()`

`DecisionModalComposableProps` = props trên + `onClose`, `onChoose`.
