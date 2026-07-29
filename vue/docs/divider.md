# Divider (`t-divider`)

## Mô tả

Đường phân cách.


## Ví dụ sử dụng

```vue
<t-divider direction="horizontal" role="neutral" />

<t-flex :options="[{ direction: 'row', align: 'center', gap: 8 }]">
  <span>A</span>
  <t-divider direction="vertical" />
  <span>B</span>
</t-flex>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `direction` | `'horizontal'` hoặc `'vertical'` | — |  |
| `role` | `string` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
