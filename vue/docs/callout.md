# Callout (`t-callout`)

## Mô tả

Khối thông báo ngắn. Role giống Button / Tag. Hai variant khác nhau ở cách kẻ viền; `direction` đảo nội dung và nút đóng.


## Ví dụ sử dụng

```vue
<t-callout role="success">Đã lưu thay đổi.</t-callout>

<t-callout role="warning" variant="outline" closable @close="dismiss">
  Hết hạn sau 3 ngày.
</t-callout>

<t-callout role="info" direction="right" closable @close="dismiss">
  Nội dung căn phải, viền accent ở cạnh phải.
</t-callout>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `variant` | `'accent'` hoặc `'outline'` | `accent` | `accent`: viền màu một cạnh (trái khi direction left, phải khi direction right). `outline`: viền đủ 4 cạnh. |
| `closable` | `boolean` | `false` | Hiện nút đóng. Vị trí nút đảo theo `direction`. |
| `direction` | `'left'` hoặc `'right'` | — | Fallback từ App. Đảo text-align và nút đóng. |
| `role` | `string` | — | `mode`, `reverse`, `primary`, `success`, `info`, `warning`, `danger`, … |
| `size` | `string` | `standard` |  |
| `shape` | `string` | — | Fallback từ App |

## Slots

| Slot | Mô tả |
|------|-------|
| default | Nội dung |
| `close` | Icon nút đóng. Mặc định `×` |

## Events (emit)

| Event | Mô tả |
|-------|-------|
| `close` | Bấm nút đóng. Component không tự ẩn — cha quyết định gỡ khỏi cây. |

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
