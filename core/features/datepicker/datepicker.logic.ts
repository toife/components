import { cssPrefix } from "../../utils";
import { DATEPICKER_YEARS_PER_PAGE } from "./datepicker.constants";
import type {
  DatePickerAttrOptions,
  DatePickerCalendarOptions,
  DatePickerCellAttrOptions,
  DatePickerTimeUnit,
} from "./datepicker.type";

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const endOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

export const isSameDay = (a?: Date | null, b?: Date | null) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * A day is disabled when it lies entirely outside [min, max]
 */
export const isDatePickerDayDisabled = (date: Date, min?: Date, max?: Date) =>
  (!!min && endOfDay(date) < min) || (!!max && startOfDay(date) > max);

/**
 * Month is disabled when it lies entirely outside [min, max]
 */
export const isDatePickerMonthDisabled = (year: number, month: number, min?: Date, max?: Date) =>
  (!!min && new Date(year, month + 1, 0, 23, 59, 59, 999) < min) ||
  (!!max && new Date(year, month, 1) > max);

export const isDatePickerYearDisabled = (year: number, min?: Date, max?: Date) =>
  (!!min && new Date(year, 11, 31, 23, 59, 59, 999) < min) ||
  (!!max && new Date(year, 0, 1) > max);

/**
 * Clamp a date into [min, max]
 */
export const clampDatePickerDate = (date: Date, min?: Date, max?: Date) => {
  if (min && date < min) return new Date(min);
  if (max && date > max) return new Date(max);
  return date;
};

/**
 * Build 6 weeks (42 days) for the given month, starting on `firstDay` (0 = Sunday)
 */
export const getDatePickerDays = (options: DatePickerCalendarOptions): Date[] => {
  const { year, month } = options;
  const firstDay = ((Math.floor(options.firstDay) % 7) + 7) % 7;
  const offset = (new Date(year, month, 1).getDay() - firstDay + 7) % 7;

  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
};

/**
 * Localized narrow weekday names, ordered from `firstDay`
 */
export const getDatePickerWeekdays = (locale: string, firstDay: number) => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  const start = ((Math.floor(firstDay) % 7) + 7) % 7;

  // 2023-01-01 is a Sunday
  return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(2023, 0, 1 + start + i)));
};

export const getDatePickerMonths = (locale: string, style: "short" | "long" = "short") => {
  const formatter = new Intl.DateTimeFormat(locale, { month: style });
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2023, i, 1)));
};

/**
 * The page of years that contains `year`
 */
export const getDatePickerYears = (year: number) => {
  const start = Math.floor(year / DATEPICKER_YEARS_PER_PAGE) * DATEPICKER_YEARS_PER_PAGE;
  return Array.from({ length: DATEPICKER_YEARS_PER_PAGE }, (_, i) => start + i);
};

export const getDatePickerTimeOptions = (unit: DatePickerTimeUnit) =>
  Array.from({ length: unit === "hours" ? 24 : 60 }, (_, i) => i);

export const padDatePickerTime = (value: number) => String(value).padStart(2, "0");

export const getDatePickerAttrs = (options: DatePickerAttrOptions) => ({
  class: [
    cssPrefix(["layer", "datepicker"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("datepicker"),
    cssPrefix(["direction", options.direction]),
    cssPrefix(["size", options.size]),
    { disabled: options.disabled },
  ],
});

/**
 * Class for a structural part: header, title, weekdays, days, months, years, time, time-column, ...
 */
export const getDatePickerPartAttrs = (part: string) => ({
  class: [cssPrefix(`datepicker-${part}`)],
});

export const getDatePickerCellAttrs = (options: DatePickerCellAttrOptions) => ({
  class: [
    cssPrefix("datepicker-cell"),
    { active: options.active, today: options.today, outside: options.outside },
  ],
});
