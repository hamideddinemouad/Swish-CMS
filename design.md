# Swish Website Design

## Purpose
This document tracks visual design choices for the Swish website and CMS marketing surface. It is not a product architecture document. It is the reference for palette, typography direction, and general UI styling decisions.

## Design Direction
- Clean and product-led.
- Friendly and playful without looking childish.
- Bright accents on top of a restrained base.
- Clear hierarchy, high contrast, and simple spacing.

## Color Strategy
Swish will use the official Wix color palette as its visual base. Blue is the main brand/action color. The other Wix colors are supporting accents and should be used intentionally, not all at once in the same component.

## Official Wix Color Palette
Source: https://cs.wix.com/about/design-assets/design-assets

| Token | Name | HEX | RGB | CMYK | Suggested Use In Swish |
| --- | --- | --- | --- | --- | --- |
| `wix-blue` | Wix Blue | `#3899EC` | `56 / 153 / 236` | `71 / 32 / 0 / 0` | Primary buttons, links, active states, focus rings |
| `wix-yellow` | Wix Yellow | `#FFC233` | `255 / 194 / 51` | `0 / 27 / 84 / 0` | Highlights, badges, promotional callouts |
| `wix-purple` | Wix Purple | `#AA4DC8` | `170 / 77 / 200` | `55 / 75 / 0 / 0` | Creative accents, illustrations, secondary emphasis |
| `wix-green` | Wix Green | `#60BC57` | `96 / 188 / 87` | `64 / 0 / 81 / 0` | Success states, confirmations, positive metrics |
| `wix-orange` | Wix Orange | `#FB7D33` | `251 / 125 / 51` | `0 / 61 / 81 / 0` | Attention states, featured elements, warm accents |

## Swish Status Extension
Wix's public design asset palette does not include a red token. Swish adds one as an implementation extension for destructive and validation error states.

| Token | Name | HEX | RGB | Suggested Use In Swish |
| --- | --- | --- | --- | --- |
| `wix-red` | Wix Red | `#E02B4A` | `224 / 43 / 74` | Error states, destructive actions, invalid form feedback |

## Supporting Neutral Palette
These values appear in Wix's official design assets under typography and black hues. They are useful as Swish neutrals.

| Token | HEX | RGB | CMYK | Suggested Use In Swish |
| --- | --- | --- | --- | --- |
| `ink-900` | `#363636` | `54 / 54 / 54` | `69 / 63 / 62 / 56` | Primary headings and strongest body text |
| `ink-700` | `#555555` | `85 / 85 / 85` | `64 / 56 / 55 / 31` | Secondary body text |
| `ink-500` | `#777777` | `119 / 119 / 119` | `55 / 46 / 46 / 11` | Muted text, helper text |
| `ink-300` | `#929292` | `146 / 146 / 146` | `45 / 37 / 38 / 2` | Borders, placeholders, disabled text |

## Usage Rules
- Default CTA color: `wix-blue`
- Default text color: `ink-900`
- Default secondary text color: `ink-700`
- Use `wix-green` only for success and positive feedback.
- Use `wix-red` for destructive actions and validation errors.
- Use `wix-orange` for attention and featured UI, not destructive actions.
- Use `wix-yellow` sparingly because it is visually loud.
- Use `wix-purple` as a supporting accent, not the main action color.
- Avoid placing all five accent colors in the same screen section.


## Suggested CSS Tokens
```css
:root {
  --color-wix-blue: #3899ec;
  --color-wix-yellow: #ffc233;
  --color-wix-purple: #aa4dc8;
  --color-wix-green: #60bc57;
  --color-wix-orange: #fb7d33;
  --color-wix-red: #e02b4a;

  --color-ink-900: #363636;
  --color-ink-700: #555555;
  --color-ink-500: #777777;
  --color-ink-300: #929292;
}
```

## Typography Direction
- Base type direction: modern grotesk or neo-grotesk sans serif.
- Reference from Wix brand assets: Helvetica Neue.
- If Helvetica Neue is not available on the web stack, choose a close sans serif with clean proportions and strong readability.
- Keep headings bold and compact.
- Keep body copy neutral and highly legible.

## Component Intent
- Buttons: blue by default, high contrast label, rounded but not pill-only everywhere.
- Cards: neutral base with one accent color maximum.
- Badges: yellow, green, or purple depending on meaning.
- Navigation: mostly neutral, with blue for active and interactive states.
- Forms: neutral structure with blue focus, green success, red errors, orange for warnings if needed.
