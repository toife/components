# RouteProvider (`t-route-provider`)

## Mô tả

Provide stack cho Navigator.


## Ví dụ sử dụng

Thường không dùng trực tiếp — `RouteWrapper` truyền `stack` tự động:

```vue
<t-route-provider :stack="routeStack">
  <t-route-navigator />
</t-route-provider>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `stack` | `RouteStack[]` | — | Bắt buộc |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `ROUTE_PROVIDER_STATE_KEY` — `stack: ComputedRef<RouteStack[]>`

## Chi tiết kiểu dữ liệu

### `stack: RouteStack[]`

[types.md — RouteStack](./types.md#routestack).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `name` | `string` | Tên route |
| `component` | `RouteComponent` | Component từ vue-router |
| `stack` | `RouteStack[]` | Route con lồng nhau |

Thường không truyền tay — `RouteWrapper` build từ `route.matched`.
