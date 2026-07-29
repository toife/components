# Radio (`t-radio`)

## Mô tả

Một radio (trong RadioGroup).


## Ví dụ sử dụng

```vue
<t-radio-group v-model="plan" direction="vertical">
  <t-radio value="free">Miễn phí</t-radio>
  <t-radio value="pro">Pro</t-radio>
  <t-radio value="team" :disabled="true">Team</t-radio>
</t-radio-group>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `value` | `string` hoặc `number` | — | Bắt buộc |
| `role` | `string` | — |  |
| `size` | `RadioSize` | — |  |
| `variant` | `RadioVariant` | — |  |
| `disabled` | `boolean` | — |  |
| `readonly` | `boolean` | — |  |
| `shadow` | `boolean` | — |  |

## Events (emit)

Không emit event.

## Expose

Không có (`defineExpose` không được khai báo).

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`, `RADIO_GROUP_PROVIDER_STATE_KEY`
