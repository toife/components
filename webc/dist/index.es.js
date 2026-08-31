var Os = (e) => {
  throw TypeError(e);
};
var Rs = (e, t, s) => t.has(e) || Os("Cannot " + s);
var zs = (e, t, s) => (Rs(e, t, "read from private field"), s ? s.call(e) : t.get(e)), Ds = (e, t, s) => t.has(e) ? Os("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Vs = (e, t, s, r) => (Rs(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
import { LitElement as ai, nothing as v, html as h, render as fe } from "lit";
import { property as o, query as Y, state as m } from "lit/decorators.js";
import { classMap as qs } from "lit/directives/class-map.js";
import { styleMap as Ks } from "lit/directives/style-map.js";
import { gesture as Bt } from "@toife/gesture";
import { repeat as Re } from "lit/directives/repeat.js";
const oi = (e) => !e || !(e instanceof HTMLElement) ? !1 : e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable, ni = () => {
  const e = document.activeElement;
  e instanceof HTMLElement && (e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable) && e.blur();
}, li = () => {
  document.addEventListener("contextmenu", (e) => e.preventDefault()), document.addEventListener("pointerup", (e) => {
    oi(e.target) || ni();
  }), "virtualKeyboard" in navigator && navigator.virtualKeyboard && (navigator.virtualKeyboard.overlaysContent = !0);
};
let ve = null, ge = null;
const ci = () => (ge || (ge = getComputedStyle(document.documentElement).getPropertyValue("--separator").trim()), ge), hi = () => (ve || (ve = getComputedStyle(document.documentElement).getPropertyValue("--prefix").trim()), ve), n = (e) => {
  const t = hi(), s = ci();
  let r = [];
  return typeof e == "string" ? r = [e] : r = [...e], t && (r = [t, ...r]), r.filter((i) => i != null && i !== "").join(s);
}, p = (e) => `--${n(e)}`, yo = (e) => `var(${p(e)})`;
function di() {
  const e = /* @__PURE__ */ new Set(), t = () => !!document.fullscreenElement, s = async (y) => {
    document.fullscreenElement || await y.requestFullscreen();
  }, r = async () => {
    document.fullscreenElement && await document.exitFullscreen();
  }, i = async (y) => {
    document.fullscreenElement ? await r() : await s(y);
  }, a = () => {
    const y = t();
    e.forEach((At) => {
      At(y);
    });
  };
  return {
    isFullscreen: t,
    enter: s,
    exit: r,
    toggle: i,
    subscribe: (y) => (e.add(y), document.addEventListener(
      "fullscreenchange",
      a
    ), () => {
      e.delete(y), e.size === 0 && document.removeEventListener(
        "fullscreenchange",
        a
      );
    })
  };
}
const Fs = {
  visible: !1,
  shape: void 0,
  role: void 0,
  placement: "bottom",
  divider: void 0
}, pi = (e) => ({
  class: [
    n("action"),
    n(["layer", "action"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    e.placement,
    {
      pop: e.pop,
      divider: e.divider
    }
  ]
}), d = "app-state", G = {
  shape: "pill",
  divider: !1,
  role: "mode",
  triple: !1,
  direction: "left",
  data: () => ({})
}, ui = (e) => ({
  class: [
    n("app"),
    n(["layer", "app"]),
    n(["shape", e.shape])
  ]
}), Is = {
  size: "22px",
  src: "",
  role: void 0,
  divider: void 0
}, mi = (e) => ({
  class: [
    n("avatar"),
    n(["layer", "avatar"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    { divider: e.divider }
  ],
  style: {
    [p("width")]: e.size + (typeof e.size == "number" ? "px" : ""),
    backgroundImage: e.src ? `url(${e.src})` : void 0
  }
}), Ut = {
  size: "standard",
  block: !1,
  loading: !1,
  variant: "fill"
}, fi = (e) => ({
  class: [
    n(["layer", "button"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n("button"),
    n(["size", e.size]),
    {
      block: e.block,
      focus: e.focus
    }
  ]
}), vi = () => ({
  class: [n("loader")]
}), Ce = "cable-state", be = {
  keyboard: !1,
  placement: "bottom"
}, gi = (e) => ({
  class: [n(["layer", "cable"]), n("cable"), e.placement]
}), Rt = "card-state", So = {
  divider: void 0,
  shape: void 0,
  role: void 0
}, bi = (e) => ({
  class: [
    n(["layer", "card"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n("card"),
    { divider: e.divider }
  ]
}), yi = (e) => ({
  class: [n("card-header"), { divider: e.divider }]
}), Si = (e) => ({
  class: [n("card-footer"), { divider: e.divider }]
}), $i = () => ({
  class: [n("card-body")]
}), Tt = {
  modelValue: !1,
  disabled: !1,
  size: "standard",
  variant: "fill",
  readonly: !1
}, ki = (e) => ({
  class: [
    n(["layer", "checkbox"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n(["size", e.size]),
    n("checkbox"),
    {
      on: e.modelValue,
      disabled: e.disabled,
      readonly: e.readonly,
      focus: e.focus
    }
  ]
}), Ci = () => ({
  class: [n("checkbox-icon")]
}), Ns = {
  modelValue: !1,
  duration: void 0,
  role: void 0,
  disabled: !1
}, Ai = (e) => ({
  class: [
    n(["layer", "collapse"]),
    n(["role", e.role]),
    n("collapse"),
    { open: e.open, disabled: e.disabled }
  ]
}), Ti = (e) => ({
  class: [n("collapse-trigger")],
  "aria-expanded": e.open,
  "aria-disabled": e.disabled
}), Ei = (e) => ({
  class: [n("collapse-content"), { transition: e.transition }],
  style: {
    [p("duration")]: e.duration,
    [p("height")]: e.height
  }
}), Xs = () => n("collapse-content-inner"), Pi = () => ({
  class: [n("container")]
}), Ht = {
  placement: "center",
  keepalive: !1,
  visible: !1,
  shape: void 0,
  role: void 0,
  divider: void 0,
  direction: "row"
}, xi = (e) => ({
  class: [
    n(["layer", "modal"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n("decision-modal"),
    { pop: e.pop, divider: e.divider }
  ]
}), _i = () => ({
  class: [n("decision-modal-header")]
}), wi = () => ({
  class: [n("decision-modal-body")]
}), Oi = (e) => ({
  class: [n("decision-modal-footer"), `actions-direction-${e.direction}`]
}), Ri = {
  direction: "horizontal"
}, zi = (e) => ({
  class: [
    n(["layer", "divider"]),
    n(["role", e.role]),
    n("divider"),
    { [e.direction]: !0 }
  ]
}), jt = {
  modelValue: !1,
  disabled: !1,
  placement: "bottom-start",
  role: void 0,
  shape: void 0,
  direction: void 0,
  size: "standard"
}, Di = (e) => ({
  class: [
    n(["layer", "dropdown"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n(["size", e.size]),
    n("dropdown"),
    { open: e.open, disabled: e.disabled }
  ]
}), Vi = (e) => ({
  class: [n("dropdown-panel"), e.placement]
}), W = {
  modelValue: "",
  type: "text",
  size: "standard",
  role: void 0,
  shape: void 0,
  disabled: !1,
  readonly: !1,
  message: "",
  variant: "outline",
  placeholder: "",
  direction: void 0,
  line: 1,
  maxLine: 1
}, Fi = (e) => ({
  class: [
    n(["layer", "field"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n("field"),
    n(["size", e.size]),
    n(["direction", e.direction]),
    e.type,
    {
      disabled: e.disabled,
      focus: e.focus,
      readonly: e.readonly
    }
  ],
  style: {
    [p("line")]: e.line,
    [p("max-line")]: e.maxLine || e.line
  }
}), Ii = () => ({ class: [n("field-content")] }), Ni = () => ({ class: [n("field-input")] }), Li = () => ({ class: [n("field-message")] }), Bi = {
  direction: "horizontal"
}, Mi = (e) => ({
  class: [n("form-group"), e.direction]
}), Ui = {
  placement: "bottom",
  role: void 0
}, Hi = (e) => ({
  class: [
    n(["layer", "gesture-indicator"]),
    n(["role", e.role]),
    n("gesture-indicator"),
    e.placement
  ]
}), ji = {
  options: () => []
}, Gi = {
  options: () => []
}, Wi = {
  options: () => []
}, qi = {
  options: () => []
}, Ki = (e) => ({
  class: [n("grid")],
  style: e.map((t) => ({
    [p(["gap", t?.breakpoint || ""])]: typeof t.gap == "number" ? `${t.gap}px` : t.gap,
    [p(["columns", t?.breakpoint || ""])]: t.columns,
    [p(["rows", t?.breakpoint || ""])]: t.rows,
    [p(["auto-flow", t?.breakpoint || ""])]: t.autoFlow
  }))
}), Xi = (e) => ({
  class: [n("grid-item")],
  style: e.map((t) => ({
    [p(["row", t?.breakpoint || ""])]: t.row,
    [p(["column", t?.breakpoint || ""])]: t.column,
    [p(["justify", t?.breakpoint || ""])]: t.justify,
    [p(["align", t?.breakpoint || ""])]: t.align
  }))
}), Yi = (e) => ({
  class: [n("flex")],
  style: e.map((t) => ({
    [p(["gap", t?.breakpoint || ""])]: typeof t.gap == "number" ? `${t.gap}px` : t.gap,
    [p(["direction", t?.breakpoint || ""])]: t.direction,
    [p(["wrap", t?.breakpoint || ""])]: t.wrap,
    [p(["justify", t?.breakpoint || ""])]: t.justify,
    [p(["align", t?.breakpoint || ""])]: t.align
  }))
}), Ji = (e) => ({
  class: [n("flex-item")],
  style: e.map((t) => ({
    [p(["grow", t?.breakpoint || ""])]: t.grow,
    [p(["shrink", t?.breakpoint || ""])]: t.shrink,
    [p(["basis", t?.breakpoint || ""])]: t.basis,
    [p(["order", t?.breakpoint || ""])]: t.order
  }))
}), Qi = ["auto", "scroll", "overlay"], Q = {
  backdrop: "display",
  keepalive: !0,
  visible: !1,
  gesture: !0,
  fullscreen: !1,
  placement: "bottom",
  indicator: !0,
  duration: 200,
  bounce: 0
}, Zi = (e) => ({
  class: [
    n(["layer", "modal"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n("modal"),
    { fullscreen: e.fullscreen, [e.placement]: !0 },
    e.className
  ],
  style: e.style
}), tr = () => ({
  class: [n("page")]
}), gt = {
  keepalive: !1,
  visible: !1,
  backdrop: "display",
  duration: 200,
  placement: "bottom",
  bounce: !1
}, er = {
  backdropTransitionDuration: "0.2s",
  backdropOpacity: void 0,
  presentTransitionDuration: "0.2s",
  presentTranslate: "0px",
  presentOpacity: 1
}, Ls = () => "." + n("app"), sr = (e) => ({
  class: [n(["layer", "backdrop"]), n("present-backdrop")],
  style: {
    zIndex: e.zIndex,
    [p("transition-duration")]: e.backdropTransitionDuration,
    [p("opacity")]: e.backdropOpacity
  }
}), ir = (e) => ({
  class: [n("present"), e.className, e.placement],
  style: [
    {
      zIndex: e.zIndex,
      [p("transition-duration")]: e.presentTransitionDuration,
      [p("translate")]: e.presentTranslate,
      [p("opacity")]: e.presentOpacity
    },
    e.style
  ]
}), Ae = "radio-group-state", ct = {
  disabled: !1,
  readonly: !1,
  variant: "fill",
  direction: "vertical"
}, Bs = {
  disabled: !1,
  size: "standard"
}, rr = (e) => ({
  class: [
    n(["layer", "radio"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n(["size", e.size]),
    n("radio"),
    {
      on: e.checked,
      disabled: e.disabled,
      readonly: e.readonly,
      focus: e.focus
    }
  ]
}), ar = () => ({
  class: [n("radio-icon")]
}), or = (e) => ({
  class: [n("radio-group"), e.direction]
}), nr = () => ({
  class: [n("refresher")]
}), Gt = {
  direction: "right",
  variant: "none",
  keepalive: !1,
  gesture: !0
}, ee = "route-provider-state", lr = {
  homeRouteName: "home"
}, cr = (e) => e.variant === "none" ? "0s" : e.transform.duration !== void 0 ? e.transform.duration : e.transform.active > 0 ? "0s" : void 0, hr = (e) => ({
  class: [
    n("route-navigator"),
    e.direction,
    e.variant,
    { moving: e.moving }
  ],
  style: {
    [p("transform-back")]: e.transform.back + "%",
    [p("transform-prepare")]: e.transform.prepare + "%",
    [p("transform-active")]: e.transform.active + "%",
    [p("transition-duration")]: cr(e),
    [p("percent")]: e.transform.backdrop
  }
}), dr = (e) => ({
  class: [n("route-navigator-component"), e.direction]
}), pr = (e) => ({
  class: [n("route-navigator-backdrop"), n(["layer", "backdrop"])],
  style: { zIndex: e.zIndex }
}), bt = {
  direction: "vertical",
  size: 10,
  thumbSize: 6,
  minThumb: 24,
  autoHide: !0,
  hideDelay: 500,
  role: ""
}, ur = 1, mr = 16, fr = 200, Ys = (e, t, s) => Math.min(Math.max(e, t), s), Ot = (e) => e === "y", vr = (e) => ({
  class: [
    n(["layer", "scrollbar"]),
    n(["role", e.role]),
    n("scrollbar"),
    { visible: e.visible, dragging: e.dragging }
  ],
  style: {
    [p("scrollbar-size")]: `${e.size}px`,
    [p("scrollbar-thumb-size")]: `${e.thumbSize}px`,
    // Centers the painted thumb inside the wider gutter.
    [p("scrollbar-thumb-inset")]: `${Math.max(0, (e.size - e.thumbSize) / 2)}px`,
    [p("scrollbar-thumb-radius")]: `${e.thumbSize / 2}px`
  }
}), gr = () => ({
  class: [n("scrollbar-content")]
}), br = (e) => ({
  class: [
    n("scrollbar-track"),
    { [Ot(e.axis) ? "vertical" : "horizontal"]: !0 }
  ],
  style: { [p("scrollbar-inset")]: `${e.inset}px` }
}), yr = (e) => ({
  class: [n("scrollbar-thumb")],
  style: {
    [p("scrollbar-thumb-length")]: `${e.length}px`,
    [p("scrollbar-thumb-offset")]: `${e.offset}px`
  }
}), Sr = () => `.${n("scrollbar-thumb")}`, $r = (e) => ({
  clientWidth: e.clientWidth,
  clientHeight: e.clientHeight,
  scrollWidth: e.scrollWidth,
  scrollHeight: e.scrollHeight,
  scrollLeft: e.scrollLeft,
  scrollTop: e.scrollTop
}), Ms = (e, t, s) => {
  if (t === (Ot(e) ? "horizontal" : "vertical")) return !1;
  const r = Ot(e) ? s.clientHeight : s.clientWidth;
  return (Ot(e) ? s.scrollHeight : s.scrollWidth) - r > ur;
}, kr = (e, t, s) => {
  const r = Ot(e), i = r ? t.clientHeight : t.clientWidth, a = r ? t.scrollHeight : t.scrollWidth, l = r ? t.scrollTop : t.scrollLeft, y = Math.max(0, i - s.inset), At = Math.max(0, a - i), _s = y && a ? Math.min(y, Math.max(s.minThumb, i / a * y)) : 0, ws = Math.max(0, y - _s);
  return {
    track: y,
    thumb: _s,
    travel: ws,
    maxScroll: At,
    offset: At ? l / At * ws : 0
  };
}, Cr = (e, t) => e.travel ? Ys(t - e.thumb / 2, 0, e.travel) / e.travel * e.maxScroll : 0, Ar = (e, t, s) => {
  if (!e.travel) return t;
  const r = t + s * e.maxScroll / e.travel;
  return Ys(r, 0, e.maxScroll);
}, Tr = (e, t) => e === 1 ? mr : e === 2 ? t : 1, ht = {
  modelValue: void 0,
  value: void 0,
  direction: void 0,
  length: 6,
  variant: "outline",
  size: "standard",
  disabled: !1,
  readonly: !1,
  type: "text",
  message: "",
  pattern: () => []
}, Er = (e) => ({
  class: [
    n("segmented-field-wrapper"),
    n(["layer", "segmented-field"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n(["direction", e.direction]),
    e.size,
    { disabled: e.disabled }
  ]
}), Pr = () => ({
  class: [n("segmented-field-content")]
}), xr = () => ({
  class: [n("segmented-field-message")]
}), yt = {
  modelValue: "",
  size: "standard",
  disabled: !1,
  message: "",
  variant: "outline",
  placeholder: "",
  direction: void 0,
  options: () => []
}, _r = (e) => ({
  class: [
    n(["layer", "select"]),
    n(["role", e.role]),
    n("select"),
    n(["direction", e.direction]),
    n(["size", e.size]),
    { disabled: e.disabled }
  ]
}), wr = () => ({ class: [n("select-icon")] }), Or = () => ({ class: [n("select-option")] }), Rr = () => ({ class: [n("select-message")] }), Us = {
  width: "100%",
  height: "1rem"
}, zr = (e) => ({
  class: [
    n(["layer", "skeleton"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n("skeleton")
  ],
  style: {
    [p("width")]: e.width + (typeof e.width == "number" ? "px" : ""),
    [p("height")]: e.height + (typeof e.height == "number" ? "px" : "")
  }
}), et = {
  modelValue: "",
  min: 0,
  max: 100,
  step: 1,
  unit: "",
  disabled: !1,
  readonly: !1,
  tick: !1
}, Dr = (e) => ({
  class: [
    n("slide-range"),
    n(["layer", "slide-range"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    { disabled: e.disabled, readonly: e.readonly }
  ]
}), Vr = () => ({
  class: [n("slide-range-track-container")]
}), Fr = () => ({
  class: [n("slide-range-track-body")]
}), Ir = () => ({
  class: [n("slide-range-track"), "back"]
}), Nr = (e) => ({
  class: [n("slide-range-track"), "front"],
  style: { [p("percent")]: `${e.percent}%` }
}), Lr = (e) => ({
  class: [n("slide-range-thumb")],
  style: { [p("percent")]: `${e.percent}%` }
}), Br = () => ({
  class: [n("slide-range-thumb-inner")]
}), Mr = () => ({
  class: [n("slide-range-tooltip")]
}), Ur = (e) => ({
  class: [n("slide-range-tick"), { active: e.active }],
  style: { [p("left")]: `${e.percent}%` }
}), Wt = {
  modelValue: !1,
  size: "standard",
  readonly: !1,
  bounce: 1.5
}, Hr = (e) => ({
  class: [
    n("switch-wrapper"),
    {
      disabled: e.disabled,
      readonly: e.readonly,
      focus: e.focus,
      on: e.modelValue
    },
    { transition: e.transition }
  ],
  style: { [p(["bounce", "ratio"])]: e.bounce }
}), jr = (e) => ({
  class: [
    n(["layer", "switch"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n(["size", e.size]),
    n("switch")
  ]
}), Gr = () => ({ class: [n("switch-icon")] }), Wr = {
  disabled: !1
}, Te = "tabs-state", Et = {
  placement: "top-start",
  variant: "fill",
  margin: () => [0, 0],
  border: () => [2, 0],
  transition: !0,
  size: "standard"
}, qr = (e) => ({
  class: [n("tab"), { active: e.active }]
}), Kr = (e) => ({
  class: [n(["shape", e.shape]), n(["size", e.size])]
}), Xr = (e) => ({
  class: [
    n(["layer", "tabs"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n("tabs"),
    e.placement,
    e.variant,
    { transition: e.transition }
  ]
}), Yr = (e) => {
  let t = e.top - e.margin[0], s = e.left - e.margin[1], r = e.width + e.margin[1] * 2, i = e.height + e.margin[0] * 2;
  return e.variant === "underline" && (e.placement.startsWith("top-") && (t = i - e.border[0]), e.placement.startsWith("bottom-") && (t = 0), (e.placement.startsWith("top-") || e.placement.startsWith("bottom-")) && (i = e.border[0] + 0.5, e.border[1] && (s += (r - e.border[1]) / 2, r = e.border[1])), e.placement.startsWith("left-") && (s = r - e.border[0]), e.placement.startsWith("right-") && (s = 0), (e.placement.startsWith("left-") || e.placement.startsWith("right-")) && (r = e.border[0], e.border[1] && (t += (i - e.border[1]) / 2, i = e.border[1]))), { top: t, left: s, width: r, height: i };
}, Jr = (e) => ({
  [p("highlight-top")]: typeof e.top == "string" ? e.top : e.top + "px",
  [p("highlight-left")]: typeof e.left == "string" ? e.left : e.left + "px",
  [p("highlight-width")]: typeof e.width == "string" ? e.width : e.width + "px",
  [p("highlight-height")]: typeof e.height == "string" ? e.height : e.height + "px",
  [p("highlight-space-x")]: (e.marginX > 0 ? e.marginX : 0) + "px",
  [p("highlight-space-y")]: (e.marginY > 0 ? e.marginY : 0) + "px"
}), Hs = {
  size: "standard",
  variant: "fill"
}, Qr = (e) => ({
  class: [
    n(["layer", "tag"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n("tag"),
    n(["size", e.size])
  ]
}), ye = {
  message: "",
  duration: 2e3,
  variant: "fill"
}, Zr = {
  placement: "bottom-end"
}, ta = (e) => ({
  class: [n("toast"), e.placement]
}), ea = (e) => ({
  class: [
    n(["layer", "toast"]),
    n(["role", e.role + "-" + e.variant]),
    n(["shape", e.shape]),
    n("toast-content"),
    { closing: e.closing }
  ]
}), js = {
  placement: null,
  safe: !0,
  divider: void 0
}, sa = (e) => ({
  class: [
    n(["layer", "toolbar"]),
    n(["role", e.role]),
    n("toolbar"),
    e.placement,
    { safe: e.safe, divider: e.divider }
  ]
}), Se = {
  placement: "top",
  disabled: !1,
  size: "standard"
}, ia = (e) => ({
  class: [
    n(["layer", "tooltip"]),
    n(["role", e.role]),
    n(["shape", e.shape]),
    n(["size", e.size]),
    n("tooltip"),
    { disabled: e.disabled }
  ]
}), ra = (e) => ({
  class: [n("tooltip-content"), e.placement]
}), aa = () => ({
  class: [n("tooltip-trigger")]
});
function Js(e) {
  const t = {}, s = (r) => {
    if (!(!r && r !== 0)) {
      if (typeof r == "string" || typeof r == "number") {
        const i = String(r).trim();
        i && (t[i] = !0);
        return;
      }
      if (Array.isArray(r)) {
        r.forEach(s);
        return;
      }
      if (typeof r == "object")
        for (const [i, a] of Object.entries(r))
          a && (t[i] = !0);
    }
  };
  return s(e), t;
}
function oa(e) {
  return qs(Js(e));
}
function na(e) {
  if (!e) return "";
  if (typeof e == "string") return e;
  const t = {};
  for (const [s, r] of Object.entries(e))
    r != null && (t[s] = String(r));
  return Ks(t);
}
function c(e) {
  return oa(e?.class);
}
function P(e) {
  const t = e?.style;
  if (!t) return "";
  if (typeof t == "string") return t;
  if (Array.isArray(t)) {
    const s = {};
    for (const r of t)
      if (!(!r || typeof r != "object"))
        for (const [i, a] of Object.entries(r))
          a != null && (s[i] = String(a));
    return Ks(s);
  }
  return na(t);
}
const ie = /* @__PURE__ */ new WeakMap();
function Gs(e, t, s) {
  let r = ie.get(e);
  r || (r = /* @__PURE__ */ new Map(), ie.set(e, r)), r.set(t, s);
}
function f(e, t, s) {
  let r = e;
  for (; r; ) {
    const i = ie.get(r);
    if (i?.has(t))
      return i.get(t);
    r = r.parentElement;
  }
  return s;
}
class la {
  constructor(t, s) {
    this.host = t, this.key = s, t.addController(this);
  }
  hostConnected() {
    this.bind();
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
  hostUpdated() {
    this.bind();
  }
  bind() {
    this.unsubscribe?.();
    const t = f(this.host, `${this.key}:notify`);
    if (!t) {
      this.unsubscribe = void 0;
      return;
    }
    const s = () => this.host.requestUpdate();
    t.subscribe(s), this.unsubscribe = () => t.unsubscribe(s);
  }
}
class ca {
  #t = /* @__PURE__ */ new Set();
  subscribe(t) {
    this.#t.add(t);
  }
  unsubscribe(t) {
    this.#t.delete(t);
  }
  notify() {
    for (const t of this.#t) t();
  }
}
function kt(e, t, s) {
  const i = ie.get(e)?.get(`${t}:notify`) ?? new ca();
  return Gs(e, t, s), Gs(e, `${t}:notify`, i), i;
}
function ze() {
  const e = /* @__PURE__ */ new Set();
  return {
    notify() {
      for (const t of e) t();
    },
    subscribe(t) {
      return e.add(t), () => e.delete(t);
    }
  };
}
class u extends ai {
  /** Light DOM — class names from core `get*Attrs()` match global stylesheets. */
  createRenderRoot() {
    return this;
  }
  /** Subscribe to provider updates for the given context key. */
  consume(t) {
    new la(this, t);
  }
}
let qt = null, Kt = !1;
const Pt = ze(), Xt = () => ({
  get data() {
    return qt;
  },
  get visible() {
    return Kt;
  },
  open: (r) => {
    qt = r, setTimeout(() => {
      Kt = !0, Pt.notify();
    }, 50), Pt.notify();
  },
  close: (r) => {
    qt?.onClose?.(r), Kt = !1, Pt.notify();
  },
  choose: (r) => {
    qt?.onChoose?.(r), Kt = !1, Pt.notify();
  },
  subscribe: Pt.subscribe
});
let Yt = null, Jt = !1;
const xt = ze(), Qt = () => ({
  get data() {
    return Yt;
  },
  get visible() {
    return Jt;
  },
  open: (r) => {
    Yt = r, setTimeout(() => {
      Jt = !0, xt.notify();
    }, 50), xt.notify();
  },
  close: (r) => {
    Yt?.onClose?.(), Jt = !1, xt.notify();
  },
  choose: (r) => {
    Yt?.onChoose?.(r), Jt = !1, xt.notify();
  },
  subscribe: xt.subscribe
});
var ha = Object.defineProperty, mt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ha(t, s, i), i;
};
const Ie = class Ie extends u {
  constructor() {
    super(...arguments), this.shape = G.shape, this.divider = G.divider, this.role = G.role, this.triple = G.triple, this.direction = G.direction, this.data = {}, this.appState = {
      shape: G.shape,
      divider: G.divider,
      role: G.role,
      triple: G.triple,
      direction: G.direction,
      rootEl: void 0,
      data: {}
    }, this.onActionClose = (t) => {
      Xt().close(t.detail);
    }, this.onActionChoose = (t) => {
      Xt().choose(t.detail);
    }, this.onDecisionClose = (t) => {
      Qt().close(t.detail);
    }, this.onDecisionChoose = (t) => {
      Qt().choose(t.detail);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.notifier = kt(this, d, this.appState), this.syncAppState(), this.unsubAction = Xt().subscribe(() => this.requestUpdate()), this.unsubDecision = Qt().subscribe(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this.unsubAction?.(), this.unsubDecision?.(), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("shape") || t.has("divider") || t.has("role") || t.has("triple") || t.has("direction") || t.has("data")) && this.syncAppState();
  }
  firstUpdated() {
    this.appState.rootEl = this.rootDiv ?? this, this.notifier?.notify();
  }
  syncAppState() {
    this.appState.shape = this.shape, this.appState.divider = this.divider, this.appState.role = this.role, this.appState.triple = this.triple, this.appState.direction = this.direction, this.appState.data = this.data ?? {}, this.notifier?.notify();
  }
  render() {
    const t = Xt(), s = Qt(), r = ui({ shape: this.shape });
    return h`
      <div class=${c(r)} data-app-root>
        <slot></slot>
        <slot name="global"></slot>
        <t-toast placement="top-start"></t-toast>
        <t-toast placement="bottom-start"></t-toast>
        <t-toast placement="bottom-center"></t-toast>
        <t-toast placement="bottom-end"></t-toast>
        <t-toast placement="top-center"></t-toast>
        <t-toast placement="top-end"></t-toast>
        ${t.data ? h`
              <t-action
                .visible=${t.visible}
                .dismiss=${t.data.dismiss ?? []}
                .actions=${t.data.actions}
                .role=${t.data.role ?? ""}
                .shape=${t.data.shape ?? ""}
                .divider=${t.data.divider}
                .placement=${t.data.placement ?? "bottom"}
                @close=${this.onActionClose}
                @choose=${this.onActionChoose}
              ></t-action>
            ` : v}
        ${s.data ? h`
              <t-decision-modal
                .visible=${s.visible}
                .title=${s.data.title ?? ""}
                .message=${s.data.message}
                .actions=${s.data.actions}
                .dismiss=${s.data.dismiss ?? []}
                .placement=${s.data.placement ?? "center"}
                .role=${s.data.role ?? ""}
                .shape=${s.data.shape ?? ""}
                .divider=${s.data.divider}
                .direction=${s.data.direction ?? "row"}
                .keepalive=${s.data.keepalive ?? !1}
                @close=${this.onDecisionClose}
                @choose=${this.onDecisionChoose}
              ></t-decision-modal>
            ` : v}
      </div>
    `;
  }
};
Ie.tagName = "t-app";
let q = Ie;
mt([
  o({ type: String })
], q.prototype, "shape");
mt([
  o({ type: Boolean })
], q.prototype, "divider");
mt([
  o({ type: String })
], q.prototype, "role");
mt([
  o({ type: Boolean })
], q.prototype, "triple");
mt([
  o({ type: String })
], q.prototype, "direction");
mt([
  o({ attribute: !1 })
], q.prototype, "data");
mt([
  Y("[data-app-root]")
], q.prototype, "rootDiv");
let _t = 1e3;
const da = () => ({
  get index() {
    return _t;
  },
  newIndex: () => (_t += 2, _t),
  resetIndex: () => (_t = 1e3, _t)
});
var pa = Object.defineProperty, O = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && pa(t, s, i), i;
};
const Ne = class Ne extends u {
  constructor() {
    super(...arguments), this.keepalive = gt.keepalive, this.visible = gt.visible, this.backdrop = gt.backdrop, this.placement = gt.placement, this.teleport = "", this.duration = gt.duration, this.className = "", this.bounce = gt.bounce, this.isBounced = !1, this.zIndex = 0, this.isShow = !1, this.isReadyBackdrop = !1, this.isTeleportReady = !1, this.styles = { ...er }, this.open = () => {
      this.backdropReadyTimer = setTimeout(() => {
        this.isReadyBackdrop = !0, this.renderPortal();
      }, 300);
      const t = `${this.duration / 1e3}s`;
      if (this.bounce && !this.isBounced) {
        this.isBounced = !0;
        let s = this.bounce;
        typeof this.bounce == "boolean" && (s = "16px"), (this.placement === "bottom" || this.placement === "right") && (s = `calc(${this.bounce} * -1)`), this.applyRender({
          backdropTransitionDuration: t,
          backdropOpacity: void 0,
          presentTranslate: String(s),
          presentTransitionDuration: t,
          presentOpacity: 1
        }), this.bounceTimer = setTimeout(() => {
          this.applyRender({ presentTranslate: "0px" });
        }, this.duration);
        return;
      }
      this.applyRender({
        backdropOpacity: void 0,
        backdropTransitionDuration: t,
        presentTranslate: "0px",
        presentTransitionDuration: t,
        presentOpacity: 1
      });
    }, this.close = () => {
      this.isReadyBackdrop = !1, this.isBounced = !1;
      const t = `${this.duration / 1e3}s`;
      let s = "0px", r = 1;
      this.placement === "bottom" || this.placement === "right" ? s = "100%" : this.placement === "top" || this.placement === "left" ? s = "-100%" : this.placement === "center" && (s = "0px", r = 0), this.applyRender({
        backdropOpacity: 0,
        backdropTransitionDuration: t,
        presentTranslate: s,
        presentTransitionDuration: t,
        presentOpacity: r
      });
    }, this.onClickBackdrop = (t) => {
      t.preventDefault(), this.isReadyBackdrop && this.dispatchEvent(new CustomEvent("close", { detail: "backdrop", bubbles: !0, composed: !0 }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.portalRoot = document.createElement("div"), this.syncTeleportReady(), this.visible ? (this.createIndex(), this.isShow = !0, this.openDelayTimer = setTimeout(() => this.open(), 100)) : this.close();
  }
  disconnectedCallback() {
    this.clearTimers(), this.portalRoot && (fe(v, this.portalRoot), this.portalRoot.remove()), super.disconnectedCallback();
  }
  updated(t) {
    t.has("teleport") && this.syncTeleportReady(), t.has("visible") && (this.visible ? (this.createIndex(), this.isShow = !0, this.openDelayTimer = setTimeout(() => this.open(), 100)) : (this.close(), this.hideTimer = setTimeout(() => {
      this.isShow = !1, this.renderPortal();
    }, this.duration))), this.syncPortalTarget(), this.renderPortal();
  }
  firstUpdated() {
    this.isTeleportReady || requestAnimationFrame(() => {
      this.syncTeleportReady(), this.syncPortalTarget(), this.renderPortal();
    });
  }
  /** Host element for teleported slot content (used by Modal gesture setup). */
  getContentHost() {
    return this.presentContentHost;
  }
  /** Vue-compatible `render()` — also serves as Lit template when called with no args. */
  render(t) {
    return t !== void 0 ? (this.applyRender(t), v) : v;
  }
  applyRender(t) {
    t.backdropTransitionDuration !== void 0 && (this.styles.backdropTransitionDuration = t.backdropTransitionDuration), t.presentTransitionDuration !== void 0 && (this.styles.presentTransitionDuration = t.presentTransitionDuration), t.backdropOpacity !== void 0 && (this.styles.backdropOpacity = t.backdropOpacity), t.presentTranslate !== void 0 && (this.styles.presentTranslate = t.presentTranslate), t.presentOpacity !== void 0 && (this.styles.presentOpacity = t.presentOpacity), this.renderPortal();
  }
  get appState() {
    return f(this, d);
  }
  get timeCss() {
    return `${this.duration / 1e3}s`;
  }
  get isRender() {
    return this.isShow || this.keepalive;
  }
  clearTimers() {
    this.backdropReadyTimer && clearTimeout(this.backdropReadyTimer), this.hideTimer && clearTimeout(this.hideTimer), this.openDelayTimer && clearTimeout(this.openDelayTimer), this.bounceTimer && clearTimeout(this.bounceTimer);
  }
  createIndex() {
    (this.zIndex === 0 || !this.keepalive) && (this.zIndex = da().newIndex());
  }
  syncTeleportReady() {
    if (this.teleport) {
      this.isTeleportReady = !!document.querySelector(this.teleport);
      return;
    }
    if (this.appState?.rootEl) {
      this.isTeleportReady = !0;
      return;
    }
    this.isTeleportReady = !!document.querySelector(Ls());
  }
  resolveTeleportTarget() {
    return this.teleport ? document.querySelector(this.teleport) : this.appState?.rootEl ? this.appState.rootEl : document.querySelector(Ls());
  }
  syncPortalTarget() {
    if (!this.portalRoot) return;
    const t = this.resolveTeleportTarget();
    t && this.portalRoot.parentElement !== t && t.appendChild(this.portalRoot);
  }
  adoptChildrenIntoPresent() {
    if (!this.presentContentHost) return;
    const t = Array.from(this.childNodes);
    for (const s of t)
      this.presentContentHost.appendChild(s);
  }
  renderPortal() {
    if (!this.portalRoot) return;
    if (!this.isTeleportReady || !this.isRender) {
      fe(v, this.portalRoot), this.presentContentHost = void 0;
      return;
    }
    const t = sr({
      zIndex: this.zIndex - 1,
      backdropTransitionDuration: this.styles.backdropTransitionDuration,
      backdropOpacity: this.backdrop === "transparent" ? 0 : this.styles.backdropOpacity
    }), s = ir({
      zIndex: this.zIndex,
      presentTransitionDuration: this.styles.presentTransitionDuration,
      presentTranslate: this.styles.presentTranslate,
      presentOpacity: this.styles.presentOpacity,
      className: this.className,
      placement: this.placement,
      style: this.overlayStyle
    });
    fe(
      h`
        ${this.backdrop !== "none" ? h`<div
              class=${c(t)}
              style=${P(t)}
              ?hidden=${!this.isShow}
              @click=${this.onClickBackdrop}
            ></div>` : v}
        <div
          class=${c(s)}
          style=${P(s)}
          ?hidden=${!this.isShow}
        ></div>
      `,
      this.portalRoot
    ), this.presentContentHost = this.portalRoot.lastElementChild, this.adoptChildrenIntoPresent();
  }
};
Ne.tagName = "t-present";
let k = Ne;
O([
  o({ type: Boolean })
], k.prototype, "keepalive");
O([
  o({ type: Boolean })
], k.prototype, "visible");
O([
  o({ type: String })
], k.prototype, "backdrop");
O([
  o({ type: String })
], k.prototype, "placement");
O([
  o({ type: String })
], k.prototype, "teleport");
O([
  o({ type: Number })
], k.prototype, "duration");
O([
  o({ attribute: "class-name" })
], k.prototype, "className");
O([
  o({ attribute: !1 })
], k.prototype, "overlayStyle");
O([
  o({ attribute: !1 })
], k.prototype, "bounce");
O([
  m()
], k.prototype, "isBounced");
O([
  m()
], k.prototype, "zIndex");
O([
  m()
], k.prototype, "isShow");
O([
  m()
], k.prototype, "isReadyBackdrop");
O([
  m()
], k.prototype, "isTeleportReady");
var ua = Object.defineProperty, E = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ua(t, s, i), i;
};
const Le = class Le extends u {
  constructor() {
    super(...arguments), this.role = "", this.shape = "", this.visible = Q.visible, this.gesture = Q.gesture, this.fullscreen = Q.fullscreen, this.placement = Q.placement, this.keepalive = Q.keepalive, this.backdrop = Q.backdrop, this.indicator = Q.indicator, this.duration = Q.duration, this.className = "", this.bounce = Q.bounce, this.isBusy = !1, this.isMoving = !1, this.onClose = (t) => {
      this.dispatchEvent(new CustomEvent("close", { detail: t.detail, bubbles: !0, composed: !0 }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  disconnectedCallback() {
    this.destroyGesture(), this.busyTimer && clearTimeout(this.busyTimer), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("visible") || t.has("gesture") || t.has("placement")) && this.syncGesture();
  }
  get appState() {
    return f(this, d);
  }
  get gestureDir() {
    if (this.placement === "bottom") return "down";
    if (this.placement === "top") return "up";
    if (this.placement === "left") return "left";
    if (this.placement === "right") return "right";
  }
  get modalAttrs() {
    const t = this.shape || this.appState?.shape || "", s = this.role || this.appState?.role || "";
    return Zi({
      role: s,
      shape: t,
      placement: this.placement,
      fullscreen: this.fullscreen,
      className: this.className,
      style: this.overlayStyle
    });
  }
  hasScrollableOverflow(t) {
    return Qi.includes(t);
  }
  isScrollable(t, s) {
    const r = getComputedStyle(t);
    return s === "y" ? t.scrollHeight > t.clientHeight && this.hasScrollableOverflow(r.overflowY) : t.scrollWidth > t.clientWidth && this.hasScrollableOverflow(r.overflowX);
  }
  hasRemainingScroll(t, s) {
    return s === "down" ? t.scrollTop > 0 : s === "up" ? t.scrollTop < t.scrollHeight - t.clientHeight : s === "right" ? t.scrollLeft > 0 : t.scrollLeft < t.scrollWidth - t.clientWidth;
  }
  canStartGesture(t) {
    if (!this.modalEl || !this.gestureDir) return !0;
    const s = t.target;
    if (!(s instanceof Element)) return !0;
    const r = this.gestureDir === "left" || this.gestureDir === "right" ? "x" : "y";
    let i = s;
    for (; i && i !== this.modalEl; ) {
      if (i instanceof HTMLElement && this.isScrollable(i, r) && this.hasRemainingScroll(i, this.gestureDir))
        return !1;
      i = i.parentElement;
    }
    return !0;
  }
  busy() {
    this.isBusy = !0, this.busyTimer = setTimeout(() => {
      this.isBusy = !1;
    }, 300);
  }
  destroyGesture() {
    this.ges?.destroy(), this.ges = void 0;
  }
  syncGesture() {
    this.destroyGesture(), this.modalEl = this.presentEl?.getContentHost()?.querySelector(".t-modal"), this.modalEl && (this.ges = Bt(this.modalEl, {
      options: { minDist: 30 },
      beforeEvent: (t) => !(this.isBusy || !this.gesture || this.placement === "center" || !this.canStartGesture(t)),
      down: () => {
        this.isMoving = !1;
      },
      fast: ({ initialDirection: t }) => {
        this.busy(), t === this.gestureDir ? this.dispatchEvent(new CustomEvent("close", { detail: "gesture", bubbles: !0, composed: !0 })) : this.presentEl?.open();
      },
      move: ({ deltaY: t, deltaX: s, initialDirection: r }) => {
        if (r !== this.gestureDir) return;
        let i = 0;
        this.placement === "bottom" || this.placement === "top" ? i = t : i = s, this.placement === "bottom" && (i = t > 0 ? t : 0), this.placement === "top" && (i = t < 0 ? t : 0), this.placement === "left" && (i = s < 0 ? s : 0), this.placement === "right" && (i = s > 0 ? s : 0), (this.placement === "bottom" && (i >= 10 || this.isMoving) || this.placement === "top" && (i <= -10 || this.isMoving) || this.placement === "left" && (i <= -10 || this.isMoving) || this.placement === "right" && (i >= 10 || this.isMoving)) && (this.isMoving = !0, this.presentEl?.render({
          presentTranslate: `${i}px`,
          presentTransitionDuration: "0s"
        }));
      },
      up: ({ deltaY: t, deltaX: s, initialDirection: r }) => {
        if (this.isMoving = !1, this.busy(), r !== this.gestureDir) {
          this.presentEl?.open();
          return;
        }
        let i, a;
        this.placement === "bottom" || this.placement === "top" ? (i = this.modalEl.offsetHeight, a = t) : (i = this.modalEl.offsetWidth, a = s), a / i * 100 > 50 ? this.dispatchEvent(new CustomEvent("close", { detail: "gesture", bubbles: !0, composed: !0 })) : this.presentEl?.open();
      },
      cancel: () => {
        this.isMoving = !1, this.busy(), this.presentEl?.open();
      }
    }));
  }
  render() {
    return h`
      <t-present
        .duration=${this.duration}
        .bounce=${this.bounce}
        class-name=${this.className}
        .placement=${this.placement}
        backdrop=${this.backdrop}
        .visible=${this.visible}
        .keepalive=${this.keepalive}
        .overlayStyle=${this.overlayStyle}
        @close=${this.onClose}
      >
        <slot name="extra" slot="extra"></slot>
        ${this.gesture && this.indicator && this.placement !== "center" ? h`<t-gesture-indicator .placement=${this.placement}></t-gesture-indicator>` : v}
        <div class=${c(this.modalAttrs)}>
          <slot></slot>
        </div>
      </t-present>
    `;
  }
};
Le.tagName = "t-modal";
let S = Le;
E([
  o({ type: String })
], S.prototype, "role");
E([
  o({ type: String })
], S.prototype, "shape");
E([
  o({ type: Boolean })
], S.prototype, "visible");
E([
  o({ type: Boolean })
], S.prototype, "gesture");
E([
  o({ type: Boolean })
], S.prototype, "fullscreen");
E([
  o({ type: String })
], S.prototype, "placement");
E([
  o({ type: Boolean })
], S.prototype, "keepalive");
E([
  o({ type: String })
], S.prototype, "backdrop");
E([
  o({ type: Boolean })
], S.prototype, "indicator");
E([
  o({ type: Number })
], S.prototype, "duration");
E([
  o({ attribute: "class-name" })
], S.prototype, "className");
E([
  o({ attribute: !1 })
], S.prototype, "overlayStyle");
E([
  o({ attribute: !1 })
], S.prototype, "bounce");
E([
  m()
], S.prototype, "isBusy");
E([
  m()
], S.prototype, "isMoving");
E([
  Y("t-present")
], S.prototype, "presentEl");
var ma = Object.defineProperty, Qs = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ma(t, s, i), i;
};
const Be = class Be extends u {
  constructor() {
    super(...arguments), this.placement = Ui.placement, this.role = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get gestureIndicatorAttrs() {
    const t = this.role || this.appState?.role || "";
    return Hi({ role: t, placement: this.placement });
  }
  render() {
    return h`<div class=${c(this.gestureIndicatorAttrs)}></div>`;
  }
};
Be.tagName = "t-gesture-indicator";
let zt = Be;
Qs([
  o({ type: String })
], zt.prototype, "placement");
Qs([
  o({ type: String })
], zt.prototype, "role");
var fa = Object.defineProperty, va = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && fa(t, s, i), i;
};
const Me = class Me extends u {
  constructor() {
    super(...arguments), this.options = Gi.options();
  }
  get flexAttrs() {
    return Yi(this.options ?? []);
  }
  render() {
    const t = this.flexAttrs;
    return h`<div class=${c(t)} style=${P(t)}><slot></slot></div>`;
  }
};
Me.tagName = "t-flex";
let re = Me;
va([
  o({ type: Array })
], re.prototype, "options");
var ga = Object.defineProperty, ba = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ga(t, s, i), i;
};
const Ue = class Ue extends u {
  constructor() {
    super(...arguments), this.options = ji.options();
  }
  get flexItemAttrs() {
    return Ji(this.options ?? []);
  }
  render() {
    const t = this.flexItemAttrs;
    return h`<div class=${c(t)} style=${P(t)}><slot></slot></div>`;
  }
};
Ue.tagName = "t-flex-item";
let ae = Ue;
ba([
  o({ type: Array })
], ae.prototype, "options");
var ya = Object.defineProperty, Sa = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ya(t, s, i), i;
};
const He = class He extends u {
  constructor() {
    super(...arguments), this.options = qi.options();
  }
  get gridAttrs() {
    return Ki(this.options ?? []);
  }
  render() {
    const t = this.gridAttrs;
    return h`<div class=${c(t)} style=${P(t)}><slot></slot></div>`;
  }
};
He.tagName = "t-grid";
let oe = He;
Sa([
  o({ type: Array })
], oe.prototype, "options");
var $a = Object.defineProperty, ka = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && $a(t, s, i), i;
};
const je = class je extends u {
  constructor() {
    super(...arguments), this.options = Wi.options();
  }
  get gridItemAttrs() {
    return Xi(this.options ?? []);
  }
  render() {
    const t = this.gridItemAttrs;
    return h`<div class=${c(t)} style=${P(t)}><slot></slot></div>`;
  }
};
je.tagName = "t-grid-item";
let ne = je;
ka([
  o({ type: Array })
], ne.prototype, "options");
var Ca = Object.defineProperty, ft = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ca(t, s, i), i;
};
const Ge = class Ge extends u {
  constructor() {
    super(...arguments), this.role = "", this.size = Ut.size, this.shape = "", this.block = Ut.block, this.loading = Ut.loading, this.variant = Ut.variant, this.focused = !1, this.onFocus = () => {
      this.focused = !0;
    }, this.onBlur = () => {
      this.focused = !1;
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get buttonAttrs() {
    const t = this.shape || this.appState?.shape || "", s = this.role || this.appState?.role || "";
    return fi({
      role: s,
      shape: t,
      variant: this.variant,
      size: this.size,
      block: this.block,
      focus: this.focused
    });
  }
  get loaderAttrs() {
    return vi();
  }
  render() {
    return h`
      <button
        class=${c(this.buttonAttrs)}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
      >
        ${this.loading ? h`<span class=${c(this.loaderAttrs)}><slot name="loading"></slot></span>` : h`<span><slot></slot></span>`}
      </button>
    `;
  }
};
Ge.tagName = "t-button";
let K = Ge;
ft([
  o({ type: String })
], K.prototype, "role");
ft([
  o({ type: String })
], K.prototype, "size");
ft([
  o({ type: String })
], K.prototype, "shape");
ft([
  o({ type: Boolean })
], K.prototype, "block");
ft([
  o({ type: Boolean })
], K.prototype, "loading");
ft([
  o({ type: String })
], K.prototype, "variant");
ft([
  m()
], K.prototype, "focused");
var Aa = Object.defineProperty, Zs = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Aa(t, s, i), i;
};
const We = class We extends u {
  constructor() {
    super(...arguments), this.keyboard = be.keyboard, this.placement = be.placement, this.cableState = {
      placement: be.placement
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.notifier = kt(this, Ce, this.cableState), this.cableState.placement = this.placement;
  }
  updated(t) {
    t.has("placement") && (this.cableState.placement = this.placement, this.notifier?.notify());
  }
  render() {
    return h`<div class=${c(gi({ placement: this.placement }))}><slot></slot></div>`;
  }
};
We.tagName = "t-cable";
let Dt = We;
Zs([
  o({ type: Boolean })
], Dt.prototype, "keyboard");
Zs([
  o({ type: String })
], Dt.prototype, "placement");
var Ta = Object.defineProperty, pe = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ta(t, s, i), i;
};
const qe = class qe extends u {
  constructor() {
    super(...arguments), this.placement = js.placement, this.safe = js.safe, this.role = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.consume(Ce);
  }
  get appState() {
    return f(this, d);
  }
  get cableState() {
    return f(this, Ce);
  }
  get toolbarAttrs() {
    const t = this.role || this.appState?.role || "", s = this.placement || this.cableState?.placement || "", r = (this.divider !== void 0 ? this.divider : this.appState?.divider) ?? !1;
    return sa({
      role: t,
      placement: s,
      safe: this.safe,
      divider: r
    });
  }
  render() {
    return h`<div class=${c(this.toolbarAttrs)}><slot></slot></div>`;
  }
};
qe.tagName = "t-toolbar";
let dt = qe;
pe([
  o({ type: String })
], dt.prototype, "placement");
pe([
  o({ type: Boolean })
], dt.prototype, "safe");
pe([
  o({ type: String })
], dt.prototype, "role");
pe([
  o({ type: Boolean })
], dt.prototype, "divider");
var Ea = Object.defineProperty, ue = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ea(t, s, i), i;
};
const Ke = class Ke extends u {
  constructor() {
    super(...arguments), this.role = "", this.shape = "", this.width = Us.width, this.height = Us.height;
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get skeletonAttrs() {
    return zr({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      width: this.width,
      height: this.height
    });
  }
  render() {
    const t = this.skeletonAttrs;
    return h`<div class=${c(t)} style=${P(t)}></div>`;
  }
};
Ke.tagName = "t-skeleton";
let pt = Ke;
ue([
  o({ type: String })
], pt.prototype, "role");
ue([
  o({ type: String })
], pt.prototype, "shape");
ue([
  o({ type: String })
], pt.prototype, "width");
ue([
  o({ type: String })
], pt.prototype, "height");
var Pa = Object.defineProperty, _ = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Pa(t, s, i), i;
};
const Xe = class Xe extends u {
  constructor() {
    super(...arguments), this.placement = Et.placement, this.variant = Et.variant, this.role = "", this.modelValue = "", this.border = [2, 0], this.margin = [0, 0], this.shape = "", this.transition = Et.transition, this.size = Et.size, this.width = 0, this.height = 0, this.top = 0, this.left = 0, this.isFirstRender = !0, this.tabsState = {
      activeValue: "",
      role: "",
      shape: "",
      size: Et.size,
      setValue: (t) => {
        this.dispatchEvent(
          new CustomEvent("update:modelValue", { detail: t, bubbles: !0, composed: !0 })
        );
      }
    }, this.resizeHandler = () => this.calcPosition(), this.calcPosition = () => {
      if (!this.container) return;
      const t = this.container.querySelector(".active");
      t && (this.width = t.offsetWidth, this.height = t.offsetHeight, this.left = t.getBoundingClientRect().left - this.container.getBoundingClientRect().left + this.container.scrollLeft, this.top = t.getBoundingClientRect().top - this.container.getBoundingClientRect().top + this.container.scrollTop);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.notifier = kt(this, Te, this.tabsState), this.syncProviderState(), window.addEventListener("resize", this.resizeHandler), setTimeout(() => {
      this.isFirstRender = !1;
    }, 500);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.resizeHandler), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("modelValue") || t.has("role") || t.has("shape") || t.has("size")) && this.syncProviderState(), t.has("modelValue") && requestAnimationFrame(() => this.calcPosition());
  }
  firstUpdated() {
    requestAnimationFrame(() => this.calcPosition());
  }
  get appState() {
    return f(this, d);
  }
  syncProviderState() {
    this.tabsState.activeValue = this.modelValue || "", this.tabsState.role = this.role || this.appState?.role || "", this.tabsState.shape = this.shape || this.appState?.shape || "", this.tabsState.size = this.size, this.notifier?.notify();
  }
  get tabsAttrs() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "", r = Yr({
      top: this.top,
      left: this.left,
      width: this.width,
      height: this.height,
      margin: this.margin,
      border: this.border,
      variant: this.variant,
      placement: this.placement
    });
    return {
      ...Xr({
        role: t,
        shape: s,
        placement: this.placement,
        variant: this.variant,
        transition: this.isFirstRender ? !1 : this.transition
      }),
      style: Jr({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        marginX: this.margin[1],
        marginY: this.margin[0]
      })
    };
  }
  render() {
    return h`
      <ul class=${c(this.tabsAttrs)} style=${P(this.tabsAttrs)}>
        <slot></slot>
      </ul>
    `;
  }
};
Xe.tagName = "t-tabs";
let $ = Xe;
_([
  o({ type: String })
], $.prototype, "placement");
_([
  o({ type: String })
], $.prototype, "variant");
_([
  o({ type: String })
], $.prototype, "role");
_([
  o({ type: String, attribute: "model-value" })
], $.prototype, "modelValue");
_([
  o({ attribute: !1 })
], $.prototype, "border");
_([
  o({ attribute: !1 })
], $.prototype, "margin");
_([
  o({ type: String })
], $.prototype, "shape");
_([
  o({ type: Boolean })
], $.prototype, "transition");
_([
  o({ type: String })
], $.prototype, "size");
_([
  m()
], $.prototype, "width");
_([
  m()
], $.prototype, "height");
_([
  m()
], $.prototype, "top");
_([
  m()
], $.prototype, "left");
_([
  m()
], $.prototype, "isFirstRender");
_([
  Y("ul")
], $.prototype, "container");
var xa = Object.defineProperty, ti = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && xa(t, s, i), i;
};
const Ye = class Ye extends u {
  constructor() {
    super(...arguments), this.value = "", this.disabled = Wr.disabled, this.handleClick = () => {
      this.disabled || this.tabsState?.setValue(this.value || "");
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(Te);
  }
  get tabsState() {
    return f(this, Te);
  }
  get isActive() {
    return this.tabsState?.activeValue === this.value;
  }
  get tabAttrs() {
    return qr({ active: this.isActive });
  }
  get buttonAttrs() {
    const t = this.tabsState?.shape || "", s = this.tabsState?.size || "standard";
    return Kr({ shape: t, size: s });
  }
  render() {
    return h`
      <li class=${c(this.tabAttrs)}>
        <button class=${c(this.buttonAttrs)} @click=${this.handleClick}>
          <slot></slot>
        </button>
      </li>
    `;
  }
};
Ye.tagName = "t-tab";
let Vt = Ye;
ti([
  o({ type: String })
], Vt.prototype, "value");
ti([
  o({ type: Boolean })
], Vt.prototype, "disabled");
var _a = Object.defineProperty, tt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && _a(t, s, i), i;
};
const Je = class Je extends u {
  constructor() {
    super(...arguments), this.modelValue = Wt.modelValue, this.role = "", this.shape = "", this.size = Wt.size, this.disabled = !1, this.readonly = Wt.readonly, this.bounce = Wt.bounce, this.focused = !1, this.isFirstRender = !0, this.onSwitch = () => {
      this.disabled || this.readonly || this.dispatchEvent(
        new CustomEvent("update:modelValue", {
          detail: !this.modelValue,
          bubbles: !0,
          composed: !0
        })
      );
    }, this.onFocus = () => {
      this.disabled || this.readonly || (this.focused = !0);
    }, this.onBlur = () => {
      this.disabled || this.readonly || (this.focused = !1);
    }, this.onKeydown = (t) => {
      t.key !== " " && t.key !== "Enter" || (t.preventDefault(), this.onSwitch());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), setTimeout(() => {
      this.isFirstRender = !1;
    }, 500);
  }
  get appState() {
    return f(this, d);
  }
  get switchWrapperAttrs() {
    return Hr({
      disabled: this.disabled,
      readonly: this.readonly,
      focus: this.focused,
      modelValue: this.modelValue,
      transition: !this.isFirstRender,
      bounce: this.bounce
    });
  }
  get switchAttrs() {
    return jr({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size
    });
  }
  get switchIconAttrs() {
    return Gr();
  }
  render() {
    const t = this.switchWrapperAttrs;
    return h`
      <div
        class=${c(t)}
        style=${P(t)}
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.modelValue}
        @pointerup=${this.onSwitch}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${c(this.switchAttrs)}>
          <div class=${c(this.switchIconAttrs)}></div>
        </div>
        <slot></slot>
      </div>
    `;
  }
};
Je.tagName = "t-switch";
let F = Je;
tt([
  o({ type: Boolean })
], F.prototype, "modelValue");
tt([
  o({ type: String })
], F.prototype, "role");
tt([
  o({ type: String })
], F.prototype, "shape");
tt([
  o({ type: String })
], F.prototype, "size");
tt([
  o({ type: Boolean })
], F.prototype, "disabled");
tt([
  o({ type: Boolean })
], F.prototype, "readonly");
tt([
  o({ type: Number })
], F.prototype, "bounce");
tt([
  m()
], F.prototype, "focused");
tt([
  m()
], F.prototype, "isFirstRender");
var wa = Object.defineProperty, it = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && wa(t, s, i), i;
};
const Qe = class Qe extends u {
  constructor() {
    super(...arguments), this.modelValue = Tt.modelValue, this.role = "", this.shape = "", this.size = Tt.size, this.variant = Tt.variant, this.disabled = Tt.disabled, this.readonly = Tt.readonly, this.focused = !1, this.onCheckbox = () => {
      this.disabled || this.readonly || this.dispatchEvent(
        new CustomEvent("update:modelValue", {
          detail: !this.modelValue,
          bubbles: !0,
          composed: !0
        })
      );
    }, this.onFocus = () => {
      this.disabled || this.readonly || (this.focused = !0, this.dispatchEvent(new CustomEvent("focus", { bubbles: !0, composed: !0 })));
    }, this.onBlur = () => {
      this.disabled || this.readonly || (this.focused = !1, this.dispatchEvent(new CustomEvent("blur", { bubbles: !0, composed: !0 })));
    }, this.onKeydown = (t) => {
      t.key !== " " && t.key !== "Enter" || (t.preventDefault(), this.onCheckbox());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get checkboxAttrs() {
    return ki({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
      variant: this.variant,
      modelValue: this.modelValue,
      disabled: this.disabled,
      readonly: this.readonly,
      focus: this.focused
    });
  }
  get checkboxIconAttrs() {
    return Ci();
  }
  render() {
    return h`
      <div
        class=${c(this.checkboxAttrs)}
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.modelValue}
        @pointerup=${this.onCheckbox}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${c(this.checkboxIconAttrs)}></div>
        <slot></slot>
      </div>
    `;
  }
};
Qe.tagName = "t-checkbox";
let N = Qe;
it([
  o({ type: Boolean })
], N.prototype, "modelValue");
it([
  o({ type: String })
], N.prototype, "role");
it([
  o({ type: String })
], N.prototype, "shape");
it([
  o({ type: String })
], N.prototype, "size");
it([
  o({ type: String })
], N.prototype, "variant");
it([
  o({ type: Boolean })
], N.prototype, "disabled");
it([
  o({ type: Boolean })
], N.prototype, "readonly");
it([
  m()
], N.prototype, "focused");
var Oa = Object.defineProperty, rt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Oa(t, s, i), i;
};
const Ra = {
  fromAttribute(e) {
    if (e === null) return "";
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  },
  toAttribute(e) {
    return String(e);
  }
}, Ze = class Ze extends u {
  constructor() {
    super(...arguments), this.value = "", this.role = "", this.size = Bs.size, this.shape = "", this.variant = "", this.disabled = Bs.disabled, this.readonly = !1, this.isFocused = !1, this.onRadio = () => {
      this.effectiveDisabled || this.effectiveReadonly || !this.radioGroupState || this.radioGroupState.setValue(this.value);
    }, this.onFocus = () => {
      this.effectiveDisabled || this.effectiveReadonly || (this.isFocused = !0);
    }, this.onBlur = () => {
      this.effectiveDisabled || this.effectiveReadonly || (this.isFocused = !1);
    }, this.onKeydown = (t) => {
      t.key !== " " && t.key !== "Enter" || (t.preventDefault(), this.onRadio());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.consume(Ae);
  }
  get appState() {
    return f(this, d);
  }
  get radioGroupState() {
    return f(this, Ae);
  }
  get effectiveDisabled() {
    return this.disabled || (this.radioGroupState?.disabled ?? !1);
  }
  get effectiveReadonly() {
    return this.readonly || (this.radioGroupState?.readonly ?? !1);
  }
  get radioAttrs() {
    const t = this.radioGroupState, s = this.role || t?.role || this.appState?.role || "", r = this.shape || t?.shape || this.appState?.shape || "", i = this.variant || t?.variant || "", a = t?.modelValue === this.value;
    return rr({
      role: s,
      shape: r,
      size: this.size,
      variant: i,
      checked: a,
      disabled: this.effectiveDisabled,
      readonly: this.effectiveReadonly,
      focus: this.isFocused
    });
  }
  render() {
    const t = this.effectiveDisabled;
    return h`
      <div
        class=${c(this.radioAttrs)}
        tabindex=${t ? -1 : 0}
        @pointerup=${this.onRadio}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @keydown=${this.onKeydown}
      >
        <div class=${c(ar())}></div>
        <slot></slot>
      </div>
    `;
  }
};
Ze.tagName = "t-radio";
let L = Ze;
rt([
  o({ converter: Ra })
], L.prototype, "value");
rt([
  o({ type: String })
], L.prototype, "role");
rt([
  o({ type: String })
], L.prototype, "size");
rt([
  o({ type: String })
], L.prototype, "shape");
rt([
  o({ type: String })
], L.prototype, "variant");
rt([
  o({ type: Boolean })
], L.prototype, "disabled");
rt([
  o({ type: Boolean })
], L.prototype, "readonly");
rt([
  m()
], L.prototype, "isFocused");
var za = Object.defineProperty, vt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && za(t, s, i), i;
};
const ts = class ts extends u {
  constructor() {
    super(...arguments), this.role = "", this.shape = "", this.variant = ct.variant, this.disabled = ct.disabled, this.readonly = ct.readonly, this.direction = ct.direction, this.groupState = {
      modelValue: void 0,
      role: "",
      shape: "",
      variant: ct.variant,
      disabled: ct.disabled,
      readonly: ct.readonly,
      setValue: (t) => {
        this.dispatchEvent(
          new CustomEvent("update:modelValue", { detail: t, bubbles: !0, composed: !0 })
        );
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.notifier = kt(this, Ae, this.groupState), this.syncGroupState();
  }
  updated(t) {
    this.syncGroupState(), (t.has("modelValue") || t.has("role") || t.has("shape") || t.has("variant") || t.has("disabled") || t.has("readonly")) && this.notifier?.notify();
  }
  get appState() {
    return f(this, d);
  }
  syncGroupState() {
    this.groupState.modelValue = this.modelValue, this.groupState.role = this.role || this.appState?.role || "", this.groupState.shape = this.shape || this.appState?.shape || "", this.groupState.variant = this.variant, this.groupState.disabled = this.disabled, this.groupState.readonly = this.readonly;
  }
  get radioGroupAttrs() {
    return or({ direction: this.direction });
  }
  render() {
    return h`<div class=${c(this.radioGroupAttrs)}><slot></slot></div>`;
  }
};
ts.tagName = "t-radio-group";
let X = ts;
vt([
  o({ attribute: "model-value" })
], X.prototype, "modelValue");
vt([
  o({ type: String })
], X.prototype, "role");
vt([
  o({ type: String })
], X.prototype, "shape");
vt([
  o({ type: String })
], X.prototype, "variant");
vt([
  o({ type: Boolean })
], X.prototype, "disabled");
vt([
  o({ type: Boolean })
], X.prototype, "readonly");
vt([
  o({ type: String })
], X.prototype, "direction");
var Da = Object.defineProperty, De = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Da(t, s, i), i;
}, Lt;
const es = class es extends u {
  constructor() {
    super(...arguments);
    Ds(this, Lt);
    this.role = "", this.shape = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  updated(s) {
    Vs(this, Lt, kt(this, Rt, this.cardProviderState)), zs(this, Lt).notify();
  }
  get appState() {
    return f(this, d);
  }
  get effectiveDivider() {
    return this.hasAttribute("divider") ? this.divider ?? !1 : this.appState?.divider ?? !1;
  }
  get effectiveShape() {
    return this.shape || this.appState?.shape || "";
  }
  get effectiveRole() {
    return this.role || this.appState?.role || "";
  }
  get cardProviderState() {
    return {
      role: this.effectiveRole,
      shape: this.effectiveShape,
      divider: this.effectiveDivider
    };
  }
  get cardAttrs() {
    return bi(this.cardProviderState);
  }
  render() {
    return h`<div class=${c(this.cardAttrs)}><slot></slot></div>`;
  }
};
Lt = new WeakMap(), es.tagName = "t-card";
let St = es;
De([
  o({ type: String })
], St.prototype, "role");
De([
  o({ type: String })
], St.prototype, "shape");
De([
  o({ type: Boolean, reflect: !0 })
], St.prototype, "divider");
const ss = class ss extends u {
  render() {
    const t = $i();
    return h`<div class=${c(t)}><slot></slot></div>`;
  }
};
ss.tagName = "t-card-body";
let Ee = ss;
const is = class is extends u {
  connectedCallback() {
    super.connectedCallback(), this.consume(Rt);
  }
  get cardState() {
    return f(this, Rt);
  }
  get cardHeaderAttrs() {
    return yi({ divider: this.cardState?.divider ?? !1 });
  }
  render() {
    return h`<div class=${c(this.cardHeaderAttrs)}><slot></slot></div>`;
  }
};
is.tagName = "t-card-header";
let Pe = is;
const rs = class rs extends u {
  connectedCallback() {
    super.connectedCallback(), this.consume(Rt);
  }
  get cardState() {
    return f(this, Rt);
  }
  get cardFooterAttrs() {
    return Si({ divider: this.cardState?.divider ?? !1 });
  }
  render() {
    return h`<div class=${c(this.cardFooterAttrs)}><slot></slot></div>`;
  }
};
rs.tagName = "t-card-footer";
let xe = rs, wt = [], Va = 1;
const $e = ze(), ke = () => ({
  get messages() {
    return wt;
  },
  open: (s) => {
    wt = [...wt, { ...s, id: Va++ }], $e.notify();
  },
  close: (s) => {
    wt = wt.filter((r) => r.id !== s), $e.notify();
  },
  subscribe: $e.subscribe
});
var Fa = Object.defineProperty, Ia = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Fa(t, s, i), i;
};
const as = class as extends u {
  constructor() {
    super(...arguments), this.placement = Zr.placement, this.dismiss = (t) => {
      ke().close(t);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = ke().subscribe(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this.unsubscribe?.(), super.disconnectedCallback();
  }
  get toastMessages() {
    return ke().messages.filter((t) => t.placement === this.placement);
  }
  render() {
    return this.toastMessages.length === 0 ? v : h`
      <div class=${c(ta({ placement: this.placement }))}>
        <slot name="content">
          ${this.toastMessages.map(
      (t) => h`
              <t-toast-content
                .toastId=${t.id ?? 0}
                .message=${t.message}
                .duration=${t.duration ?? 2e3}
                .role=${t.role ?? ""}
                .variant=${t.variant ?? "fill"}
                .placement=${t.placement ?? this.placement}
                .shape=${t.shape ?? ""}
                @close=${() => this.dismiss(t.id)}
              ></t-toast-content>
            `
    )}
        </slot>
      </div>
    `;
  }
};
as.tagName = "t-toast";
let le = as;
Ia([
  o({ type: String })
], le.prototype, "placement");
var Na = Object.defineProperty, at = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Na(t, s, i), i;
};
const os = class os extends u {
  constructor() {
    super(...arguments), this.toastId = 0, this.message = ye.message, this.duration = ye.duration, this.role = "", this.shape = "", this.variant = ye.variant, this.placement = "", this.isClosing = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.closeTimer = setTimeout(() => {
      this.isClosing = !0, this.dismissTimer = setTimeout(() => {
        this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
      }, 500);
    }, this.duration);
  }
  disconnectedCallback() {
    this.closeTimer && clearTimeout(this.closeTimer), this.dismissTimer && clearTimeout(this.dismissTimer), super.disconnectedCallback();
  }
  get appState() {
    return f(this, d);
  }
  get contentAttrs() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "";
    return ea({
      role: t,
      shape: s,
      variant: this.variant,
      closing: this.isClosing
    });
  }
  render() {
    return h`<div class=${c(this.contentAttrs)}>${this.message}</div>`;
  }
};
os.tagName = "t-toast-content";
let B = os;
at([
  o({ type: Number, attribute: "toast-id" })
], B.prototype, "toastId");
at([
  o({ type: String })
], B.prototype, "message");
at([
  o({ type: Number })
], B.prototype, "duration");
at([
  o({ type: String })
], B.prototype, "role");
at([
  o({ type: String })
], B.prototype, "shape");
at([
  o({ type: String })
], B.prototype, "variant");
at([
  o({ type: String })
], B.prototype, "placement");
at([
  m()
], B.prototype, "isClosing");
var La = Object.defineProperty, Mt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && La(t, s, i), i;
};
const ns = class ns extends u {
  constructor() {
    super(...arguments), this.role = "", this.shape = "", this.size = Is.size, this.src = Is.src;
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get effectiveDivider() {
    return this.hasAttribute("divider") ? this.divider ?? !1 : this.appState?.divider ?? !1;
  }
  get avatarAttrs() {
    return mi({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      divider: this.effectiveDivider,
      size: this.size,
      src: this.src
    });
  }
  render() {
    const t = this.avatarAttrs;
    return h`
      <div class=${c(t)} style=${P(t)}>
        <slot></slot>
      </div>
    `;
  }
};
ns.tagName = "t-avatar";
let st = ns;
Mt([
  o({ type: String })
], st.prototype, "role");
Mt([
  o({ type: String })
], st.prototype, "shape");
Mt([
  o({ type: String })
], st.prototype, "size");
Mt([
  o({ type: String })
], st.prototype, "src");
Mt([
  o({ type: Boolean, reflect: !0 })
], st.prototype, "divider");
var Ba = Object.defineProperty, ei = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ba(t, s, i), i;
};
const ls = class ls extends u {
  constructor() {
    super(...arguments), this.role = "", this.direction = Ri.direction;
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  render() {
    const t = zi({
      role: this.role || this.appState?.role || "",
      direction: this.direction
    });
    return h`<div class=${c(t)}></div>`;
  }
};
ls.tagName = "t-divider";
let Ft = ls;
ei([
  o({ type: String })
], Ft.prototype, "role");
ei([
  o({ type: String })
], Ft.prototype, "direction");
var Ma = Object.defineProperty, Ve = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ma(t, s, i), i;
};
const cs = class cs extends u {
  constructor() {
    super(...arguments), this.src = "", this.defaultSrc = "", this.dataSrc = "", this.onError = () => {
      this.resolvedDefaultSrc && (this.dataSrc = this.resolvedDefaultSrc);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), this.dataSrc = this.src ?? "";
  }
  willUpdate(t) {
    t.has("src") && (this.dataSrc = this.src ?? "");
  }
  get appState() {
    return f(this, d);
  }
  get resolvedDefaultSrc() {
    const t = this.appState?.data;
    return this.defaultSrc || t?.errorImageUrl || "";
  }
  render() {
    return h`<img src=${this.dataSrc} @error=${this.onError} />`;
  }
};
cs.tagName = "t-image";
let $t = cs;
Ve([
  o({ type: String })
], $t.prototype, "src");
Ve([
  o({ type: String, attribute: "default-src" })
], $t.prototype, "defaultSrc");
Ve([
  m()
], $t.prototype, "dataSrc");
var Ua = Object.defineProperty, ot = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ua(t, s, i), i;
};
const hs = class hs extends u {
  constructor() {
    super(...arguments), this.visible = Fs.visible, this.dismiss = [], this.actions = [], this.role = "", this.shape = "", this.placement = Fs.placement, this.pop = !1, this.onClose = (t) => {
      const s = t.detail;
      this.dismiss?.includes(s) ? this.dispatchEvent(new CustomEvent("close", { detail: s, bubbles: !0, composed: !0 })) : s === "backdrop" && (this.pop = !0, setTimeout(() => {
        this.pop = !1;
      }, 300));
    }, this.onChoose = (t) => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 })), t.handler?.(), this.dispatchEvent(new CustomEvent("choose", { detail: t, bubbles: !0, composed: !0 }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get actionAttrs() {
    const t = (this.divider !== void 0 ? this.divider : this.appState?.divider) ?? !1, s = this.shape || this.appState?.shape || "", r = this.role || this.appState?.role || "";
    return pi({
      role: r,
      shape: s,
      placement: this.placement,
      divider: t,
      pop: this.pop
    });
  }
  render() {
    const t = this.shape || this.appState?.shape || "";
    return h`
      <t-present
        .placement=${this.placement}
        backdrop="display"
        .keepalive=${!1}
        .visible=${this.visible}
        @close=${this.onClose}
      >
        <div class=${c(this.actionAttrs)}>
          <slot name="body">
            ${this.actions.map(
      (s) => h`
                <t-form-group direction="vertical">
                  ${s.map(
        (r) => h`
                      <t-button
                        .role=${r.role ?? ""}
                        .variant=${r.variant ?? "fill"}
                        .shape=${t}
                        block
                        @click=${() => this.onChoose(r)}
                        >${r.text ?? ""}</t-button
                      >
                    `
      )}
                </t-form-group>
              `
    )}
          </slot>
        </div>
      </t-present>
    `;
  }
};
hs.tagName = "t-action";
let M = hs;
ot([
  o({ type: Boolean })
], M.prototype, "visible");
ot([
  o({ attribute: !1 })
], M.prototype, "dismiss");
ot([
  o({ attribute: !1 })
], M.prototype, "actions");
ot([
  o({ type: String })
], M.prototype, "role");
ot([
  o({ type: String })
], M.prototype, "shape");
ot([
  o({ type: Boolean })
], M.prototype, "divider");
ot([
  o({ type: String })
], M.prototype, "placement");
ot([
  m()
], M.prototype, "pop");
var Ha = Object.defineProperty, I = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ha(t, s, i), i;
};
const ds = class ds extends u {
  constructor() {
    super(...arguments), this.visible = Ht.visible, this.title = "", this.message = "", this.actions = [], this.dismiss = [], this.placement = Ht.placement, this.role = "", this.shape = "", this.direction = Ht.direction, this.keepalive = Ht.keepalive, this.pop = !1, this.onClose = (t) => {
      const s = t.detail;
      this.dismiss?.includes(s) ? this.dispatchEvent(new CustomEvent("close", { detail: s, bubbles: !0, composed: !0 })) : s === "backdrop" && (this.pop = !0, setTimeout(() => {
        this.pop = !1;
      }, 300));
    }, this.onChoose = (t) => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 })), t.handler?.(), this.dispatchEvent(new CustomEvent("choose", { detail: t, bubbles: !0, composed: !0 }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get shapeValue() {
    return this.shape || this.appState?.shape || "";
  }
  get dividerValue() {
    return (this.divider !== void 0 ? this.divider : this.appState?.divider) ?? !1;
  }
  get decisionModalAttrs() {
    const t = this.role || this.appState?.role || "";
    return xi({
      role: t,
      shape: this.shapeValue,
      pop: this.pop,
      divider: this.dividerValue
    });
  }
  render() {
    const t = _i(), s = wi(), r = Oi({ direction: this.direction });
    return h`
      <t-present
        .placement=${this.placement}
        backdrop="display"
        .keepalive=${this.keepalive}
        .visible=${this.visible}
        @close=${this.onClose}
      >
        <div class=${c(this.decisionModalAttrs)}>
          <slot name="header">
            ${this.title ? h`<div class=${c(t)}>${this.title}</div>` : v}
          </slot>
          <slot name="body">
            <div class=${c(s)}>${this.message}</div>
          </slot>
          <slot name="footer">
            <div class=${c(r)}>
              ${this.actions.map(
      (i) => h`
                  <t-button
                    .role=${i.role ?? ""}
                    .variant=${i.variant ?? "fill"}
                    .shape=${this.shapeValue}
                    @click=${() => this.onChoose(i)}
                    >${i.text ?? ""}</t-button
                  >
                `
    )}
            </div>
          </slot>
        </div>
      </t-present>
    `;
  }
};
ds.tagName = "t-decision-modal";
let x = ds;
I([
  o({ type: Boolean })
], x.prototype, "visible");
I([
  o({ type: String })
], x.prototype, "title");
I([
  o({ type: String })
], x.prototype, "message");
I([
  o({ attribute: !1 })
], x.prototype, "actions");
I([
  o({ attribute: !1 })
], x.prototype, "dismiss");
I([
  o({ type: String })
], x.prototype, "placement");
I([
  o({ type: String })
], x.prototype, "role");
I([
  o({ type: String })
], x.prototype, "shape");
I([
  o({ type: Boolean })
], x.prototype, "divider");
I([
  o({ type: String })
], x.prototype, "direction");
I([
  o({ type: Boolean })
], x.prototype, "keepalive");
I([
  m()
], x.prototype, "pop");
var ja = Object.defineProperty, b = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ja(t, s, i), i;
};
const ps = class ps extends u {
  constructor() {
    super(...arguments), this.modelValue = W.modelValue, this.name = "", this.variant = W.variant, this.role = "", this.shape = "", this.size = W.size, this.direction = "", this.id = "", this.value = "", this.placeholder = W.placeholder, this.disabled = W.disabled, this.readonly = W.readonly, this.autocomplete = "", this.type = W.type, this.line = W.line, this.maxLine = W.maxLine, this.message = W.message, this.isFocus = !1, this.content = "", this.onFocus = (t) => {
      this.disabled || (this.isFocus = !0, this.dispatchEvent(new CustomEvent("focus", { detail: t, bubbles: !0, composed: !0 })));
    }, this.onBlur = (t) => {
      this.disabled || (this.isFocus = !1, this.dispatchEvent(new CustomEvent("blur", { detail: t, bubbles: !0, composed: !0 })));
    }, this.onInput = (t) => {
      const s = t.target;
      this.content = s.value, this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: this.content, bubbles: !0, composed: !0 })
      ), this.dispatchEvent(new CustomEvent("input", { detail: t, bubbles: !0, composed: !0 }));
    }, this.onBeforeinput = (t) => {
      this.dispatchEvent(new CustomEvent("beforeinput", { detail: t, bubbles: !0, composed: !0 }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  willUpdate(t) {
    (t.has("modelValue") || t.has("value")) && (this.content = this.rawContent);
  }
  get appState() {
    return f(this, d);
  }
  get rawContent() {
    const t = this.modelValue;
    if (t != null && t !== "") return String(t);
    const s = this.value;
    return s != null && s !== "" ? String(s) : "";
  }
  get fieldAttrs() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "", r = this.direction || this.appState?.direction || "left";
    return Fi({
      role: t,
      shape: s,
      size: this.size,
      direction: r,
      variant: this.variant,
      type: this.type,
      disabled: this.disabled,
      focus: this.isFocus || this.classList.contains("focus"),
      readonly: this.readonly,
      line: Number(this.line),
      maxLine: this.maxLine !== void 0 ? Number(this.maxLine) : void 0
    });
  }
  get fieldInputAttrs() {
    return {
      ...Ni(),
      name: this.name,
      id: this.id,
      placeholder: this.placeholder,
      autocomplete: this.autocomplete,
      type: this.type,
      readonly: this.readonly,
      disabled: this.disabled,
      maxlength: this.maxLength,
      tabindex: this.tabindex
    };
  }
  renderDefaultInput() {
    const t = c(this.fieldInputAttrs), s = {
      input: this.onInput,
      focus: this.onFocus,
      blur: this.onBlur,
      beforeinput: this.onBeforeinput
    };
    return this.type === "paragraph" ? h`<textarea
        class=${t}
        name=${this.name || v}
        id=${this.id || v}
        placeholder=${this.placeholder || v}
        autocomplete=${this.autocomplete || v}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        maxlength=${this.maxLength ?? v}
        tabindex=${this.tabindex ?? v}
        rows=${this.line}
        .value=${this.content}
        @input=${s.input}
        @focus=${s.focus}
        @blur=${s.blur}
        @beforeinput=${s.beforeinput}
      ></textarea>` : h`<input
      class=${t}
      type=${this.type}
      name=${this.name || v}
      id=${this.id || v}
      placeholder=${this.placeholder || v}
      autocomplete=${this.autocomplete || v}
      ?readonly=${this.readonly}
      ?disabled=${this.disabled}
      maxlength=${this.maxLength ?? v}
      tabindex=${this.tabindex ?? v}
      .value=${this.content}
      @input=${s.input}
      @focus=${s.focus}
      @blur=${s.blur}
      @beforeinput=${s.beforeinput}
    />`;
  }
  render() {
    return h`
      <div class=${c(this.fieldAttrs)}>
        <div class=${c(Ii())}>
          <slot name="start-input"></slot>
          <slot name="input">${this.renderDefaultInput()}</slot>
          <slot name="end-input"></slot>
        </div>
        ${this.message ? h`<div class=${c(Li())}>${this.message}</div>` : v}
        <slot></slot>
      </div>
    `;
  }
};
ps.tagName = "t-field";
let g = ps;
b([
  o({ attribute: "model-value" })
], g.prototype, "modelValue");
b([
  o({ type: String })
], g.prototype, "name");
b([
  o({ type: String })
], g.prototype, "variant");
b([
  o({ type: String })
], g.prototype, "role");
b([
  o({ type: String })
], g.prototype, "shape");
b([
  o({ type: String })
], g.prototype, "size");
b([
  o({ type: String })
], g.prototype, "direction");
b([
  o({ type: String })
], g.prototype, "id");
b([
  o({ type: String })
], g.prototype, "value");
b([
  o({ type: String })
], g.prototype, "placeholder");
b([
  o({ type: Boolean })
], g.prototype, "disabled");
b([
  o({ type: Boolean })
], g.prototype, "readonly");
b([
  o({ type: String })
], g.prototype, "autocomplete");
b([
  o({ type: Number })
], g.prototype, "maxLength");
b([
  o({ type: Number })
], g.prototype, "tabindex");
b([
  o({ type: String })
], g.prototype, "type");
b([
  o({ type: Number })
], g.prototype, "line");
b([
  o({ type: Number })
], g.prototype, "maxLine");
b([
  o({ type: String })
], g.prototype, "message");
b([
  m()
], g.prototype, "isFocus");
b([
  m()
], g.prototype, "content");
var Ga = Object.defineProperty, R = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ga(t, s, i), i;
};
const us = class us extends u {
  constructor() {
    super(...arguments), this.length = ht.length, this.variant = ht.variant, this.size = ht.size, this.disabled = ht.disabled, this.readonly = ht.readonly, this.type = ht.type, this.role = "", this.shape = "", this.message = ht.message, this.pattern = [], this.direction = "", this.keepValue = [], this.onFieldClick = () => {
      this.focusInput(this.firstEmptyIndex);
    }, this.onSegmentFocus = (t, s) => {
      this.dispatchEvent(new CustomEvent("focus", { detail: t, bubbles: !0, composed: !0 })), this.getFieldInput(s)?.select?.();
    }, this.onSegmentBeforeinput = (t, s) => {
      if (this.disabled || this.readonly) return;
      const r = t, { inputType: i } = r;
      if (i === "insertText" && r.data != null) {
        r.preventDefault(), r.data.length > 1 ? this.handlePaste(r.data, s) : this.applyChar(s, r.data);
        return;
      }
      if (i === "insertFromPaste" && r.dataTransfer) {
        r.preventDefault();
        const a = r.dataTransfer.getData("text");
        this.handlePaste(a, s);
        return;
      }
      if (i === "deleteContentBackward") {
        r.preventDefault();
        const a = [...this.segments];
        if (a[s]) {
          a[s] = "", this.updateValue(a);
          return;
        }
        s > 0 && (a[s - 1] = "", this.updateValue(a), this.focusInput(s - 1));
      }
    }, this.onSegmentInput = (t, s) => {
      if (this.disabled || this.readonly) return;
      const r = t.target;
      if (!r) return;
      const i = r.value, a = this.segments[s] ?? "";
      if (!i) {
        a || this.setCell(s, "");
        return;
      }
      if (i.length > 1) {
        this.handlePaste(i, s);
        return;
      }
      i !== a && this.applyChar(s, i);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get segments() {
    const t = this.modelValue !== void 0 ? this.modelValue : this.value !== void 0 ? this.value : this.keepValue;
    return Array.from({ length: this.length }, (s, r) => t?.[r] ?? "");
  }
  get firstEmptyIndex() {
    const t = this.segments.findIndex((s) => !s);
    return t === -1 ? this.length - 1 : t;
  }
  get wrapperAttrs() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "", r = this.direction || this.appState?.direction || "left";
    return Er({
      role: t,
      shape: s,
      direction: r,
      variant: this.variant,
      size: this.size,
      disabled: this.disabled
    });
  }
  get fieldProps() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "";
    return {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
      shape: s,
      role: t,
      type: this.type,
      maxLength: 1,
      autocomplete: "off"
    };
  }
  normalizeChar(t, s) {
    if (!t) return "";
    const r = t.slice(-1), i = this.pattern?.[s] ?? this.pattern?.[0];
    return i && !new RegExp(i).test(r) ? "" : r;
  }
  getFieldInput(t) {
    return this.querySelectorAll("t-field")[t]?.querySelector("input, textarea") ?? null;
  }
  async syncFieldInputs() {
    await this.updateComplete;
    for (let t = 0; t < this.length; t++) {
      const s = this.getFieldInput(t);
      s && (s.value = this.segments[t] ?? "");
    }
  }
  async updateValue(t) {
    const s = Array.from({ length: this.length }, (r, i) => t[i] ?? "");
    this.keepValue = s, this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: s, bubbles: !0, composed: !0 })
    ), this.dispatchEvent(new CustomEvent("input", { detail: s, bubbles: !0, composed: !0 })), s.every((r) => r) && this.dispatchEvent(new CustomEvent("complete", { detail: s, bubbles: !0, composed: !0 })), await this.syncFieldInputs();
  }
  async focusInput(t) {
    if (this.disabled || this.readonly) return;
    const s = Math.max(0, Math.min(t, this.length - 1));
    await this.updateComplete;
    const r = this.getFieldInput(s);
    r?.focus(), r?.select?.();
  }
  setCell(t, s) {
    const r = [...this.segments];
    r[t] = s, this.updateValue(r);
  }
  applyChar(t, s) {
    const r = this.normalizeChar(s, t);
    r && (this.setCell(t, r), t < this.length - 1 && this.focusInput(t + 1));
  }
  handlePaste(t, s) {
    const r = t.replace(/\s/g, "").split("");
    if (!r.length) return;
    const i = [...this.segments];
    let a = s;
    for (const l of r) {
      if (a >= this.length) break;
      const y = this.normalizeChar(l, a);
      y && (i[a] = y, a += 1);
    }
    this.updateValue(i), this.focusInput(Math.min(a, this.length - 1));
  }
  render() {
    const t = this.fieldProps, s = Array.from({ length: this.length }, (r, i) => i);
    return h`
      <div class=${c(this.wrapperAttrs)}>
        <div class=${c(Pr())} @pointerup=${this.onFieldClick}>
          ${Re(
      s,
      (r) => r,
      (r) => h`
              <t-field
                .variant=${t.variant}
                .size=${t.size}
                ?disabled=${t.disabled}
                ?readonly=${t.readonly}
                shape=${t.shape}
                role=${t.role}
                type=${t.type}
                .maxLength=${t.maxLength}
                autocomplete=${t.autocomplete}
                .modelValue=${this.segments[r]}
                .tabindex=${r === this.firstEmptyIndex ? 0 : -1}
                @beforeinput=${(i) => this.onSegmentBeforeinput(i, r)}
                @input=${(i) => this.onSegmentInput(i, r)}
                @focus=${(i) => this.onSegmentFocus(i, r)}
              ></t-field>
            `
    )}
        </div>
        ${this.message ? h`<div class=${c(xr())}>${this.message}</div>` : v}
      </div>
    `;
  }
};
us.tagName = "t-segmented-field";
let C = us;
R([
  o({ attribute: "model-value", type: Array })
], C.prototype, "modelValue");
R([
  o({ type: Array })
], C.prototype, "value");
R([
  o({ type: Number })
], C.prototype, "length");
R([
  o({ type: String })
], C.prototype, "variant");
R([
  o({ type: String })
], C.prototype, "size");
R([
  o({ type: Boolean })
], C.prototype, "disabled");
R([
  o({ type: Boolean })
], C.prototype, "readonly");
R([
  o({ type: String })
], C.prototype, "type");
R([
  o({ type: String })
], C.prototype, "role");
R([
  o({ type: String })
], C.prototype, "shape");
R([
  o({ type: String })
], C.prototype, "message");
R([
  o({ type: Array })
], C.prototype, "pattern");
R([
  o({ type: String })
], C.prototype, "direction");
R([
  m()
], C.prototype, "keepValue");
const ms = class ms extends u {
  render() {
    const t = Pi();
    return h`<div class=${c(t)}><slot></slot></div>`;
  }
};
ms.tagName = "t-container";
let _e = ms;
var Wa = Object.defineProperty, qa = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Wa(t, s, i), i;
};
const fs = class fs extends u {
  constructor() {
    super(...arguments), this.refreshing = !1, this.isPulling = !1, this.close = () => {
      this.refreshing = !1;
    }, this.refresh = () => (this.refreshing = !0, this.close), this.end = () => {
      this.dispatchEvent(
        new CustomEvent("end", { detail: { refresh: this.refresh }, bubbles: !0, composed: !0 })
      );
    }, this.cancel = () => {
      this.isPulling = !1, this.refreshing = !1, this.dispatchEvent(new CustomEvent("cancel", { bubbles: !0, composed: !0 }));
    };
  }
  disconnectedCallback() {
    this.ges?.destroy(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.bindGesture();
  }
  bindGesture() {
    this.ges?.destroy(), this.container && (this.ges = Bt(
      this.container,
      {
        options: { minMove: 20 },
        beforeEvent: () => this.isPulling ? !0 : !((this.container?.scrollTop || 0) > 0),
        down: () => {
          this.refreshing || (this.isPulling = (this.container?.scrollTop || 0) <= 0, this.isPulling && this.dispatchEvent(new CustomEvent("start", { bubbles: !0, composed: !0 })));
        },
        move: ({ deltaY: t, initialDirection: s }) => {
          if (this.refreshing || !this.isPulling || s !== "down") return;
          const r = t < 0 ? 0 : t;
          this.dispatchEvent(
            new CustomEvent("move", {
              detail: { refresh: this.refresh, offset: r },
              bubbles: !0,
              composed: !0
            })
          );
        },
        up: ({ initialDirection: t }) => {
          const s = this.isPulling;
          if (this.isPulling = !1, !(this.refreshing || !s)) {
            if (t !== "down") {
              this.cancel();
              return;
            }
            this.end();
          }
        },
        cancel: () => {
          this.isPulling = !1, !this.refreshing && this.cancel();
        }
      },
      { passive: !1 }
    ));
  }
  render() {
    return h`<div class=${c(nr())} data-refresher><slot></slot></div>`;
  }
};
fs.tagName = "t-refresher";
let ce = fs;
qa([
  Y("[data-refresher]")
], ce.prototype, "container");
const se = (e) => e.map((t) => ({
  ...t,
  stack: se(t.stack)
}));
var Ka = Object.defineProperty, J = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ka(t, s, i), i;
};
const Zt = -40, vs = class vs extends u {
  constructor() {
    super(...arguments), this.direction = Gt.direction, this.variant = Gt.variant, this.keepalive = Gt.keepalive, this.gesture = Gt.gesture, this.name = "", this.stack = [], this.activeIndex = 0, this.backdropIndex = 0, this.transform = {
      back: Zt,
      prepare: 100,
      active: 0,
      backdrop: 0,
      duration: void 0
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(ee);
  }
  disconnectedCallback() {
    this.ges?.destroy(), super.disconnectedCallback();
  }
  firstUpdated() {
    const t = f(this, ee);
    this.changeRoute(se(t?.stack ?? [])), this.initGesture();
  }
  updated(t) {
    (t.has("direction") || t.has("variant") || t.has("gesture")) && (this.ges?.destroy(), this.initGesture());
    const s = f(this, ee);
    s?.stack && s.stack !== this.lastProviderStack && (this.lastProviderStack = s.stack, this.changeRoute(se(s.stack)));
  }
  get navigatorAttrs() {
    return hr({
      direction: this.direction,
      variant: this.variant,
      moving: this.transform.active !== 0,
      transform: this.transform
    });
  }
  get componentAttrs() {
    return dr({ direction: this.direction });
  }
  get backdropAttrs() {
    return pr({ zIndex: this.backdropIndex * 2 + 99 });
  }
  get prevPage() {
    return this.activeIndex > 0 ? this.stack.at(this.activeIndex - 1) ?? null : null;
  }
  get isGestureEnabled() {
    return this.variant === "swipe" && this.gesture && !!this.prevPage;
  }
  emitTransform() {
    this.dispatchEvent(
      new CustomEvent("transform", { detail: { ...this.transform }, bubbles: !0, composed: !0 })
    );
  }
  changeRoute(t) {
    const s = se(t);
    if (this.stack.length === 0) {
      this.stack = s, this.activeIndex = Math.max(0, s.length - 1), this.backdropIndex = this.activeIndex;
      return;
    }
    if (this.stack.length === s.length) {
      this.stack = s;
      return;
    }
    if (s.length < this.stack.length) {
      this.transform.duration = void 0, this.transform.active = 0, this.transform.back = Zt, this.transform.prepare = 100, this.transform.backdrop = 0, this.emitTransform(), this.activeIndex = Math.max(0, s.length - 1), this.backdropIndex = this.activeIndex, setTimeout(() => {
        this.stack = s;
      }, 400);
      return;
    }
    s.length > this.stack.length && (this.stack = s, setTimeout(() => {
      this.activeIndex = Math.max(0, s.length - 1), this.backdropIndex = this.activeIndex;
    }, 50));
  }
  commitGestureBack() {
    if (this.activeIndex <= 0) return;
    const t = 250;
    this.transform.duration = `${t / 1e3}s`, this.transform.active = 100, this.transform.back = 0, this.transform.backdrop = 0, this.emitTransform(), setTimeout(() => this.goBack(), t);
  }
  goBack() {
    this.activeIndex <= 0 || this.router?.back();
  }
  resetTransform() {
    this.transform.back = Zt, this.transform.prepare = 100, this.transform.active = 0, this.transform.duration = void 0, this.emitTransform();
  }
  move(t) {
    const s = this.navigatorEl?.offsetWidth ?? 0;
    let r = 0;
    this.direction === "left" || this.direction === "right" ? r = Math.abs(t.deltaX) / s * 100 : r = Math.abs(t.deltaY) / s * 100, this.transform.back = (100 - r) * Zt / 100, this.transform.active = r, this.transform.backdrop = 100 - this.transform.active, this.transform.duration = "0s", this.emitTransform();
  }
  up(t) {
    const s = this.navigatorEl?.offsetWidth ?? 0;
    let r = 0;
    this.direction === "left" || this.direction === "right" ? r = Math.abs(t.deltaX) / s * 100 : r = Math.abs(t.deltaY) / s * 100, r >= 60 ? this.commitGestureBack() : this.resetTransform();
  }
  initGesture() {
    this.navigatorEl && (this.ges = Bt(
      this.navigatorEl,
      {
        options: { trackOutsideElement: !0 },
        beforeEvent: (t) => t.target?.closest("input, textarea, select, button, [contenteditable]") || !this.isGestureEnabled ? !1 : (t.stopPropagation(), !0),
        fast: ({ initialDirection: t }) => {
          !t || t !== this.direction || this.commitGestureBack();
        },
        move: ({ deltaX: t, deltaY: s, initialDirection: r, event: i }) => {
          !r || r !== this.direction || (i.cancelable && i.preventDefault(), this.move({ deltaX: t, deltaY: s }));
        },
        up: ({ deltaX: t, deltaY: s, initialDirection: r }) => {
          !r || r !== this.direction || this.up({ deltaX: t, deltaY: s });
        },
        cancel: () => {
          this.resetTransform();
        }
      },
      {
        element: { passive: !1 },
        move: { passive: !1 }
      }
    ));
  }
  render() {
    return h`
      <div class=${c(this.navigatorAttrs)} style=${P(this.navigatorAttrs)} data-navigator>
        ${this.stack.map((t, s) => {
      const r = {
        ...this.componentAttrs,
        class: [
          this.componentAttrs.class,
          {
            active: s === this.activeIndex,
            prepare: s === this.activeIndex + 1,
            back: s === this.activeIndex - 1
          }
        ]
      };
      return h`
            <div class=${c(r)} style=${`z-index:${s * 2 + 100}`} name=${t.name}>
              <t-route-provider .stack=${t.stack}>
                <t-route-outlet .component=${t.component}></t-route-outlet>
              </t-route-provider>
            </div>
          `;
    })}
        <div class=${c(this.backdropAttrs)} style=${P(this.backdropAttrs)}></div>
      </div>
    `;
  }
};
vs.tagName = "t-route-navigator";
let D = vs;
J([
  o({ type: String })
], D.prototype, "direction");
J([
  o({ type: String })
], D.prototype, "variant");
J([
  o({ type: Boolean })
], D.prototype, "keepalive");
J([
  o({ type: Boolean })
], D.prototype, "gesture");
J([
  o({ type: String })
], D.prototype, "name");
J([
  o({ attribute: !1 })
], D.prototype, "router");
J([
  m()
], D.prototype, "stack");
J([
  m()
], D.prototype, "activeIndex");
J([
  m()
], D.prototype, "backdropIndex");
J([
  Y("[data-navigator]")
], D.prototype, "navigatorEl");
var Xa = Object.defineProperty, si = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Xa(t, s, i), i;
};
const gs = class gs extends u {
  updated(t) {
    t.has("component") && this.mountComponent();
  }
  firstUpdated() {
    this.mountComponent();
  }
  async resolveComponent(t) {
    if (typeof t != "function") return t;
    const s = await t();
    return s?.default ?? s;
  }
  async resolveFromProp(t) {
    if (t == null) return null;
    const s = typeof t == "object" && t !== null && "default" in t ? t.default : t;
    return this.resolveComponent(s);
  }
  async mountComponent() {
    if (!this.outlet) return;
    this.outlet.replaceChildren();
    const t = await this.resolveFromProp(this.component);
    if (t != null) {
      if (typeof t == "string") {
        this.outlet.appendChild(document.createElement(t));
        return;
      }
      if (typeof t == "function")
        try {
          const s = new t();
          this.outlet.appendChild(s);
        } catch {
        }
    }
  }
  render() {
    return h`<div data-outlet><slot></slot></div>`;
  }
};
gs.tagName = "t-route-outlet";
let It = gs;
si([
  o({ attribute: !1 })
], It.prototype, "component");
si([
  Y("[data-outlet]")
], It.prototype, "outlet");
var Ya = Object.defineProperty, Ja = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Ya(t, s, i), i;
};
const bs = class bs extends u {
  constructor() {
    super(...arguments), this.stack = [], this.providerState = { stack: [] };
  }
  connectedCallback() {
    super.connectedCallback(), this.notifier = kt(this, ee, this.providerState), this.providerState.stack = this.stack;
  }
  updated() {
    this.providerState.stack = this.stack, this.notifier?.notify();
  }
  render() {
    return h`<slot></slot>`;
  }
};
bs.tagName = "t-route-provider";
let he = bs;
Ja([
  o({ attribute: !1 })
], he.prototype, "stack");
let te = [];
const we = (e, t) => {
  if (e.length === 0) return [];
  if (t.length > 1 && t[t.length - 2]?.name === e[0].name && t.pop(), t.length > 0 && t[t.length - 1] && t[t.length - 1].name === e[0].name) {
    const s = [...e];
    s.shift(), t[t.length - 1].stack = we(s, t[t.length - 1].stack);
  } else {
    const s = [...e], r = String(s[0].name), i = s[0].component;
    s.shift(), t.push({
      name: r,
      component: i,
      stack: we(s, [])
    });
  }
  return t;
}, Qa = () => ({
  get stack() {
    return te;
  },
  updateRoutes: (s) => {
    te = we([...s], [...te]);
  },
  resetStack: () => {
    te = [];
  }
});
var Za = Object.defineProperty, ii = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && Za(t, s, i), i;
};
const ys = class ys extends u {
  constructor() {
    super(...arguments), this.homeRouteName = lr.homeRouteName, this.wrapper = Qa(), this.mounted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubRoute = this.router?.onChange?.(() => this.syncFromRouter());
  }
  disconnectedCallback() {
    this.unsubRoute?.(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.mounted = !0, this.bootstrapStack();
  }
  updated(t) {
    t.has("router") && this.mounted && (this.unsubRoute?.(), this.unsubRoute = this.router?.onChange?.(() => this.syncFromRouter()), this.syncFromRouter());
  }
  bootstrapStack() {
    if (!this.router) return;
    const t = this.homeRouteName, s = this.router.currentRoute;
    if (s.name === t || s.path === t) {
      this.wrapper.updateRoutes(this.router.matched ?? []), this.requestUpdate();
      return;
    }
    const r = this.router.resolve?.({ name: t });
    r?.matched.length && this.wrapper.updateRoutes(r.matched), setTimeout(() => {
      this.wrapper.updateRoutes(this.router?.matched ?? []), this.requestUpdate();
    }, 50);
  }
  syncFromRouter() {
    this.router?.matched && (this.wrapper.updateRoutes(this.router.matched), this.requestUpdate());
  }
  render() {
    return h`
      <t-route-provider .stack=${this.wrapper.stack}>
        <slot></slot>
      </t-route-provider>
    `;
  }
};
ys.tagName = "t-route-wrapper";
let Nt = ys;
ii([
  o({ type: String, attribute: "home-route-name" })
], Nt.prototype, "homeRouteName");
ii([
  o({ attribute: !1 })
], Nt.prototype, "router");
var to = Object.defineProperty, j = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && to(t, s, i), i;
};
const Ss = class Ss extends u {
  constructor() {
    super(...arguments), this.direction = bt.direction, this.size = bt.size, this.thumbSize = bt.thumbSize, this.minThumb = bt.minThumb, this.autoHide = bt.autoHide, this.hideDelay = bt.hideDelay, this.role = "", this.dragging = null, this.hovered = !1, this.scrolling = !1, this.metrics = {
      clientWidth: 0,
      clientHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0
    }, this.sessions = {}, this.frame = 0, this.resizeObserver = null, this.mutationObserver = null, this.dragOrigin = 0, this.dragEndAt = Number.NEGATIVE_INFINITY, this.userSelect = "", this.thumbSelector = Sr(), this.update = () => {
      this.schedule();
    }, this.schedule = () => {
      this.frame || (this.frame = requestAnimationFrame(() => {
        this.frame = 0, this.measure();
      }));
    }, this.measure = () => {
      this.content && Object.assign(this.metrics, $r(this.content));
    }, this.onScroll = (t) => {
      this.content && (this.metrics.scrollLeft = this.content.scrollLeft, this.metrics.scrollTop = this.content.scrollTop, this.schedule(), this.reveal(), this.dispatchEvent(new CustomEvent("scroll", { detail: t, bubbles: !0, composed: !0 })));
    }, this.onWheel = (t) => {
      if (!this.content) return;
      const s = Tr(t.deltaMode, this.content.clientHeight);
      t.preventDefault(), this.content.scrollBy({
        top: t.deltaY * s,
        left: t.deltaX * s,
        behavior: "instant"
      });
    }, this.onTrackClick = (t) => (s) => {
      this.dragging || performance.now() - this.dragEndAt < fr || this.isOnThumb(s.target) || this.scrollToPoint(t, s.clientX, s.clientY, "smooth");
    }, this.startDrag = (t, { startX: s, startY: r, event: i }) => {
      this.content && (this.isOnThumb(i.target) || this.scrollToPoint(t, s, r, "instant"), this.dragging = t, this.dragOrigin = t === "y" ? this.content.scrollTop : this.content.scrollLeft, this.userSelect = this.content.style.userSelect, this.content.style.userSelect = "none");
    }, this.moveDrag = (t, { deltaX: s, deltaY: r }) => {
      const i = t === "y" ? r : s, a = Ar(this.geometry(t), this.dragOrigin, i);
      this.scrollAxisTo(t, a, "instant");
    }, this.endDrag = () => {
      this.content && (this.content.style.userSelect = this.userSelect), this.dragging = null, this.dragEndAt = performance.now(), this.reveal();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  disconnectedCallback() {
    this.frame && cancelAnimationFrame(this.frame), this.hideTimer && clearTimeout(this.hideTimer), this.syncTrack("y", null), this.syncTrack("x", null), this.resizeObserver?.disconnect(), this.mutationObserver?.disconnect(), window.removeEventListener("resize", this.schedule), super.disconnectedCallback();
  }
  firstUpdated() {
    this.content && (this.resizeObserver = new ResizeObserver(() => this.schedule()), this.mutationObserver = new MutationObserver(() => {
      this.observeContent(), this.schedule();
    }), this.mutationObserver.observe(this.content, {
      childList: !0,
      subtree: !0,
      characterData: !0
    }), this.observeContent(), window.addEventListener("resize", this.schedule), this.measure(), requestAnimationFrame(() => this.schedule()));
  }
  updated() {
    this.syncTrack("y", this.hasVertical ? this.querySelector('[data-axis="y"]') : null), this.syncTrack("x", this.hasHorizontal ? this.querySelector('[data-axis="x"]') : null);
  }
  /** The element that actually scrolls. */
  get scrollport() {
    return this.content;
  }
  get scrollMetrics() {
    return this.metrics;
  }
  get appState() {
    return f(this, d);
  }
  get hasVertical() {
    return Ms("y", this.direction, this.metrics);
  }
  get hasHorizontal() {
    return Ms("x", this.direction, this.metrics);
  }
  inset(t) {
    return (t === "y" ? this.hasHorizontal : this.hasVertical) ? this.size : 0;
  }
  geometry(t) {
    return kr(t, this.metrics, {
      inset: this.inset(t),
      minThumb: this.minThumb
    });
  }
  get isVisible() {
    return !this.autoHide || this.hovered || this.dragging !== null || this.scrolling;
  }
  get scrollbarAttrs() {
    return vr({
      role: this.role || this.appState?.role || "",
      size: this.size,
      thumbSize: this.thumbSize,
      visible: this.isVisible,
      dragging: this.dragging !== null
    });
  }
  observeContent() {
    !this.content || !this.resizeObserver || (this.resizeObserver.disconnect(), this.resizeObserver.observe(this.content), Array.from(this.content.children).forEach((t) => this.resizeObserver?.observe(t)));
  }
  reveal() {
    this.hideTimer && clearTimeout(this.hideTimer), this.scrolling = !0, this.hideTimer = setTimeout(() => {
      this.scrolling = !1;
    }, this.hideDelay);
  }
  trackFor(t) {
    return this.querySelector(`[data-axis="${t}"]`);
  }
  isOnThumb(t) {
    return t instanceof Element && !!t.closest(this.thumbSelector);
  }
  scrollAxisTo(t, s, r) {
    this.content?.scrollTo(t === "y" ? { top: s, behavior: r } : { left: s, behavior: r });
  }
  scrollToPoint(t, s, r, i) {
    const a = this.trackFor(t);
    if (!a) return;
    const l = a.getBoundingClientRect(), y = t === "y" ? r - l.top : s - l.left;
    this.scrollAxisTo(t, Cr(this.geometry(t), y), i);
  }
  syncTrack(t, s) {
    this.sessions[t]?.destroy(), delete this.sessions[t], s && (this.sessions[t] = Bt(
      s,
      {
        options: { minMove: 1, trackOutsideElement: !0 },
        down: (r) => this.startDrag(t, r),
        move: (r) => {
          r.event.preventDefault(), this.moveDrag(t, r);
        },
        up: this.endDrag,
        cancel: this.endDrag
      },
      { move: { passive: !1 } }
    ));
  }
  render() {
    const t = gr();
    return h`
      <div
        class=${c(this.scrollbarAttrs)}
        @pointerenter=${() => {
      this.hovered = !0;
    }}
        @pointerleave=${() => {
      this.hovered = !1;
    }}
      >
        <div class=${c(t)} data-scrollport @scroll=${this.onScroll}>
          <slot></slot>
        </div>

        ${this.hasVertical ? h`
              <div
                class=${c(this.trackAttrs("y"))}
                data-axis="y"
                aria-hidden="true"
                @click=${this.onTrackClick("y")}
                @wheel=${this.onWheel}
              >
                <div class=${c(this.thumbAttrs("y"))} style=${P(this.thumbAttrs("y"))}></div>
              </div>
            ` : v}
        ${this.hasHorizontal ? h`
              <div
                class=${c(this.trackAttrs("x"))}
                data-axis="x"
                aria-hidden="true"
                @click=${this.onTrackClick("x")}
                @wheel=${this.onWheel}
              >
                <div class=${c(this.thumbAttrs("x"))} style=${P(this.thumbAttrs("x"))}></div>
              </div>
            ` : v}
      </div>
    `;
  }
  trackAttrs(t) {
    return br({ axis: t, inset: this.inset(t) });
  }
  thumbAttrs(t) {
    const { thumb: s, offset: r } = this.geometry(t);
    return yr({ length: s, offset: r });
  }
};
Ss.tagName = "t-scrollbar";
let w = Ss;
j([
  o({ type: String })
], w.prototype, "direction");
j([
  o({ type: Number })
], w.prototype, "size");
j([
  o({ type: Number, attribute: "thumb-size" })
], w.prototype, "thumbSize");
j([
  o({ type: Number, attribute: "min-thumb" })
], w.prototype, "minThumb");
j([
  o({ type: Boolean, attribute: "auto-hide" })
], w.prototype, "autoHide");
j([
  o({ type: Number, attribute: "hide-delay" })
], w.prototype, "hideDelay");
j([
  o({ type: String })
], w.prototype, "role");
j([
  m()
], w.prototype, "dragging");
j([
  m()
], w.prototype, "hovered");
j([
  m()
], w.prototype, "scrolling");
j([
  Y("[data-scrollport]")
], w.prototype, "content");
const $s = class $s extends u {
  render() {
    const t = tr();
    return h`<div class=${c(t)}><slot></slot></div>`;
  }
};
$s.tagName = "t-page";
let Oe = $s;
var eo = Object.defineProperty, nt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && eo(t, s, i), i;
};
const ks = class ks extends u {
  constructor() {
    super(...arguments), this.modelValue = Ns.modelValue, this.role = "", this.disabled = Ns.disabled, this.isOpen = !1, this.contentHeight = 0, this.isFirstOpen = !0, this.toggle = () => {
      this.disabled || (this.isOpen = !this.isOpen, this.isOpen && this.scheduleMeasure(), this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: this.isOpen, bubbles: !0, composed: !0 })
      ));
    }, this.onKeydown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.toggle());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  willUpdate(t) {
    t.has("modelValue") && (this.isOpen = this.modelValue, this.modelValue && this.scheduleMeasure());
  }
  firstUpdated() {
    this.isOpen = this.modelValue, this.isOpen && this.scheduleMeasure();
  }
  updated() {
    this.isOpen && this.scheduleMeasure();
  }
  get appState() {
    return f(this, d);
  }
  scheduleMeasure() {
    requestAnimationFrame(() => {
      this.measureContent(), this.isOpen && this.isFirstOpen && (this.isFirstOpen = !1);
    });
  }
  measureContent() {
    this.contentRef && (this.contentHeight = this.contentRef.scrollHeight);
  }
  get roleValue() {
    return this.role ?? this.appState?.role ?? "";
  }
  get durationCss() {
    return this.duration !== void 0 ? `${this.duration / 1e3}s` : void 0;
  }
  render() {
    const t = Ai({
      role: this.roleValue,
      open: this.isOpen,
      disabled: this.disabled
    }), s = Ti({
      open: this.isOpen,
      disabled: this.disabled
    }), r = Ei({
      transition: !this.isFirstOpen,
      duration: this.durationCss,
      height: this.isOpen ? `${this.contentHeight}px` : "0px"
    }), i = Xs();
    return h`
      <div class=${c(t)}>
        <div
          class=${c(s)}
          role="button"
          tabindex="0"
          @pointerup=${this.toggle}
          @keydown=${this.onKeydown}
        >
          <slot name="trigger"></slot>
        </div>
        <div
          class=${c(r)}
          style=${P(r)}
          @transitionend=${() => {
    }}
        >
          <div class=${i}>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
ks.tagName = "t-collapse";
let U = ks;
nt([
  o({ type: Boolean, attribute: "model-value" })
], U.prototype, "modelValue");
nt([
  o({ type: Number })
], U.prototype, "duration");
nt([
  o({ type: String })
], U.prototype, "role");
nt([
  o({ type: Boolean })
], U.prototype, "disabled");
nt([
  m()
], U.prototype, "isOpen");
nt([
  m()
], U.prototype, "contentHeight");
nt([
  m()
], U.prototype, "isFirstOpen");
nt([
  Y(`.${Xs()}`)
], U.prototype, "contentRef");
var so = Object.defineProperty, io = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && so(t, s, i), i;
};
const Cs = class Cs extends u {
  constructor() {
    super(...arguments), this.direction = Bi.direction;
  }
  get formGroupAttrs() {
    return Mi({ direction: this.direction });
  }
  render() {
    return h`<div class=${c(this.formGroupAttrs)}><slot></slot></div>`;
  }
};
Cs.tagName = "t-form-group";
let de = Cs;
io([
  o({ type: String })
], de.prototype, "direction");
var ro = Object.defineProperty, lt = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ro(t, s, i), i;
};
const As = class As extends u {
  constructor() {
    super(...arguments), this.modelValue = jt.modelValue, this.disabled = jt.disabled, this.placement = jt.placement, this.role = "", this.shape = "", this.direction = "", this.size = jt.size, this.isOpen = !1, this.docPointerHandler = (t) => this.onDocPointerDown(t), this.docKeyHandler = (t) => this.onDocKeydown(t), this.toggle = () => {
      this.disabled || this.setOpen(!this.isOpen);
    }, this.close = () => {
      this.isOpen && this.setOpen(!1);
    }, this.onDocPointerDown = (t) => {
      this.isOpen && (this.contains(t.target) || this.close());
    }, this.onDocKeydown = (t) => {
      t.key === "Escape" && this.isOpen && (t.preventDefault(), this.close());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d), document.addEventListener("pointerdown", this.docPointerHandler, !0), document.addEventListener("keydown", this.docKeyHandler, !0);
  }
  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.docPointerHandler, !0), document.removeEventListener("keydown", this.docKeyHandler, !0), super.disconnectedCallback();
  }
  willUpdate(t) {
    if (t.has("modelValue")) {
      const s = this.isOpen;
      this.isOpen = this.modelValue, this.isOpen && !s ? this.dispatchEvent(new CustomEvent("open", { bubbles: !0, composed: !0 })) : !this.isOpen && s && this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
    }
  }
  get appState() {
    return f(this, d);
  }
  setOpen(t) {
    const s = this.isOpen;
    this.isOpen = t, this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: t, bubbles: !0, composed: !0 })
    ), t && !s ? this.dispatchEvent(new CustomEvent("open", { bubbles: !0, composed: !0 })) : !t && s && this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  get wrapperAttrs() {
    const t = this.role ?? this.appState?.role ?? "", s = this.shape ?? this.appState?.shape ?? "";
    return Di({
      role: t,
      shape: s,
      size: this.size,
      open: this.isOpen,
      disabled: this.disabled
    });
  }
  render() {
    return h`
      <div class=${c(this.wrapperAttrs)}>
        <slot name="trigger"></slot>
        ${this.isOpen ? h`<div class=${c(Vi({ placement: this.placement }))}>
              <slot></slot>
            </div>` : v}
      </div>
    `;
  }
};
As.tagName = "t-dropdown";
let H = As;
lt([
  o({ type: Boolean, attribute: "model-value" })
], H.prototype, "modelValue");
lt([
  o({ type: Boolean })
], H.prototype, "disabled");
lt([
  o({ type: String })
], H.prototype, "placement");
lt([
  o({ type: String })
], H.prototype, "role");
lt([
  o({ type: String })
], H.prototype, "shape");
lt([
  o({ type: String })
], H.prototype, "direction");
lt([
  o({ type: String })
], H.prototype, "size");
lt([
  m()
], H.prototype, "isOpen");
var ao = Object.defineProperty, z = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && ao(t, s, i), i;
};
const Ts = class Ts extends u {
  constructor() {
    super(...arguments), this.modelValue = yt.modelValue, this.name = "", this.variant = yt.variant, this.role = "", this.shape = "", this.size = yt.size, this.direction = "", this.id = "", this.value = "", this.placeholder = yt.placeholder, this.disabled = yt.disabled, this.message = yt.message, this.options = [], this.visible = !1, this.onVisibleChange = (t) => {
      this.visible = t.detail;
    }, this.onTriggerPointerUp = () => {
      this.querySelector("t-dropdown")?.toggle?.();
    }, this.pickOption = (t) => {
      t.disabled || t.value === void 0 || (this.dispatchEvent(
        new CustomEvent("update:modelValue", { detail: t.value, bubbles: !0, composed: !0 })
      ), this.dispatchEvent(new CustomEvent("select", { detail: t, bubbles: !0, composed: !0 })), this.visible = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get roleValue() {
    return this.role || this.appState?.role || "";
  }
  get directionValue() {
    return this.direction || this.appState?.direction || "left";
  }
  get shapeValue() {
    return this.shape || this.appState?.shape || "";
  }
  get selectAttrs() {
    return _r({
      role: this.roleValue,
      direction: this.directionValue,
      size: this.size,
      disabled: this.disabled
    });
  }
  get fieldDisplayValue() {
    const t = this.modelValue || this.value;
    let s = [];
    return t && (s = typeof t == "string" ? [t] : t), this.options.filter((i) => (s || []).includes(i.value)).map((i) => i.label ?? i.value).join(",");
  }
  render() {
    const t = qs({
      ...Js(wr().class),
      open: this.visible
    });
    return h`
      <div class=${c(this.selectAttrs)}>
        <t-dropdown
          .modelValue=${this.visible}
          @update:modelValue=${this.onVisibleChange}
          role=${this.roleValue}
          direction=${this.directionValue}
          shape=${this.shapeValue}
          ?disabled=${this.disabled}
          .size=${this.size}
        >
          <t-field
            slot="trigger"
            class=${this.visible ? "focus" : ""}
            role=${this.roleValue}
            variant="outline"
            .modelValue=${this.fieldDisplayValue}
            .size=${this.size}
            .variant=${this.variant}
            placeholder=${this.placeholder}
            direction=${this.directionValue}
            shape=${this.shapeValue}
            ?readonly=${!0}
            ?disabled=${this.disabled}
            @pointerup=${this.onTriggerPointerUp}
          >
            <span slot="end-input" class=${t}></span>
          </t-field>
          ${Re(
      this.options,
      (s) => s.value,
      (s) => h`
              <button
                type="button"
                ?disabled=${s.disabled}
                class=${c(Or())}
                @pointerup=${() => this.pickOption(s)}
              >
                ${s.label}
              </button>
            `
    )}
        </t-dropdown>
        ${this.message ? h`<div class=${c(Rr())}>${this.message}</div>` : v}
      </div>
    `;
  }
};
Ts.tagName = "t-select";
let A = Ts;
z([
  o({ attribute: "model-value" })
], A.prototype, "modelValue");
z([
  o({ type: String })
], A.prototype, "name");
z([
  o({ type: String })
], A.prototype, "variant");
z([
  o({ type: String })
], A.prototype, "role");
z([
  o({ type: String })
], A.prototype, "shape");
z([
  o({ type: String })
], A.prototype, "size");
z([
  o({ type: String })
], A.prototype, "direction");
z([
  o({ type: String })
], A.prototype, "id");
z([
  o({ type: String })
], A.prototype, "value");
z([
  o({ type: String })
], A.prototype, "placeholder");
z([
  o({ type: Boolean })
], A.prototype, "disabled");
z([
  o({ type: String })
], A.prototype, "message");
z([
  o({ type: Array })
], A.prototype, "options");
z([
  m()
], A.prototype, "visible");
var oo = Object.defineProperty, V = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && oo(t, s, i), i;
};
const Es = class Es extends u {
  constructor() {
    super(...arguments), this.modelValue = et.modelValue, this.min = et.min, this.max = et.max, this.step = et.step, this.unit = et.unit, this.disabled = et.disabled, this.readonly = et.readonly, this.role = "", this.shape = "", this.tick = et.tick, this.isShowTooltip = !1, this.gestureCleanup = null, this.dragStartPercent = 0, this.isHorizontalDrag = !1, this.onTickSelect = (t, s) => {
      this.suppressPointerEvent(s);
      const r = this.getPercentFromValue(t);
      this.emitValueFromPercent(r), this.showTooltipTemporarily();
    }, this.onTrackPointerDown = (t) => {
      this.disabled || this.readonly || this.suppressPointerEvent(t);
    }, this.onThumbPointerDown = (t) => {
      this.disabled || this.readonly || this.suppressPointerEvent(t);
    }, this.onClickPath = (t) => {
      if (this.disabled || this.readonly || !this.container) return;
      this.suppressPointerEvent(t);
      const s = this.container.offsetWidth, r = this.container.getBoundingClientRect(), a = (this.getClientX(t) - r.left) / s * 100;
      this.emitValueFromPercent(Math.max(0, Math.min(100, a))), this.showTooltipTemporarily();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  disconnectedCallback() {
    this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.gestureCleanup?.destroy(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.setupGesture();
  }
  updated(t) {
    (t.has("disabled") || t.has("readonly")) && (this.disabled || this.readonly ? (this.gestureCleanup?.destroy(), this.gestureCleanup = null) : this.gestureCleanup || this.setupGesture());
  }
  get appState() {
    return f(this, d);
  }
  parseRangeValue(t, s) {
    if (typeof t == "number") return t;
    if (typeof t == "string") {
      const r = Number.parseFloat(t);
      return Number.isNaN(r) ? s : r;
    }
    return s;
  }
  get rangeMin() {
    return this.parseRangeValue(this.min, 0);
  }
  get rangeMax() {
    return this.parseRangeValue(this.max, 100);
  }
  get rangeStep() {
    const t = this.parseRangeValue(this.step, 1);
    return t > 0 ? t : 1;
  }
  snapToStep(t) {
    const s = this.rangeMin, r = this.rangeMax, i = this.rangeStep;
    if (r <= s) return s;
    const a = Math.max(s, Math.min(r, t)), l = Math.round((a - s) / i);
    return Math.max(s, Math.min(r, s + l * i));
  }
  get normalizedValue() {
    const t = this.parseRangeValue(this.modelValue, this.rangeMin);
    return this.snapToStep(t);
  }
  getPercentFromValue(t) {
    const s = this.rangeMin, r = this.rangeMax;
    if (r <= s) return 0;
    const i = (t - s) / (r - s) * 100;
    return Math.max(0, Math.min(100, i));
  }
  get percent() {
    return this.getPercentFromValue(this.normalizedValue);
  }
  get ticks() {
    if (this.tick === !1) return [];
    const t = this.rangeMin, s = this.rangeMax, r = this.tick === !0 ? 1 : this.parseRangeValue(this.tick, 0);
    if (r <= 0 || s < t) return [t, s];
    const i = [];
    for (let a = t; a <= s; a += r)
      i.push(a);
    return i.at(-1) !== s && i.push(s), i;
  }
  getValueFromPercent(t) {
    const s = this.rangeMin, r = this.rangeMax, i = s + (r - s) * (t / 100);
    return this.snapToStep(i);
  }
  get displayValue() {
    return `${this.getValueFromPercent(this.percent)}${this.unit || ""}`;
  }
  suppressPointerEvent(t) {
    t?.stopPropagation();
  }
  isHorizontalDirection(t) {
    return t === "left" || t === "right";
  }
  showTooltipTemporarily() {
    this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.isShowTooltip = !0, this.tooltipTimeout = setTimeout(() => {
      this.isShowTooltip = !1;
    }, 300);
  }
  emitValueFromPercent(t) {
    if (this.disabled || this.readonly) return;
    const s = this.getValueFromPercent(t);
    s !== this.modelValue && (this.dispatchEvent(
      new CustomEvent("update:modelValue", { detail: s, bubbles: !0, composed: !0 })
    ), this.dispatchEvent(new CustomEvent("change", { detail: s, bubbles: !0, composed: !0 })));
  }
  getClientX(t) {
    return "changedTouches" in t && t.changedTouches.length > 0 ? t.changedTouches[0].clientX : t.clientX;
  }
  setupGesture() {
    !this.point || !this.container || this.disabled || this.readonly || (this.gestureCleanup?.destroy(), this.gestureCleanup = Bt(
      this.point,
      {
        options: { trackOutsideElement: !0 },
        beforeEvent: () => !(this.disabled || this.readonly),
        afterEvent: (t) => {
          this.isHorizontalDrag && this.suppressPointerEvent(t);
        },
        down: ({ event: t }) => {
          this.disabled || this.readonly || (this.dragStartPercent = this.percent, this.isHorizontalDrag = !1, this.suppressPointerEvent(t));
        },
        up: ({ event: t }) => {
          this.isHorizontalDrag = !1, this.isShowTooltip = !1, this.suppressPointerEvent(t);
        },
        cancel: (t) => {
          this.isHorizontalDrag = !1, this.isShowTooltip = !1, this.suppressPointerEvent(t);
        },
        move: ({ initialDirection: t, deltaX: s, event: r }) => {
          if (this.disabled || this.readonly || !this.isHorizontalDirection(t) || !this.container) return;
          this.isHorizontalDrag = !0, this.suppressPointerEvent(r);
          const i = this.container.offsetWidth, a = s / i * 100, l = Math.max(0, Math.min(100, this.dragStartPercent + a));
          this.emitValueFromPercent(l), this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.isShowTooltip = !0;
        }
      },
      { passive: !1, capture: !0 }
    ));
  }
  tickAttrs(t) {
    const s = this.getPercentFromValue(t);
    return Ur({
      active: this.percent > s,
      percent: s
    });
  }
  render() {
    const t = this.role || this.appState?.role || "", s = this.shape || this.appState?.shape || "";
    return h`
      <div class=${c(Dr({ role: t, shape: s, disabled: this.disabled, readonly: this.readonly }))}>
        <div class=${c(Vr())} data-slide-range-container>
          <div
            class=${c(Fr())}
            @pointerdown=${this.onTrackPointerDown}
            @pointerup=${this.onClickPath}
          >
            <div class=${c(Ir())}></div>
            <div class=${c(Nr({ percent: this.percent }))}></div>
            ${Re(
      this.ticks,
      (r) => r,
      (r) => h`
                <div
                  class=${c(this.tickAttrs(r))}
                  @pointerdown=${this.onTrackPointerDown}
                  @pointerup=${(i) => this.onTickSelect(r, i)}
                ></div>
              `
    )}
          </div>

          <div
            class=${c(Lr({ percent: this.percent }))}
            data-slide-range-thumb
            @pointerdown=${this.onThumbPointerDown}
          >
            <div class=${c(Br())}></div>
            ${this.percent > 0 && this.isShowTooltip ? h`<span class=${c(Mr())}>${this.displayValue}</span>` : v}
          </div>
        </div>
      </div>
    `;
  }
};
Es.tagName = "t-slide-range";
let T = Es;
V([
  o({ attribute: "model-value" })
], T.prototype, "modelValue");
V([
  o({ attribute: !0 })
], T.prototype, "min");
V([
  o({ attribute: !0 })
], T.prototype, "max");
V([
  o({ attribute: !0 })
], T.prototype, "step");
V([
  o({ type: String })
], T.prototype, "unit");
V([
  o({ type: Boolean })
], T.prototype, "disabled");
V([
  o({ type: Boolean })
], T.prototype, "readonly");
V([
  o({ type: String })
], T.prototype, "role");
V([
  o({ type: String })
], T.prototype, "shape");
V([
  o({ attribute: "tick" })
], T.prototype, "tick");
V([
  m()
], T.prototype, "isShowTooltip");
V([
  Y("[data-slide-range-container]")
], T.prototype, "container");
V([
  Y("[data-slide-range-thumb]")
], T.prototype, "point");
var no = Object.defineProperty, me = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && no(t, s, i), i;
};
const Ps = class Ps extends u {
  constructor() {
    super(...arguments), this.role = "", this.size = Hs.size, this.shape = "", this.variant = Hs.variant;
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get tagAttrs() {
    return Qr({
      role: this.role || this.appState?.role || "",
      shape: this.shape || this.appState?.shape || "",
      size: this.size,
      variant: this.variant
    });
  }
  render() {
    return h`<span class=${c(this.tagAttrs)}><slot></slot></span>`;
  }
};
Ps.tagName = "t-tag";
let ut = Ps;
me([
  o({ type: String })
], ut.prototype, "role");
me([
  o({ type: String })
], ut.prototype, "size");
me([
  o({ type: String })
], ut.prototype, "shape");
me([
  o({ type: String })
], ut.prototype, "variant");
var lo = Object.defineProperty, Ct = (e, t, s, r) => {
  for (var i = void 0, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (i = l(t, s, i) || i);
  return i && lo(t, s, i), i;
};
const xs = class xs extends u {
  constructor() {
    super(...arguments), this.placement = Se.placement, this.disabled = Se.disabled, this.role = "", this.shape = "", this.size = Se.size, this.visible = !1, this.show = () => {
      this.disabled || (this.visible = !0);
    }, this.hide = () => {
      this.visible = !1;
    }, this.onFocusOut = (t) => {
      const s = t.relatedTarget;
      s && this.contains(s) || this.hide();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.consume(d);
  }
  get appState() {
    return f(this, d);
  }
  get wrapperAttrs() {
    const t = this.role ?? this.appState?.role ?? "", s = this.shape ?? this.appState?.shape ?? "";
    return ia({
      role: t,
      shape: s,
      size: this.size,
      disabled: this.disabled
    });
  }
  render() {
    return h`
      <div class=${c(this.wrapperAttrs)}>
        <div
          class=${c(aa())}
          @pointerenter=${this.show}
          @pointerleave=${this.hide}
          @focusin=${this.show}
          @focusout=${this.onFocusOut}
        >
          <slot></slot>
        </div>
        ${this.visible ? h`<div class=${c(ra({ placement: this.placement }))}>
              <slot name="content"></slot>
            </div>` : v}
      </div>
    `;
  }
};
xs.tagName = "t-tooltip";
let Z = xs;
Ct([
  o({ type: String })
], Z.prototype, "placement");
Ct([
  o({ type: Boolean })
], Z.prototype, "disabled");
Ct([
  o({ type: String })
], Z.prototype, "role");
Ct([
  o({ type: String })
], Z.prototype, "shape");
Ct([
  o({ type: String })
], Z.prototype, "size");
Ct([
  m()
], Z.prototype, "visible");
const Fe = {}, ri = "toife", co = [
  { name: "app", ctor: q },
  { name: "action", ctor: M },
  { name: "avatar", ctor: st },
  { name: "button", ctor: K },
  { name: "cable", ctor: Dt },
  { name: "card", ctor: St },
  { name: "card-body", ctor: Ee },
  { name: "card-header", ctor: Pe },
  { name: "card-footer", ctor: xe },
  { name: "checkbox", ctor: N },
  { name: "radio", ctor: L },
  { name: "radio-group", ctor: X },
  { name: "collapse", ctor: U },
  { name: "container", ctor: _e },
  { name: "decision-modal", ctor: x },
  { name: "divider", ctor: Ft },
  { name: "dropdown", ctor: H },
  { name: "field", ctor: g },
  { name: "flex", ctor: re },
  { name: "flex-item", ctor: ae },
  { name: "form-group", ctor: de },
  { name: "gesture-indicator", ctor: zt },
  { name: "grid", ctor: oe },
  { name: "grid-item", ctor: ne },
  { name: "image", ctor: $t },
  { name: "modal", ctor: S },
  { name: "page", ctor: Oe },
  { name: "present", ctor: k },
  { name: "refresher", ctor: ce },
  { name: "route-navigator", ctor: D },
  { name: "route-wrapper", ctor: Nt },
  { name: "route-provider", ctor: he },
  { name: "route-outlet", ctor: It },
  { name: "scrollbar", ctor: w },
  { name: "segmented-field", ctor: C },
  { name: "select", ctor: A },
  { name: "slide-range", ctor: T },
  { name: "skeleton", ctor: pt },
  { name: "switch", ctor: F },
  { name: "tag", ctor: ut },
  { name: "tab", ctor: Vt },
  { name: "tabs", ctor: $ },
  { name: "tooltip", ctor: Z },
  { name: "toast", ctor: le },
  { name: "toast-content", ctor: B },
  { name: "toolbar", ctor: dt }
];
function Ws(e, t) {
  customElements.get(e) || customElements.define(e, t);
}
class ho {
  constructor(t) {
    this.options = {
      name: t?.name || ri,
      prefix: t?.prefix || "t-"
    };
  }
  /** Register every Toife custom element with the configured prefix. */
  subscribeAll() {
    const t = this.options.prefix;
    for (const { name: s, ctor: r } of co)
      Ws(t + s, r);
    return this;
  }
  /** Register a single custom element (without prefix applied twice). */
  subscribe(t, s) {
    return Ws(this.options.prefix + t, s), this;
  }
  preventDefault() {
    return li(), this;
  }
}
const $o = (e) => {
  const t = new ho(e);
  return Fe[t.options.name] = t, t;
}, ko = (e = ri) => Fe[e] || null, Co = () => Fe;
function Ao() {
  let e, t, s = !1;
  const r = /* @__PURE__ */ new Set(), i = () => (e || (e = di(), t = e.subscribe((a) => {
    s = a;
    for (const l of r) l(a);
  })), e);
  return {
    get isFullscreen() {
      return s;
    },
    subscribe(a) {
      return r.add(a), () => r.delete(a);
    },
    enter: (a) => i().enter(a),
    exit: () => i().exit(),
    toggle: (a) => i().toggle(a),
    dispose: () => {
      t?.(), t = void 0, e = void 0, r.clear();
    }
  };
}
export {
  Fs as ACTION_DEFAULT_PROPS,
  G as APP_DEFAULT_PROPS,
  d as APP_PROVIDER_STATE_KEY,
  Is as AVATAR_DEFAULT_PROPS,
  M as Action,
  q as App,
  st as Avatar,
  Ut as BUTTON_DEFAULT_PROPS,
  K as Button,
  be as CABLE_DEFAULT_PROPS,
  Ce as CABLE_PROVIDER_STATE_KEY,
  So as CARD_DEFAULT_PROPS,
  Rt as CARD_PROVIDER_STATE_KEY,
  Tt as CHECKBOX_DEFAULT_PROPS,
  Ns as COLLAPSE_DEFAULT_PROPS,
  Dt as Cable,
  St as Card,
  Ee as CardBody,
  xe as CardFooter,
  Pe as CardHeader,
  N as Checkbox,
  U as Collapse,
  _e as Container,
  Ht as DECISION_MODAL_DEFAULT_PROPS,
  Ri as DIVIDER_DEFAULT_PROPS,
  jt as DROPDOWN_DEFAULT_PROPS,
  x as DecisionModal,
  Ft as Divider,
  H as Dropdown,
  W as FIELD_DEFAULT_PROPS,
  Gi as FLEX_DEFAULT_PROPS,
  ji as FLEX_ITEM_DEFAULT_PROPS,
  Bi as FORM_GROUP_DEFAULT_PROPS,
  g as Field,
  re as Flex,
  ae as FlexItem,
  de as FormGroup,
  Ui as GESTURE_INDICATOR_DEFAULT_PROPS,
  qi as GRID_DEFAULT_PROPS,
  Wi as GRID_ITEM_DEFAULT_PROPS,
  zt as GestureIndicator,
  oe as Grid,
  ne as GridItem,
  $t as Image,
  Q as MODAL_DEFAULT_PROPS,
  S as Modal,
  gt as PRESENT_DEFAULT_PROPS,
  er as PRESENT_DEFAULT_STYLES,
  Oe as Page,
  k as Present,
  Bs as RADIO_DEFAULT_PROPS,
  ct as RADIO_GROUP_DEFAULT_PROPS,
  Ae as RADIO_GROUP_PROVIDER_STATE_KEY,
  Gt as ROUTE_NAVIGATOR_DEFAULT_PROPS,
  ee as ROUTE_PROVIDER_STATE_KEY,
  lr as ROUTE_WRAPPER_DEFAULT_PROPS,
  L as Radio,
  X as RadioGroup,
  ce as Refresher,
  D as RouteNavigator,
  It as RouteOutlet,
  he as RouteProvider,
  Nt as RouteWrapper,
  Qi as SCROLLABLE_OVERFLOW_VALUES,
  fr as SCROLLBAR_CLICK_AFTER_DRAG,
  bt as SCROLLBAR_DEFAULT_PROPS,
  ur as SCROLLBAR_OVERFLOW_EPSILON,
  mr as SCROLLBAR_WHEEL_LINE,
  ht as SEGMENTED_FIELD_DEFAULT_PROPS,
  yt as SELECT_DEFAULT_PROPS,
  Us as SKELETON_DEFAULT_PROPS,
  et as SLIDE_RANGE_DEFAULT_PROPS,
  Wt as SWITCH_DEFAULT_PROPS,
  w as Scrollbar,
  C as SegmentedField,
  A as Select,
  pt as Skeleton,
  T as SlideRange,
  F as Switch,
  Et as TABS_DEFAULT_PROPS,
  Te as TABS_PROVIDER_STATE_KEY,
  Wr as TAB_DEFAULT_PROPS,
  Hs as TAG_DEFAULT_PROPS,
  ye as TOAST_CONTENT_DEFAULT_PROPS,
  Zr as TOAST_DEFAULT_PROPS,
  js as TOOLBAR_DEFAULT_PROPS,
  Se as TOOLTIP_DEFAULT_PROPS,
  Vt as Tab,
  $ as Tabs,
  ut as Tag,
  le as Toast,
  B as ToastContent,
  dt as Toolbar,
  Z as Tooltip,
  ni as blurCurrentActive,
  se as clone,
  di as createFullscreen,
  $o as createToife,
  n as cssPrefix,
  p as cssProperty,
  yo as cssVariable,
  pi as getActionAttrs,
  ui as getAppAttrs,
  Ls as getAppClassSelector,
  Co as getApps,
  mi as getAvatarAttrs,
  fi as getButtonAttrs,
  vi as getButtonLoaderAttrs,
  gi as getCableAttrs,
  bi as getCardAttrs,
  $i as getCardBodyAttrs,
  Si as getCardFooterAttrs,
  yi as getCardHeaderAttrs,
  ki as getCheckboxAttrs,
  Ci as getCheckboxIconAttrs,
  Ai as getCollapseAttrs,
  Ei as getCollapseContentAttrs,
  Xs as getCollapseContentInnerClass,
  Ti as getCollapseTriggerAttrs,
  Pi as getContainerAttrs,
  hi as getCssPrefix,
  ci as getCssSeparator,
  xi as getDecisionModalAttrs,
  wi as getDecisionModalBodyAttrs,
  Oi as getDecisionModalFooterAttrs,
  _i as getDecisionModalHeaderAttrs,
  zi as getDividerAttrs,
  Di as getDropdownAttrs,
  Vi as getDropdownPanelAttrs,
  Fi as getFieldAttrs,
  Ii as getFieldContentAttrs,
  Ni as getFieldInputAttrs,
  Li as getFieldMessageAttrs,
  Yi as getFlexAttrs,
  Ji as getFlexItemAttrs,
  Mi as getFormGroupAttrs,
  Hi as getGestureIndicatorAttrs,
  Ki as getGridAttrs,
  Xi as getGridItemAttrs,
  Zi as getModalAttrs,
  tr as getPageAttrs,
  ir as getPresentAttrs,
  sr as getPresentBackdropAttrs,
  rr as getRadioAttrs,
  or as getRadioGroupAttrs,
  ar as getRadioIconAttrs,
  nr as getRefresherAttrs,
  hr as getRouteNavigatorAttrs,
  pr as getRouteNavigatorBackdropAttrs,
  dr as getRouteNavigatorComponentAttrs,
  cr as getRouteNavigatorTransitionDuration,
  vr as getScrollbarAttrs,
  gr as getScrollbarContentAttrs,
  kr as getScrollbarGeometry,
  $r as getScrollbarMetrics,
  Ar as getScrollbarScrollFromDelta,
  Cr as getScrollbarScrollFromPoint,
  yr as getScrollbarThumbAttrs,
  Sr as getScrollbarThumbSelector,
  br as getScrollbarTrackAttrs,
  Tr as getScrollbarWheelScale,
  Pr as getSegmentedFieldContentAttrs,
  xr as getSegmentedFieldMessageAttrs,
  Er as getSegmentedFieldWrapperAttrs,
  _r as getSelectAttrs,
  wr as getSelectIconAttrs,
  Rr as getSelectMessageAttrs,
  Or as getSelectOptionAttrs,
  zr as getSkeletonAttrs,
  Dr as getSlideRangeAttrs,
  Lr as getSlideRangeThumbAttrs,
  Br as getSlideRangeThumbInnerAttrs,
  Ur as getSlideRangeTickAttrs,
  Mr as getSlideRangeTooltipAttrs,
  Ir as getSlideRangeTrackBackAttrs,
  Fr as getSlideRangeTrackBodyAttrs,
  Vr as getSlideRangeTrackContainerAttrs,
  Nr as getSlideRangeTrackFrontAttrs,
  jr as getSwitchAttrs,
  Gr as getSwitchIconAttrs,
  Hr as getSwitchWrapperAttrs,
  qr as getTabAttrs,
  Kr as getTabButtonAttrs,
  Xr as getTabsAttrs,
  Yr as getTabsHighlightPosition,
  Jr as getTabsHighlightStyle,
  Qr as getTagAttrs,
  ta as getToastAttrs,
  ea as getToastContentAttrs,
  sa as getToolbarAttrs,
  ia as getTooltipAttrs,
  ra as getTooltipContentAttrs,
  aa as getTooltipTriggerAttrs,
  Ms as hasScrollbarAxis,
  oi as isFormElement,
  li as preventDefault,
  Xt as useAction,
  ko as useApp,
  Qt as useDecisionModal,
  Ao as useFullscreen,
  da as usePresent,
  Qa as useRouteWrapper,
  ke as useToast
};
