# Flex (`t-flex`)

## Mô tả

Flex layout responsive.


## Ví dụ sử dụng

```vue
<t-flex :options="[
  { direction: 'row', gap: 12, align: 'center', justify: 'space-between' },
  { breakpoint: 'md', direction: 'column', gap: 8 },
]">
  <t-flex-item :options="[{ grow: 1 }]"><div>Trái</div></t-flex-item>
  <t-flex-item :options="[{ grow: 0 }]"><div>Phải</div></t-flex-item>
</t-flex>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `options` | `FlexOption[]` | `[]` | Cấu hình flex theo breakpoint — xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## Chi tiết kiểu dữ liệu

Prop `options`: mảng **`FlexOption`**. [types.md — FlexOption](./types.md#flexoption).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `breakpoint` | `string` | Breakpoint |
| `gap` | `string` \| `number` | Flex gap |
| `direction` | `row` \| `column` \| `row-reverse` \| `column-reverse` | Hướng flex |
| `wrap` | `string` | `flex-wrap` |
| `justify` | `string` | `justify-content` |
| `align` | `string` | `align-items` |
| `alignContent` | `string` | `align-content` |
