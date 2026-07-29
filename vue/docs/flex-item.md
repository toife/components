# FlexItem (`t-flex-item`)

## Mô tả

Item Flex.


## Ví dụ sử dụng

```vue
<t-flex :options="[{ direction: 'row', gap: 8 }]">
  <t-flex-item :options="[{ grow: 2, shrink: 1, basis: '0' }]">
    Cột rộng
  </t-flex-item>
  <t-flex-item :options="[{ grow: 1, order: 2 }]">
    Cột hẹp
  </t-flex-item>
</t-flex>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `options` | `FlexItemOption[]` | `[]` | Cấu hình flex item — xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## Chi tiết kiểu dữ liệu

Prop `options`: mảng **`FlexItemOption`**. [types.md — FlexItemOption](./types.md#flexitemoption).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `breakpoint` | `string` | Breakpoint |
| `grow` | `number` | `flex-grow` |
| `shrink` | `number` | `flex-shrink` |
| `basis` | `string` | `flex-basis` |
| `order` | `number` | `order` |
