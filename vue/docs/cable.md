# Cable (`t-cable`)

## Mô tả

Layout phụ (keyboard/safe area). Provide cho Toolbar.


## Ví dụ sử dụng

```vue
<t-app>
  <t-page>...</t-page>
  <t-cable placement="bottom" :keyboard="true">
    <t-toolbar safe placement="bottom">
      <t-button block>Xác nhận</t-button>
    </t-toolbar>
  </t-cable>
</t-app>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `keyboard` | `boolean` | — |  |
| `placement` | `string` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `CABLE_PROVIDER_STATE_KEY` — `placement: Ref<string>`

## Chi tiết kiểu dữ liệu

### Provide `CableProviderState`

- `placement: Ref<string>` — `Toolbar` inject để căn theo cable. [types.md](./types.md#cableproviderstate).
