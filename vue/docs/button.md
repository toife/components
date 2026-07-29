# Button (`t-button`)

## Mô tả

Nút với variant, size, loading.


## Ví dụ sử dụng

```vue
<t-button variant="fill" size="standard" :loading="isLoading" @click="submit">
  Gửi
</t-button>

<t-button variant="outline" block role="danger">Xóa</t-button>
<t-button variant="text">Bỏ qua</t-button>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `role` | `string` | — |  |
| `size` | `ButtonSize` | `standard` |  |
| `shape` | `string` | — |  |
| `block` | `boolean` | `false` |  |
| `loading` | `boolean` | `false` |  |
| `variant` | `'fill'`, `'outline'`, `'text'` | `fill` |  |
| `shadow` | `boolean` | — | Fallback từ App |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
