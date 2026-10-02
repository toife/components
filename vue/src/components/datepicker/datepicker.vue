<style lang="scss" src="@/core/features/datepicker/datepicker.scss" scoped></style>
<template src="./datepicker.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref, watch, nextTick, onMounted } from "vue";
import {
  DATEPICKER_DEFAULT_PROPS,
  DATEPICKER_YEARS_PER_PAGE,
  APP_PROVIDER_STATE_KEY,
  clampDatePickerDate,
  getDatePickerAttrs,
  getDatePickerCellAttrs,
  getDatePickerDays,
  getDatePickerMonths,
  getDatePickerPartAttrs,
  getDatePickerTimeOptions,
  getDatePickerWeekdays,
  getDatePickerYears,
  isDatePickerDayDisabled,
  isDatePickerMonthDisabled,
  isDatePickerYearDisabled,
  isSameDay,
  padDatePickerTime,
  startOfDay,
  type AppProviderState,
  type DatePickerEvent,
  type DatePickerProps,
  type DatePickerTimeUnit,
  type DatePickerValue,
  type DatePickerView,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<DatePickerProps>(), {
  ...DATEPICKER_DEFAULT_PROPS,
});
const emit = defineEmits<DatePickerEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const keepValue = ref<DatePickerValue>(null);
const today = new Date();
const view = ref<DatePickerView>("day");
const timeRef = ref<HTMLElement>();

const currentValue = computed<DatePickerValue>(() =>
  props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : keepValue.value,
);

// Month currently displayed (independent from the selected value)
const initialView = currentValue.value ?? today;
const viewYear = ref(initialView.getFullYear());
const viewMonth = ref(initialView.getMonth());

// Computed properties
// ----------------------------------------------------------------------------
const showCalendar = computed(() => props.type !== "time");
const showTime = computed(() => props.type !== "date");
const timeUnits = computed<DatePickerTimeUnit[]>(() =>
  props.seconds ? ["hours", "minutes", "seconds"] : ["hours", "minutes"],
);

const timeParts = computed(() => {
  const value = currentValue.value;
  return {
    hours: value?.getHours() ?? 0,
    minutes: value?.getMinutes() ?? 0,
    seconds: value?.getSeconds() ?? 0,
  };
});

const days = computed(() =>
  getDatePickerDays({ year: viewYear.value, month: viewMonth.value, firstDay: props.firstDay }),
);
const weekdays = computed(() => getDatePickerWeekdays(props.locale, props.firstDay));
const months = computed(() => getDatePickerMonths(props.locale));
const yearPage = computed(() => getDatePickerYears(viewYear.value));
const monthLabel = computed(() => getDatePickerMonths(props.locale, "long")[viewMonth.value]);

const prevDisabled = computed(() => {
  if (!props.min) return false;
  if (view.value === "day") return new Date(viewYear.value, viewMonth.value, 0, 23, 59, 59) < props.min;
  if (view.value === "month") return isDatePickerYearDisabled(viewYear.value - 1, props.min, props.max);
  return isDatePickerYearDisabled(yearPage.value[0] - 1, props.min, props.max);
});

const nextDisabled = computed(() => {
  if (!props.max) return false;
  if (view.value === "day") return new Date(viewYear.value, viewMonth.value + 1, 1) > props.max;
  if (view.value === "month") return isDatePickerYearDisabled(viewYear.value + 1, props.min, props.max);
  return isDatePickerYearDisabled(yearPage.value[yearPage.value.length - 1] + 1, props.min, props.max);
});

const datepickerAttrs = computed(() => {
  const direction = props.direction || unref(appState?.direction) || "left";
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";

  return getDatePickerAttrs({
    role,
    shape,
    direction,
    size: props.size,
    disabled: props.disabled,
  });
});

const controlAttrs = { ...getDatePickerPartAttrs("control"), type: "button" };
const titleButtonAttrs = { ...getDatePickerPartAttrs("title-button"), type: "button" };

const calendarAttrs = getDatePickerPartAttrs("calendar");
const headerAttrs = getDatePickerPartAttrs("header");
const titleAttrs = getDatePickerPartAttrs("title");
const weekdaysAttrs = getDatePickerPartAttrs("weekdays");
const weekdayAttrs = getDatePickerPartAttrs("weekday");
const daysAttrs = getDatePickerPartAttrs("days");
const gridAttrs = getDatePickerPartAttrs("grid");
const timeAttrs = getDatePickerPartAttrs("time");
const timeColumnAttrs = getDatePickerPartAttrs("time-column");
const timeSeparatorAttrs = getDatePickerPartAttrs("time-separator");

// Methods
// ----------------------------------------------------------------------------
const commit = (next: Date) => {
  const value = clampDatePickerDate(next, props.min, props.max);
  if (currentValue.value && value.getTime() === currentValue.value.getTime()) return;

  keepValue.value = value;
  emit("update:modelValue", value);
  emit("change", value);
};

const step = (direction: 1 | -1) => {
  if (view.value === "day") {
    const next = new Date(viewYear.value, viewMonth.value + direction, 1);
    viewYear.value = next.getFullYear();
    viewMonth.value = next.getMonth();
  } else if (view.value === "month") {
    viewYear.value += direction;
  } else {
    viewYear.value += direction * DATEPICKER_YEARS_PER_PAGE;
  }
};

const selectDay = (day: Date) => {
  if (props.disabled) return;
  const base = currentValue.value;
  const next = new Date(day);
  next.setHours(base?.getHours() ?? 0, base?.getMinutes() ?? 0, base?.getSeconds() ?? 0, 0);

  viewYear.value = day.getFullYear();
  viewMonth.value = day.getMonth();
  commit(next);
};

const selectMonth = (month: number) => {
  viewMonth.value = month;
  view.value = "day";
};

const selectYear = (year: number) => {
  viewYear.value = year;
  view.value = "month";
};

const selectTime = (unit: DatePickerTimeUnit, n: number) => {
  if (props.disabled) return;
  const next = new Date(currentValue.value ?? startOfDay(today));

  if (unit === "hours") next.setHours(n);
  else if (unit === "minutes") next.setMinutes(n);
  else next.setSeconds(n);
  next.setMilliseconds(0);

  commit(next);
};

// Center the selected item of every time column
const scrollTimeToActive = () => {
  timeRef.value?.querySelectorAll<HTMLElement>("[data-unit]").forEach((column) => {
    const active = column.querySelector<HTMLElement>(".active");
    if (active) column.scrollTop = active.offsetTop - column.clientHeight / 2 + active.offsetHeight / 2;
  });
};

// Follow the value when it is changed from outside
watch(currentValue, (value) => {
  if (value) {
    viewYear.value = value.getFullYear();
    viewMonth.value = value.getMonth();
  }
  nextTick(scrollTimeToActive);
});

onMounted(scrollTimeToActive);
</script>
