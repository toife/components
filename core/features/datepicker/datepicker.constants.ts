/**
 * DatePicker Default Props
 */
export const DATEPICKER_DEFAULT_PROPS = {
  modelValue: undefined,
  value: undefined,
  type: "date",
  min: undefined,
  max: undefined,
  seconds: true,
  firstDay: 1,
  locale: "vi-VN",
  size: "standard",
  disabled: false,
  direction: undefined,
} as const;

/**
 * Number of years shown per page in the year view
 */
export const DATEPICKER_YEARS_PER_PAGE = 12;
