# @toife/vue — Hướng dẫn chung

Thư viện component Vue 3 cho hệ sinh thái Toife. Package publish **source** (`src/`): ứng dụng của bạn tự bundle và biên dịch SCSS.

## Khai báo / cài đặt

### Package cần cài trước

| Package | Bắt buộc | Ghi chú |
|---------|----------|---------|
| `vue` ^3.5 | Có | Peer dependency |
| `vue-router` ^4 | Có (nếu dùng route) | Peer dependency — `RouteWrapper`, `RouteNavigator`, … |
| `@toife/gesture` | Có (nếu dùng gesture) | `Modal`, `Refresher`, `RouteNavigator` (variant swipe) |
| `@toife/sass-layer` | Có | SCSS component dùng `@use`; cấu hình Sass trong app |
| `sass` hoặc `sass-embedded` | Có | Biên dịch style component |

### Cài thư viện

```bash
npm install @toife/vue vue vue-router @toife/gesture @toife/sass-layer sass
# hoặc
yarn add @toife/vue vue vue-router @toife/gesture @toife/sass-layer sass
```

### Đăng ký component toàn cục

```ts
// main.ts
import { createApp } from "vue";
import { createToife } from "@toife/vue";
import App from "./App.vue";

const app = createApp(App);

const toife = createToife(app, {
  name: "my-app",   // tên instance (dùng với useApp)
  prefix: "t-",     // mặc định — tag <t-button>, không dùng toife-
});

toife.subscribeAll();

// Đăng ký thêm component tùy chỉnh
toife.subscribe("refresh-logo", RefreshLogo);

app.mount("#app");
```

### Import trực tiếp (không qua prefix)

```vue
<script setup lang="ts">
import { App, Button, Field } from "@toife/vue";
</script>
```

### Cấu hình Sass (Vite ví dụ)

```ts
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules"],
      },
    },
  },
});
```

Component SCSS dùng `@use "@toife/sass-layer"` — đảm bảo package được cài và `loadPaths` trỏ tới `node_modules`.

### TypeScript

```ts
// env.d.ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
```

### Shell ứng dụng

Hầu hết UI nên bọc trong `<t-app>` (hoặc prefix bạn chọn) để nhận theme qua `provide`/`inject`:

```vue
<template>
  <t-app shape="pill" role="mode" :shadow="false">
    <t-page>
      <!-- nội dung -->
    </t-page>
    <template #global>
      <!-- overlay toàn cục nếu cần -->
    </template>
  </t-app>
</template>
```

### Composable toàn cục (gắn với App)

| Composable | Mục đích |
|------------|----------|
| `useAction()` | Mở action sheet programmatically |
| `useDecisionModal()` | Mở modal xác nhận programmatically |
| `useToast()` | Hiển thị toast programmatically |
| `usePresent()` | Quản lý z-index stack overlay (nội bộ / nâng cao) |
| `useApp(name?)` | Lấy instance `Toife` đã tạo |
| `createToife(app, options?)` | Khởi tạo và đăng ký component |

### Danh sách tag sau `subscribeAll()` (prefix mặc định `t-`)

`t-app`, `t-action`, `t-avatar`, `t-button`, `t-cable`, `t-card`, `t-card-body`, `t-card-header`, `t-card-footer`, `t-checkbox`, `t-radio`, `t-radio-group`, `t-collapse`, `t-container`, `t-decision-modal`, `t-divider`, `t-dropdown`, `t-field`, `t-flex`, `t-flex-item`, `t-form-group`, `t-gesture-indicator`, `t-grid`, `t-grid-item`, `t-image`, `t-modal`, `t-page`, `t-present`, `t-progress`, `t-refresher`, `t-route-navigator`, `t-route-wrapper`, `t-route-provider`, `t-route-outlet`, `t-segmented-field`, `t-select`, `t-slide-range`, `t-skeleton`, `t-switch`, `t-tab`, `t-tabs`, `t-toast`, `t-toast-content`, `t-toolbar`.

Không dùng prefix `toife-` hay `tf-`. Tag luôn là `t-` + tên component.

### Ví dụ khung ứng dụng đầy đủ

```vue
<!-- App.vue -->
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <t-app shape="pill" role="mode">
    <t-route-wrapper home-route-name="home">
      <t-route-navigator variant="swipe" />
    </t-route-wrapper>
    <template #global />
  </t-app>
</template>
```

```ts
// main.ts
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createToife } from "@toife/vue";
import App from "./App.vue";

const app = createApp(App);
const toife = createToife(app, { name: "my-app", prefix: "t-" });
toife.subscribeAll();

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home", component: () => import("./Home.vue") }],
});
app.use(router);
router.isReady().then(() => app.mount("#app"));
```

Mỗi component có mục **「Ví dụ sử dụng」** trong file tương ứng dưới `docs/`.

### Kiểu object trong props

Props dạng object/mảng lồng (vd. `GridItemOption[]`, `ActionButton[][]`) được mô tả đầy đủ trong:

- **[types.md](./types.md)** — bảng thuộc tính từng kiểu, ví dụ JSON
- Mục **「Chi tiết kiểu dữ liệu」** trong từng file component liên quan
