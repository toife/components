---
name: toife-forms
description: >-
  Build Toife form controls: t-field, t-select, t-checkbox, t-radio, t-radio-group,
  t-switch, t-segmented-field, t-slide-range, t-form-group. Use when adding inputs,
  validation messages, toggles, OTP, sliders, or settings forms.
---

# Toife forms

Core types: `@toife/components/core/features/{field,select,checkbox,radio,switch,segmented-field,slide-range,form-group}`.

All of these use **`v-model`**. Theme (`role`, `shape`, `size`) falls back to `t-app`.

Shared field chrome: `variant` = `outline` \| `fill` \| `underline`; `size` often `standard` or `large` in Lamtoi.

## Field — `t-field`

Text / textarea.

```vue
<t-field
  v-model="form.email"
  type="email"
  size="large"
  placeholder="you@example.com"
  :message="errors.email"
/>
```

| Prop | Default | Notes |
|------|---------|-------|
| `modelValue` | `""` | string \| number |
| `type` | `text` | `text`, `number`, `email`, `password`, `tel`, `url`, `paragraph` |
| `variant` | `outline` | |
| `line` / `maxLine` | `1` | Use with `type="paragraph"` |
| `placeholder`, `disabled`, `readonly`, `name`, `id`, `maxLength` | | |
| `message` | | Error / status under the field |

Emits: `update:modelValue`, `focus`, `blur`, `input`, `beforeinput`.

## Select — `t-select`

Same chrome as Field. **`options` required**.

```vue
<t-select
  v-model="city"
  size="large"
  :options="[
    { label: 'Hà Nội', value: 'hn' },
    { label: 'TP.HCM', value: 'hcm', disabled: true },
  ]"
/>
```

`SelectOption`: `{ value: string, label?: string, disabled?: boolean }`.

Also emits `select` with the full option.

## Checkbox — `t-checkbox`

`v-model` boolean. Default slot = label. `variant`: `fill` \| `outline`.

```vue
<t-checkbox v-model="accepted">I agree</t-checkbox>
```

## Radio — `t-radio-group` + `t-radio`

Group owns `v-model`. Each radio **must** have `value` and live inside the group.

```vue
<t-radio-group v-model="shape" direction="vertical">
  <t-radio v-for="opt in shapeOptions" :key="opt.value" :value="opt.value">
    {{ opt.label }}
  </t-radio>
</t-radio-group>
```

Group: `direction` `horizontal` \| `vertical`; `variant` `fill` \| `outline`; `disabled` / `readonly` cascade.

A lone `t-radio` does nothing useful.

## Switch — `t-switch`

`v-model` boolean. Optional `bounce`, `disabled`, `readonly`.

```vue
<t-switch v-model="darkMode" />
```

## Segmented field — `t-segmented-field`

OTP / PIN. `v-model` is **`string[]`** (one entry per cell).

```vue
<t-segmented-field
  v-model="code"
  :length="6"
  @complete="onComplete"
/>
```

Emits `complete` when every cell is filled. Optional `pattern: string[]`.

## Slide range — `t-slide-range`

```vue
<t-slide-range v-model="amount" :min="0" :max="100" :step="1" unit="%" />
```

Emits `update:modelValue` and `change`. Optional `tick`.

## Form group — `t-form-group`

Layout only. `direction`: `horizontal` \| `vertical`. Wrap related fields/checkboxes; it does not validate.

## Patterns (Lamtoi)

Form inside a modal + sticky submit:

```vue
<t-modal :visible="visible" :placement="isMobile ? 'bottom' : 'center'" gesture @close="close">
  <t-field size="large" v-model="form.loginValue" />
  <t-field size="large" type="password" v-model="form.password" />
  <t-cable placement="bottom">
    <t-toolbar>
      <t-button block size="large" :loading="submitting" @click="submit">Continue</t-button>
    </t-toolbar>
  </t-cable>
</t-modal>
```

Settings: `t-switch` and `t-radio-group` inside `t-card` / `t-card-body`.
