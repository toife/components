# Toast (`t-toast`)

## Mô tả

Vùng toast theo placement; dùng `useToast()`.


## Ví dụ sử dụng

`App` đã mount sẵn các `t-toast` theo placement. Chỉ cần gọi composable:

```ts
import { useToast } from "@toife/vue";

const toast = useToast();
toast.open({
  message: "Lưu thành công",
  duration: 3000,
  placement: "bottom-center",
  variant: "fill",
  role: "success",
});
```

Đảm bảo trong `t-app` có `<t-toast placement="bottom-center" />` (hoặc placement khớp).
## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `placement` | `ToastPlacement` | `bottom-end` |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## `useToast()`

```ts
useToast().open({ message: 'OK', duration: 3000 });
```

## Chi tiết kiểu dữ liệu

### `useToast().open(message: ToastContentProps)`

[types.md — ToastContentProps](./types.md#toastcontentprops-usetoastopen).

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `message` | `string` | Có | Nội dung |
| `duration` | `number` | Không | ms auto close |
| `role` | `string` | Không | Role màu |
| `variant` | `fill` \| `text` | Không | Kiểu toast |
| `placement` | `ToastPlacement` | Không | Vùng hiển thị (khớp `<t-toast placement>`) |
| `shape` | `string` | Không | Shape theme |
