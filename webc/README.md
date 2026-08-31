# @toife/lit

Lit (web components) adapter for Toife. Shares the same `@/core` types, class logic, and SCSS as `@toife/vue`.

## Requirements

| Package | Notes |
|---------|--------|
| `lit` ^3 | Required |
| `@toife/gesture` | Gestures (modal, refresher, slide-range) |
| `@toife/sass-layer` | Needed when compiling component SCSS in an app |

## Installation

```bash
npm install @toife/lit lit
```

## Register custom elements

```ts
import { createToife } from "@toife/lit";
import "@toife/lit/styles/index.css";

createToife().subscribeAll(); // prefix "t-" → <t-app>, <t-button>, …
```

```html
<t-app role="primary" shape="rounded">
  <t-page>
    <t-container>
      <t-button>OK</t-button>
    </t-container>
  </t-page>
</t-app>
```

## Imperative APIs

```ts
import { useToast, useAction, useDecisionModal } from "@toife/lit";

useToast().open({ content: "Saved", duration: 2000 });
useAction().open({ /* ... */ });
useDecisionModal().open({ /* ... */ });
```

## Architecture notes

- Components render in **light DOM** so published global CSS matches Vue.
- Theme/context uses a DOM-tree `provide` / `inject` (same keys as core: `app-state`, `card-state`, …).
- Form controls emit `update:modelValue` as `CustomEvent` (`event.detail`).
- Route components accept a `RouterLike` interface instead of `vue-router`.
