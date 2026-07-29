# CardHeader (`t-card-header`)

## Mô tả

Phần header của Card.


## Ví dụ sử dụng

```vue
<t-card>
  <t-card-header>
    <t-flex :options="[{ direction: 'row', justify: 'space-between', align: 'center' }]">
      <span>Tiêu đề</span>
      <t-button variant="text" size="small">Sửa</t-button>
    </t-flex>
  </t-card-header>
</t-card>
```

## Props

Không có props.

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`CARD_PROVIDER_STATE_KEY`
