# GridItem (`t-grid-item`)

## Mô tả

Ô grid.


## Ví dụ sử dụng

```vue
<t-grid :options="[{ columns: 'repeat(4, 1fr)', gap: 8 }]">
  <t-grid-item
    v-for="i in 4"
    :key="i"
    :options="[{ column: i, justify: 'center', align: 'center' }]"
  >
    {{ i }}
  </t-grid-item>
</t-grid>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `options` | `GridItemOption[]` | `[]` | Mảng cấu hình theo breakpoint — xem [Chi tiết kiểu dữ liệu](#chi-tiết-kiểu-dữ-liệu) |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.

## Chi tiết kiểu dữ liệu

Prop `options` nhận mảng **`GridItemOption`**. Xem bảng đầy đủ: [types.md — GridItemOption](./types.md#griditemoption).

| Thuộc tính | Kiểu | Mô tả |
|------------|------|--------|
| `breakpoint` | `string` | Breakpoint theme (`""` = base) |
| `row` | `number` | Hàng / span hàng |
| `column` | `number` | Cột / span cột |
| `justify` | `start` \| `end` \| `center` \| `stretch` | Căn justify |
| `align` | `start` \| `end` \| `center` \| `stretch` | Căn align |

```vue
<t-grid-item :options="[{ column: 1, row: 1 }, { breakpoint: 'md', column: 2 }]" />
```
