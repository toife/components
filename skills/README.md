# Toife component skills

Agent skills for building UI with Toife. Source of truth for types, class logic, and SCSS is `@toife/components/core`. Vue and Lit adapters consume that core.

| Skill | Use when |
|-------|----------|
| [toife-components](./toife-components/SKILL.md) | Any Toife UI work — setup, theme, which component to pick |
| [toife-layout](./toife-layout/SKILL.md) | App shell, page chrome, flex/grid, card, toolbar, scrollbar |
| [toife-forms](./toife-forms/SKILL.md) | Inputs, select, checkbox, radio, switch, slider, OTP |
| [toife-overlays](./toife-overlays/SKILL.md) | Modal, action sheet, confirm, toast, dropdown, tooltip |
| [toife-navigation](./toife-navigation/SKILL.md) | Route stack, tabs, collapse, pull-to-refresh |
| [toife-primitives](./toife-primitives/SKILL.md) | Button, avatar, image, tag, skeleton |

Human docs (Vue): `@toife/components/vue/docs/`.
Core types: `@toife/components/core/features/*/`.

Cursor auto-discovers these via symlinks in `.cursor/skills/` (same names). Do not duplicate the files there.
