# RouteOutlet (`t-route-outlet`)

## Mô tả

Render route component (async OK).


## Ví dụ sử dụng

Dùng nội bộ bởi `RouteNavigator`. Khi tự render route:

```vue
<t-route-outlet :component="HomePage" />
<!-- hoặc lazy -->
<t-route-outlet :component="() => import('./pages/Home.vue')" />
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `component` | `unknown` | — | Component hoặc lazy loader |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.
