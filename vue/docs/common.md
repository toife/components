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
  prefix: "t-",     // mặc định trong factory: "tf-"
});

toife.subscribeComponents();

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

### Danh sách tag sau `subscribeComponents()` (prefix mặc định `tf-`)

`tf-app`, `tf-action`, `tf-avatar`, `tf-button`, `tf-cable`, `tf-card`, `tf-card-body`, `tf-card-header`, `tf-card-footer`, `tf-checkbox`, `tf-radio`, `tf-radio-group`, `tf-collapse`, `tf-container`, `tf-decision-modal`, `tf-divider`, `tf-dropdown`, `tf-field`, `tf-flex`, `tf-flex-item`, `tf-form-group`, `tf-gesture-indicator`, `tf-grid`, `tf-grid-item`, `tf-image`, `tf-modal`, `tf-page`, `tf-present`, `tf-refresher`, `tf-route-navigator`, `tf-route-wrapper`, `tf-route-provider`, `tf-route-outlet`, `tf-segmented-field`, `tf-select`, `tf-slide-range`, `tf-skeleton`, `tf-switch`, `tf-tab`, `tf-tabs`, `tf-toast`, `tf-toast-content`, `tf-toolbar`.

Trong tài liệu từng component, tag ví dụ dùng prefix `t-` (có thể đổi khi `createToife`).

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
toife.subscribeComponents();

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
