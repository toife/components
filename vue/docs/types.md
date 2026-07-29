# Kiểu dữ liệu dùng chung (object / mảng)

Tài liệu chi tiết các kiểu object và cấu trúc mảng lồng nhau trong props, emit và provide/inject.

---

## Layout — `options[]` và `breakpoint`

`Flex`, `FlexItem`, `Grid`, `GridItem` nhận prop `options` là **mảng cấu hình theo breakpoint**. Mỗi phần tử map sang CSS custom property qua `cssProperty()` (theme `@toife/sass-layer`).

| Thuộc tính chung | Kiểu | Mô tả |
|------------------|------|--------|
| `breakpoint` | `string` (optional) | Tên breakpoint theme. Chuỗi rỗng `""` hoặc bỏ qua = breakpoint mặc định (base). Ví dụ: `"sm"`, `"md"`. |

Một component có thể truyền **nhiều object** trong `options` — mỗi object áp style cho một breakpoint khác nhau.

---

## `GridOption`

Dùng trong prop `options` của **`Grid`** (`t-grid`).

| Thuộc tính | Kiểu | Mặc định | Mô tả |
|------------|------|----------|--------|
| `breakpoint` | `string` | `""` | Breakpoint áp dụng |
| `gap` | `string` \| `number` | — | Khoảng cách grid. `number` → tự thêm đơn vị `px` |
| `columns` | `string` | — | Giá trị `grid-template-columns` (vd. `"1fr 1fr"`, `"repeat(3, 1fr)"`) |
| `rows` | `string` | — | `grid-template-rows` |
| `autoFlow` | `string` | — | `grid-auto-flow` (vd. `"row"`, `"column"`) |

```vue
<t-grid :options="[
  { gap: 8, columns: '1fr 1fr' },
  { breakpoint: 'md', gap: 16, columns: 'repeat(3, 1fr)' },
]" />
```

---

## `GridItemOption`

Dùng trong prop `options` của **`GridItem`** (`t-grid-item`).

| Thuộc tính | Kiểu | Mặc định | Mô tả |
|------------|------|----------|--------|
| `breakpoint` | `string` | `""` | Breakpoint |
| `row` | `number` | — | Vị trí / span hàng (CSS variable `grid-item-row`) |
| `column` | `number` | — | Vị trí / span cột (`grid-item-column`) |
| `justify` | `'start'` \| `'end'` \| `'center'` \| `'stretch'` | — | Căn theo trục justify |
| `align` | `'start'` \| `'end'` \| `'center'` \| `'stretch'` | — | Căn theo trục align |

```vue
<t-grid-item :options="[
  { column: 1, row: 1, justify: 'center' },
  { breakpoint: 'md', column: 2, row: 1, align: 'stretch' },
]" />
```

---

## `FlexOption`

Dùng trong prop `options` của **`Flex`** (`t-flex`).

| Thuộc tính | Kiểu | Mặc định | Mô tả |
|------------|------|----------|--------|
| `breakpoint` | `string` | `""` | Breakpoint |
| `gap` | `string` \| `number` | — | `gap` flex; `number` → `px` |
| `direction` | `'row'` \| `'column'` \| `'row-reverse'` \| `'column-reverse'` | — | `flex-direction` |
| `wrap` | `string` | — | `flex-wrap` (vd. `"wrap"`, `"nowrap"`) |
| `justify` | `string` | — | `justify-content` |
| `align` | `string` | — | `align-items` |
| `alignContent` | `string` | — | `align-content` |

---

## `FlexItemOption`

Dùng trong prop `options` của **`FlexItem`** (`t-flex-item`).

| Thuộc tính | Kiểu | Mặc định | Mô tả |
|------------|------|----------|--------|
| `breakpoint` | `string` | `""` | Breakpoint |
| `grow` | `number` | — | `flex-grow` |
| `shrink` | `number` | — | `flex-shrink` |
| `basis` | `string` | — | `flex-basis` (vd. `"auto"`, `"0"`, `"200px"`) |
| `order` | `number` | — | `order` |

---

## `ActionButton`

Một nút trong action sheet. Dùng trong **`Action`** prop `actions` và emit **`choose`**.

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `text` | `string` | Không | Nhãn nút |
| `role` | `string` | Không | Role màu (theme) |
| `variant` | `'fill'` \| `'outline'` \| `'text'` | Không | Kiểu nút (giống `Button`) |
| `shadow` | `boolean` | Không | Shadow nút |
| `handler` | `() => void` | Không | Gọi khi bấm (trước khi emit) |
| `data` | `unknown` | Không | Payload tùy ý gắn vào nút |

### Cấu trúc `actions: ActionButton[][]`

- **Mảng ngoài**: mỗi phần tử = **một nhóm** nút (một hàng / block trong sheet).
- **Mảng trong**: các nút trong cùng nhóm.

```ts
actions: [
  [{ text: "Chụp ảnh" }, { text: "Thư viện" }],
  [{ text: "Hủy", role: "danger", variant: "text" }],
];
```

### `ActionComposableProps` (`useAction().open()`)

Kế thừa toàn bộ `ActionProps`, thêm:

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `onClose` | `(type?: string) => void` | Sau khi đóng |
| `onChoose` | `(btn?: ActionButton) => void` | Sau khi chọn nút |

---

## `DecisionModalButton`

Giống `ActionButton` (không có `shadow`). Dùng trong **`DecisionModal`** prop `actions`.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `text` | `string` | Nhãn |
| `role` | `string` | Role theme |
| `variant` | `'fill'` \| `'outline'` \| `'text'` | Kiểu nút |
| `handler` | `() => void` | Callback bấm |
| `data` | `unknown` | Dữ liệu kèm |

`DecisionModalComposableProps` = `DecisionModalProps` + `onClose`, `onChoose` (giống Action).

---

## `SelectOption`

Một mục trong danh sách **`Select`** (`options` bắt buộc).

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `value` | `string` | **Có** | Giá trị khi chọn (bind `modelValue`) |
| `label` | `string` | Không | Text hiển thị; mặc định có thể dùng `value` |
| `disabled` | `boolean` | Không | Không cho chọn mục này |

```vue
<t-select
  v-model="city"
  :options="[
    { label: 'Hà Nội', value: 'hn' },
    { label: 'TP.HCM', value: 'hcm', disabled: true },
  ]"
/>
```

---

## `RouteStack`

Node trong cây điều hướng của **`RouteProvider`** / **`RouteWrapper`**.

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `name` | `string` | Có | Tên route (`RouteRecordName`) |
| `component` | `RouteComponent` | Có | Component từ `vue-router` matched record |
| `stack` | `RouteStack[]` | Có | Route con lồng nhau (nested) |

Được build tự động bởi `useRouteWrapper().updateRoutes(route.matched)`.

---

## `RouteNavigatorTransformState`

Payload emit **`transform`** từ **`RouteNavigator`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `back` | `number` | % translate lớp phía sau |
| `prepare` | `number` | % lớp chuẩn bị |
| `active` | `number` | % lớp đang active |
| `backdrop` | `number` | Độ mờ backdrop |
| `duration` | `string` \| `undefined` | Thời gian transition CSS |

---

## `RefreshEvent`

Payload emit **`move`** và **`end`** từ **`Refresher`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `refresh` | `() => () => void` | Gọi `refresh()` để bắt đầu trạng thái loading; hàm trả về gọi khi xong để tắt loading |
| `offset` | `number` (optional) | Chỉ có ở `move` — px kéo xuống |

```vue
<t-refresher
  @end="({ refresh }) => {
    const done = refresh();
    await fetchData();
    done();
  }"
/>
```

---

## `RenderOptions`

Tham số method **`Present.render()`** (expose).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `backdropTransitionDuration` | `string` | VD. `"0.2s"` |
| `backdropOpacity` | `number` | `0`–`1`; `undefined` = hiện backdrop |
| `presentTransitionDuration` | `string` | Transition panel |
| `presentTranslate` | `string` | VD. `"0px"`, `"100%"`, `"calc(-16px)"` |
| `presentOpacity` | `number` | Opacity panel (placement `center`) |

---

## `AppProviderState`

Provide từ **`App`** — inject qua `APP_PROVIDER_STATE_KEY`.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `shape` | `Ref<string>` | Bo góc theme |
| `divider` | `Ref<boolean>` | Divider |
| `role` | `Ref<string>` | Role màu |
| `shadow` | `Ref<boolean>` | Shadow |
| `triple` | `Ref<boolean>` | Triple mode |
| `direction` | `Ref<'left' \| 'right'>` | Hướng app |
| `rootEl` | `Ref<HTMLElement \| undefined>` | DOM root — target teleport overlay |

---

## `CardProviderState`

Provide từ **`Card`** — inject ở `CardHeader` / `CardFooter`.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `role` | `ComputedRef<string>` | Role card |
| `shape` | `ComputedRef<string>` | Shape |
| `divider` | `ComputedRef<boolean>` | Divider |

---

## `RadioGroupProviderState`

Provide từ **`RadioGroup`** — inject ở **`Radio`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `modelValue` | `ComputedRef<string \| number \| undefined>` | Giá trị nhóm |
| `role` | `ComputedRef<string>` | Role |
| `variant` | `ComputedRef<RadioVariant>` | `'fill'` \| `'outline'` |
| `disabled` | `ComputedRef<boolean>` | |
| `readonly` | `ComputedRef<boolean>` | |
| `shadow` | `ComputedRef<boolean>` | |
| `setValue` | `(val: string \| number) => void` | Đổi giá trị + emit |

---

## `TabsProviderState`

Provide từ **`Tabs`** — inject ở **`Tab`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `activeValue` | `ComputedRef<string>` | Tab đang chọn (`modelValue`) |
| `role` | `ComputedRef<string>` | |
| `shape` | `ComputedRef<string>` | |
| `size` | `ComputedRef<string>` | |
| `setValue` | `(val: string) => void` | Chọn tab |

---

## `CableProviderState`

Provide từ **`Cable`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `placement` | `Ref<string>` | Placement cable (Toolbar đọc) |

---

## `RouteProviderState`

Provide từ **`RouteProvider`**.

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `stack` | `ComputedRef<RouteStack[]>` | Cây route hiện tại |

---

## Mảng đặc biệt — `Tabs` `border` / `margin`

Prop kiểu `number[]` (tuple 2 phần tử), dùng cho variant `underline`:

### `margin` (mặc định `[0, 0]`)

| Index | Ý nghĩa |
|-------|---------|
| `[0]` | Lề dọc (top/bottom) — px cộng vào vùng highlight |
| `[1]` | Lề ngang (left/right) |

### `border` (mặc định `[2, 0]`)

| Index | Ý nghĩa |
|-------|---------|
| `[0]` | Độ dày thanh gạch chân (px) |
| `[1]` | Chiều rộng thanh highlight (`0` = full width tab) |

---

## `ToastContentProps` (`useToast().open()`)

| Thuộc tính | Kiểu | Bắt buộc | Mô tả |
|------------|------|----------|--------|
| `message` | `string` | Có | Nội dung toast |
| `id` | `number` | Không | Tự gán khi queue |
| `duration` | `number` | Không | ms tự đóng |
| `role` | `string` | Không | Role màu |
| `variant` | `'fill'` \| `'text'` | Không | Kiểu hiển thị |
| `placement` | `ToastPlacement` | Không | Gán vào vùng Toast tương ứng |
| `shape` | `string` | Không | Shape theme |

`ToastPlacement`: `bottom-start`, `bottom-center`, `bottom-end`, `top-start`, `top-center`, `top-end`.

---

## Enum / union thường gặp

| Tên | Giá trị | Dùng ở |
|-----|---------|--------|
| `PresentPlacement` | `top`, `left`, `right`, `center`, `bottom` | Present, Action, Modal |
| `FieldVariant` | `outline`, `fill`, `underline` | Field, Select, SegmentedField |
| `FieldType` | `text`, `number`, `email`, `password`, `tel`, `url`, `paragraph` | Field |
| `DropdownPlacement` | `bottom-start`, `bottom-end`, `top-start`, `top-end` | Dropdown |
| `TabsPlacement` | `top-start`, `top-end`, `bottom-start`, … | Tabs |
| `AppDirection` | `left`, `right` | App, Field, Dropdown, … |
