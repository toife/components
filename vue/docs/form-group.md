# FormGroup (`t-form-group`)

## Mô tả

Nhóm control.


## Ví dụ sử dụng

```vue
<t-form-group direction="vertical">
  <t-field v-model="name" placeholder="Họ tên" />
  <t-field v-model="phone" type="tel" placeholder="SĐT" />
</t-form-group>

<t-form-group direction="horizontal">
  <t-checkbox v-model="a">A</t-checkbox>
  <t-checkbox v-model="b">B</t-checkbox>
</t-form-group>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `direction` | `'horizontal'` hoặc `'vertical'` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

Không provide/inject.
