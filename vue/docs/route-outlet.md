# RouteOutlet (`t-route-outlet`)

## Mô tả

Render một view của route (async OK). Không truyền `name` thì render `component` — nếu đó là map `components` của vue-router thì lấy `default`. Truyền `name` thì lấy view cùng tên trên **route con đang active** trong `RouteProvider` bao ngoài.

Nhiều outlet có thể đứng cạnh một `t-route-navigator` lồng: navigator vẽ `default`, mỗi outlet vẽ một named view (`actions`, …). Layout giữ nguyên khi đổi trang con.


## Ví dụ sử dụng

Dùng nội bộ bởi `RouteNavigator`. Khi tự render route:

```vue
<t-route-outlet :component="HomePage" />
<!-- hoặc lazy -->
<t-route-outlet :component="() => import('./pages/Home.vue')" />
```

Named view trong layout. Route con khai báo `components: { default, actions }`:

```vue
<t-route-outlet name="actions" />
<t-route-navigator name="section-navigator" variant="fade" />
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `component` | `unknown` | — | Component, lazy loader, hoặc map `{ default }`. Bỏ qua khi có `name` |
| `name` | `string` | — | Tên view trên route con đang active (`components[name]`) |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

Khi có `name`: `ROUTE_PROVIDER_STATE_KEY` — `stack` của provider bao ngoài. Phần tử cuối là trang đang active.
