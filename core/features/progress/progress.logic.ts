import { cssPrefix, cssProperty } from "../../utils";
import { ProgressAttrOptions } from "./progress.type";

export const getProgressPercent = (value: number, max: number): number => {
  const current = Number(value);
  const ceiling = Number(max);
  if (!Number.isFinite(current) || !Number.isFinite(ceiling) || ceiling <= 0) return 0;
  return Math.max(0, Math.min(100, (current / ceiling) * 100));
};

export const getProgressAttrs = (options: ProgressAttrOptions) => ({
  class: [
    cssPrefix(["layer", "progress"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("progress"),
    {
      bar: options.variant === "bar",
      circle: options.variant === "circle",
      indeterminate: options.indeterminate,
    },
  ],
  style: {
    [cssProperty("percent")]: String(options.percent),
  },
});

export const getProgressTrackAttrs = () => ({
  class: [cssPrefix("progress-track")],
});

export const getProgressBarAttrs = () => ({
  class: [cssPrefix("progress-bar")],
});

export const getProgressSvgAttrs = () => ({
  class: [cssPrefix("progress-svg")],
  viewBox: "0 0 36 36",
  "aria-hidden": "true",
});

export const getProgressCircleTrackAttrs = () => ({
  class: [cssPrefix("progress-circle"), "track"],
});

export const getProgressCircleBarAttrs = () => ({
  class: [cssPrefix("progress-circle"), "bar"],
});

export const getProgressLabelAttrs = () => ({
  class: [cssPrefix("progress-label")],
});
