# Tab (`t-tab`)

## Mô tả

Tab con (trong Tabs).


## Ví dụ sử dụng

Phải nằm trong `t-tabs`:

```vue
<t-tabs v-model="tab" variant="underline" :border="[2, 15]">
  <t-tab value="home">Trang chủ</t-tab>
  <t-tab value="trade" :disabled="false">Giao dịch</t-tab>
</t-tabs>
<div v-if="tab === 'home'">...</div>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `value` | `string` | — |  |
| `disabled` | `boolean` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`TABS_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### Inject `TabsProviderState`

Cần nằm trong `<t-tabs>`. Đọc `activeValue`, gọi `setValue(value)` khi click (theo `Tab` `value`). [types.md](./types.md#tabsproviderstate).
