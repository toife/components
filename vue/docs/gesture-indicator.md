# GestureIndicator (`t-gesture-indicator`)

## Mô tả

Chỉ báo kéo modal.


## Ví dụ sử dụng

Thường do `Modal` render tự động. Dùng tay khi custom `Present`:

```vue
<t-present :visible="true" placement="bottom">
  <t-gesture-indicator placement="bottom" role="neutral" />
  <div class="sheet">Nội dung sheet</div>
</t-present>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `placement` | `string` | — |  |
| `role` | `string` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
