# RouteNavigator (`t-route-navigator`)

## Mô tả

Navigator stack + swipe.


## Ví dụ sử dụng

```vue
<t-route-wrapper home-route-name="home">
  <t-route-navigator
    variant="swipe"
    direction="right"
    :keepalive="false"
    @transform="onTransform"
  />
</t-route-wrapper>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `direction` | `'left'` hoặc `'right'` | `right` |  |
| `variant` | `'none'` hoặc `'swipe'` | `none` |  |
| `keepalive` | `boolean` | `false` |  |

## Events (emit)

- **`transform`** — `RouteNavigatorTransformState`

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`ROUTE_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### Emit `transform` → `RouteNavigatorTransformState`

[types.md — RouteNavigatorTransformState](./types.md#routenavigatortransformstate).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `back` | `number` | % translate lớp back |
| `prepare` | `number` | % lớp prepare |
| `active` | `number` | % lớp active |
| `backdrop` | `number` | Độ backdrop |
| `duration` | `string` \| `undefined` | CSS transition duration |
