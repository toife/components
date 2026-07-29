# ToastContent (`t-toast-content`)

## Mô tả

Một toast item.

## Ví dụ sử dụng

Thường do `t-toast` render từ `useToast().open()`. Dùng tay khi custom:

```vue
<t-toast placement="top-end">
  <t-toast-content
    :id="msg.id"
    :message="msg.message"
    :duration="3000"
    variant="fill"
    role="success"
    @close="toast.close(msg.id)"
  />
</t-toast>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `id` | `number` | — |  |
| `message` | `string` | — | Bắt buộc |
| `duration` | `number` | — | ms |
| `role` | `string` | — |  |
| `variant` | `'fill'` hoặc `'text'` | — |  |
| `placement` | `ToastPlacement` | — |  |
| `shape` | `string` | — |  |

## Events (emit)

- **`close`** — 

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
