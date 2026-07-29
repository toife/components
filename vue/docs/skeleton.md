# Skeleton (`t-skeleton`)

## Mô tả

Loading placeholder.


## Ví dụ sử dụng

```vue
<t-skeleton v-if="loading" width="100%" height="48px" role="neutral" shape="rounded" />
<div v-else>{{ content }}</div>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `width` | `string` hoặc `number` | — |  |
| `height` | `string` hoặc `number` | — |  |
| `role` | `string` | — |  |
| `shape` | `string` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
