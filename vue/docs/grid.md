# Grid (`t-grid`)

## Mô tả

CSS grid responsive.


## Ví dụ sử dụng

```vue
<t-grid :options="[
  { gap: 8, columns: '1fr 1fr' },
  { breakpoint: 'md', gap: 16, columns: 'repeat(3, 1fr)' },
]">
  <t-grid-item :options="[{ column: 1, row: 1 }]">Ô 1</t-grid-item>
  <t-grid-item :options="[{ column: 2, row: 1 }]">Ô 2</t-grid-item>
</t-grid>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `options` | `GridOption[]` | `[]` | Cấu hình grid theo breakpoint — xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## Chi tiết kiểu dữ liệu

Prop `options`: mảng **`GridOption`**. [types.md — GridOption](./types.md#gridoption).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `breakpoint` | `string` | Breakpoint (`""` = base) |
| `gap` | `string` \| `number` | Khoảng cách; `number` → `px` |
| `columns` | `string` | `grid-template-columns` |
| `rows` | `string` | `grid-template-rows` |
| `autoFlow` | `string` | `grid-auto-flow` |
