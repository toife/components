# Action (`t-action`)

## Mô tả

Action sheet nhóm nút. Thường mở bằng `useAction().open()`.


## Ví dụ sử dụng

**Programmatic (khuyến nghị — trong `t-app`):**

```ts
import { useAction } from "@toife/vue";

const action = useAction();
action.open({
  visible: true,
  placement: "bottom",
  dismiss: ["backdrop"],
  actions: [
    [{ text: "Chụp ảnh" }, { text: "Thư viện ảnh" }],
    [{ text: "Hủy", variant: "text", role: "danger" }],
  ],
  onChoose: (btn) => console.log(btn),
  onClose: (type) => console.log(type),
});
```

**Khai báo trực tiếp:**

```vue
<t-action
  :visible="show"
  :actions="[[{ text: 'OK', handler: close }]]"
  dismiss="backdrop"
  @choose="onChoose"
  @close="show = false"
/>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `visible` | `boolean` | `false` | Hiển thị |
| `dismiss` | `string[]` | — | Nguồn đóng hợp lệ |
| `actions` | `ActionButton[][]` | — | Bắt buộc — mảng nhóm nút, xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |
| `role` | `string` | — | Override |
| `shape` | `string` | — |  |
| `divider` | `boolean` | — |  |
| `shadow` | `boolean` | — |  |
| `placement` | `PresentPlacement` | `bottom` | Vị trí sheet |

## Events (emit)

- **`close`** — `type?: string`
- **`choose`** — `ActionButton`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## `useAction()`

```ts
useAction().open({ actions: [[{ text: 'OK' }]], dismiss: ['backdrop'] });
```

## Chi tiết kiểu dữ liệu

### `actions: ActionButton[][]`

- Mảng **ngoài**: từng phần tử = một **nhóm** nút (một block trong sheet).
- Mảng **trong**: các `ActionButton` trong nhóm.

[types.md — ActionButton](./types.md#actionbutton)

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `text` | `string` | Nhãn nút |
| `role` | `string` | Role theme |
| `variant` | `fill` \| `outline` \| `text` | Kiểu nút |
| `shadow` | `boolean` | Shadow |
| `handler` | `() => void` | Callback khi bấm |
| `data` | `unknown` | Dữ liệu tùy ý |

### `dismiss: string[]`

Danh sách nguồn đóng hợp lệ (vd. `['backdrop']`). Nếu bấm backdrop mà không có trong `dismiss`, sheet chỉ “pop” feedback, không đóng.

### `placement: PresentPlacement`

`top` \| `left` \| `right` \| `center` \| `bottom` — vị trí sheet (qua `Present`).

### `useAction().open(props: ActionComposableProps)`

Thêm `onClose?: (type?: string) => void`, `onChoose?: (btn?: ActionButton) => void`.
