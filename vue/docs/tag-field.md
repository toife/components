# TagField (`t-tag-field`)

## Mô tả

Ô nhập nhiều tag, **độc lập**: tự vẽ khung, chip và ô `<input>` thường, không dùng `t-field` hay `t-tag`, và có layer theme + bộ màu riêng (`tag-field`) cho mỗi role/variant. Gõ rồi nhấn Enter hoặc dấu phẩy để thêm tag. `v-model` là `string[]`.

## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const tags = ref<string[]>(["vue", "toife"]);
const suggestions = ref(["typescript", "scss"]);
</script>

<template>
  <t-tag-field
    v-model="tags"
    placeholder="Nhập tag rồi nhấn Enter"
    :max="10"
    :suggestions="suggestions"
    @input="loadSuggestions"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `string[]` | `[]` | Danh sách tag |
| `name` | `string` | — | |
| `id` | `string` | — | |
| `variant` | `TagFieldVariant` | `outline` | `outline`, `fill`, `underline` |
| `role` | `string` | — | |
| `shape` | `string` | — | |
| `size` | `TagFieldSize` | `standard` | |
| `direction` | `AppDirection` | — | |
| `placeholder` | `string` | `""` | |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | Không thêm / xóa tag |
| `autocomplete` | `string` | — | |
| `maxLength` | `number` hoặc `string` | — | Độ dài chữ đang gõ |
| `tabindex` | `number` hoặc `string` | — | |
| `message` | `string` | `""` | Thông báo dưới field |
| `max` | `number` hoặc `string` | — | Số tag tối đa; đủ thì ô nhập bị ẩn |
| `separators` | `string[]` | `["Enter", ","]` | `KeyboardEvent.key` (và ký tự khi dán) biến chữ đang gõ thành tag |
| `allowDuplicates` | `boolean` | `false` | Cho phép tag trùng (so sánh không phân biệt hoa thường) |
| `addOnBlur` | `boolean` | `false` | Chữ còn lại trong ô nhập thành tag khi mất focus |
| `suggestions` | `string[]` | `[]` | Tag gợi ý hiện dưới field; bấm để thêm |

## Events (emit)

- **`update:modelValue`** — `string[]`
- **`add`** — `string` (tag vừa thêm bởi người dùng)
- **`remove`** — `string` (tag vừa bị xóa bởi người dùng)
- **`input`** — `string` (chữ đang gõ thay đổi; dùng để tải `suggestions`)
- **`focus`** — `FocusEvent`
- **`blur`** — `FocusEvent`

## Hành vi

- Enter / dấu phẩy thêm tag; khi đang gõ bộ gõ (IME, Telex…) thì phím Enter chốt chữ **không** thêm tag.
- Backspace khi ô nhập trống xóa tag cuối.
- Dán chuỗi có dấu phẩy hoặc xuống dòng sẽ tách thành nhiều tag.
- Chữ gõ dở **không** được tự thêm khi mất focus trừ khi bật `addOnBlur` (nếu không, bấm vào gợi ý sẽ thêm nhầm chữ dở).

## Slots

| Slot | Tham số | Mô tả |
|------|---------|-------|
| `tag` | `{ tag, index, remove }` | Thay chip mặc định |
| `start-input` | — | Trước các chip, trong khung |
| `end-input` | — | Sau ô nhập, trong khung |
| default | — | Cuối component (sau gợi ý) |

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject. Lấy `role`, `shape`, `direction` mặc định từ `t-app`.

## Theme

Layer `tag-field` (`.t-layer-tag-field.t-role-<role>-<variant>`). Token: `background-color`, `border-color` (và `-focus`, `-hover`, `-active`, `-disabled`), `color`, `placeholder-color`, `help-color` cho khung; `chip-background-color`, `chip-border-color`, `chip-color` (và `-hover`, `-active`, cũng là màu của nút ×) cho chip; `suggestion-color`, `suggestion-border-color` cho gợi ý. Mỗi mode theme cần một `_tag-field.scss` đăng ký layer này.
