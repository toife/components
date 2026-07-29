# RouteWrapper (`t-route-wrapper`)

## Mô tả

Đồng bộ vue-router → stack; bọc RouteProvider.


## Ví dụ sử dụng

```vue
<!-- App.vue — cần vue-router -->
<template>
  <t-app>
    <t-route-wrapper home-route-name="home">
      <t-route-navigator variant="swipe" direction="right" />
    </t-route-wrapper>
  </t-app>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `homeRouteName` | `string` | `home` | Route gốc |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## `useRouteWrapper()`

`stack`, `updateRoutes(matched)`

## Ví dụ

```vue
<t-route-wrapper home-route-name="home">
  <t-route-navigator variant="swipe" />
</t-route-wrapper>
```
