# Avatar (`t-avatar`)

## Mô tả

Ảnh đại diện theo theme.


## Ví dụ sử dụng

```vue
<t-avatar src="/avatar.png" size="large" shape="circle" role="primary" />
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `shape` | `string` | — |  |
| `size` | `string` hoặc `number` | — |  |
| `src` | `string` | — | URL |
| `role` | `string` | — |  |
| `divider` | `boolean` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
