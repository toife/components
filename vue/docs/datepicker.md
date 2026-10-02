# DatePicker (`t-datepicker`)

## Mô tả

Bộ lịch chọn ngày/tháng/năm và giờ/phút/giây, đồng bộ với `v-model`. Component chỉ gồm phần lịch và các cột giờ — không có input hay popup, hãy kết hợp với `t-dropdown`, `t-modal`, `t-field`... để thành bộ hoàn chỉnh. Dùng `<button>` thuần, màu sắc lấy từ layer `datepicker` của theme (`role`, `shape`, `size` fallback từ App).

Bấm vào tên tháng/năm trên header để đổi sang bảng chọn tháng/năm (năm hiển thị theo trang 12 năm).

## Ví dụ sử dụng

```vue
<script setup lang="ts">
import { ref } from "vue";
const value = ref<Date | null>(new Date());
</script>

<template>
  <!-- Ngày -->
  <t-datepicker v-model="value" />

  <!-- Ngày + giờ phút giây -->
  <t-datepicker v-model="value" type="datetime" />

  <!-- Chỉ giờ, không giây -->
  <t-datepicker v-model="value" type="time" :seconds="false" />

  <!-- Giới hạn khoảng chọn, tuần bắt đầu Chủ nhật, tiếng Anh -->
  <t-datepicker
    v-model="value"
    :min="new Date(2026, 0, 1)"
    :max="new Date(2026, 11, 31)"
    :first-day="0"
    locale="en-US"
  />
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `modelValue` | `Date \| null` | — | Giá trị đang chọn |
| `value` | `Date \| null` | — | Giá trị khởi tạo khi không dùng `v-model` |
| `type` | `'date'`, `'time'`, `'datetime'` | `date` | Hiển thị lịch, cột giờ, hoặc cả hai |
| `min` | `Date` | — | Thời điểm nhỏ nhất. Ngày/tháng/năm nằm ngoài khoảng bị disable, giá trị được kéo về trong khoảng |
| `max` | `Date` | — | Thời điểm lớn nhất |
| `seconds` | `boolean` | `true` | Hiển thị cột giây |
| `firstDay` | `number` | `1` | Ngày bắt đầu tuần (0 = Chủ nhật, 1 = Thứ hai) |
| `locale` | `string` | `vi-VN` | Locale của tên tháng/thứ (qua `Intl`) |
| `size` | `DatePickerSize` | `standard` |  |
| `role` | `string` | — | Fallback từ App |
| `shape` | `string` | — | Fallback từ App |
| `disabled` | `boolean` | `false` |  |
| `direction` | `AppDirection` | — | Fallback từ App |

## Events (emit)

- **`update:modelValue`** — `Date` (luôn là một `Date` mới, không bao giờ `null`)
- **`change`** — `Date` (chỉ emit khi giá trị thực sự thay đổi)

## Slots

- **`prev`** / **`next`** — nội dung nút trước/sau (mặc định `‹` / `›`)
- **`day`** — `{ date: Date, active: boolean }`

## Hành vi cần biết

- Chọn ngày giữ nguyên giờ/phút/giây của giá trị hiện tại (mặc định `00:00:00` nếu chưa có giá trị).
- Chọn giờ khi chưa có giá trị sẽ lấy ngày hôm nay.
- Với `type="date"`, giá trị trả về vẫn là `Date` đầy đủ; hãy tự bỏ phần giờ nếu cần.
- Cột giờ không disable từng giờ theo `min`/`max`; giá trị chỉ bị kéo về trong khoảng.

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY`

## Hàm thuần (core)

`getDatePickerDays({ year, month, firstDay })` trả về 42 ngày (6 tuần) của lịch tháng; `getDatePickerWeekdays`, `getDatePickerMonths`, `getDatePickerYears`, `isDatePickerDayDisabled`, `clampDatePickerDate`... dùng lại được ở adapter khác.
