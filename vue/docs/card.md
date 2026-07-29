# Card (`t-card`)

## Mô tả

Khung card; provide state cho header/footer.


## Ví dụ sử dụng

```vue
<t-card role="surface" shape="rounded" :divider="true">
  <t-card-header>
    <strong>Tiêu đề</strong>
  </t-card-header>
  <t-card-body>
    Nội dung card
  </t-card-body>
  <t-card-footer>
    <t-button variant="text">Chi tiết</t-button>
  </t-card-footer>
</t-card>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `role` | `string` | — |  |
| `shape` | `string` | — |  |
| `divider` | `boolean` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Provide

**Key:** `CARD_PROVIDER_STATE_KEY` — `role`, `shape`, `divider` (ComputedRef)

### Inject

`APP_PROVIDER_STATE_KEY`

## Chi tiết kiểu dữ liệu

### Provide `CardProviderState`

[types.md — CardProviderState](./types.md#cardproviderstate) — `role`, `shape`, `divider` cho `CardHeader` / `CardFooter`.
