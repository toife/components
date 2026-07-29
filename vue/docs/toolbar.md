# Toolbar (`t-toolbar`)

## Mô tả

Toolbar + safe area.

## Ví dụ sử dụng

```vue
<t-page>
  <t-toolbar safe placement="top" role="surface" :divider="true">
    <t-button variant="text">←</t-button>
    <span class="flex-1 text-center">Tiêu đề</span>
    <t-button variant="text">⋯</t-button>
  </t-toolbar>

  <t-container class="padding-2">Nội dung</t-container>

  <t-cable placement="bottom">
    <t-toolbar safe placement="bottom">
      <t-button block variant="fill">Xác nhận</t-button>
    </t-toolbar>
  </t-cable>
</t-page>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `placement` | `string` hoặc `null` | — | Vị trí toolbar |
| `safe` | `boolean` | — |  |
| `role` | `string` | — |  |
| `divider` | `boolean` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`, `CABLE_PROVIDER_STATE_KEY`
