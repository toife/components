# Progress (`t-progress`)

## Mô tả

Thanh tiến trình, hai dạng `bar` và `circle`.


## Ví dụ sử dụng

```vue
<t-progress :value="60" />
<t-progress variant="circle" :value="60">60%</t-progress>
<t-progress indeterminate />
<t-progress variant="circle" indeterminate role="primary" size="large" />
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `variant` | `'bar'` hoặc `'circle'` | `bar` | Dạng hiển thị |
| `value` | `number` | `0` | Giá trị hiện tại |
| `max` | `number` | `100` | Giá trị tối đa |
| `indeterminate` | `boolean` | `false` | Animation khi chưa biết % |
| `role` | `string` | — | Màu theme (fallback `t-app`) |
| `shape` | `string` | — | Bo góc track bar (fallback `t-app`) |
| `size` | `string` | `standard` | `small` \| `standard` \| `large` |

Slot mặc định: nhãn (bar: cạnh track; circle: giữa vòng).

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`
