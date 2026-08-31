# @toife/sass-layer

Sass library for design tokens, utility classes, and theme generation. No build step required — use raw Sass files directly in your project.

## Installation

```bash
npm install @toife/sass-layer
# or
yarn add @toife/sass-layer
# or
pnpm add @toife/sass-layer
```

## Usage

### Basic import

```scss
@use "@toife/sass-layer" with (
  $prefix: "t",
  $separator: "-"
);
```

### Use config, functions, mixins, generators

```scss
@use "@toife/sass-layer" as sass-layer;

// Config (prefix, separator)
// Functions: fn-naming-*, fn-color-*
// Mixins: mx-palette, mx-tokens
// Generators: classes-generate, properties-generate
```

### Example: Generate utility classes

```scss
@use "@toife/sass-layer" as sass-layer;

@include sass-layer.classes-generate();
```

### Example: Generate theme from tokens

```scss
@use "@toife/sass-layer" as sass-layer;

$theme: (
  "spacing": (...),
  "layers": (...),
  "shapes": (...),
  "sizes": (...),
  "palette": (...)
);

@include sass-layer.properties-generate("light", $theme);
```

## API

| Namespace | Description |
|-----------|-------------|
| `config` | `$prefix`, `$separator` variables |
| `fn-naming-*` | Naming functions (prefix, property, var...) |
| `fn-color-*` | Color utilities (palette, mix, tint, shade...) |
| `mx-*` | Mixins (palette, tokens) |
| `classes-*` | Utility class generators (spacing, flex, display...) |
| `properties-*` | Theme/token generators (layers, shapes, tokens) |

## Peer dependency

- `sass` >= 1.50.0
