// Vue SFC module typings for this package and for consumers (source is built in their app).
// Intentionally no "vite/client" so projects without Vite still typecheck.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
