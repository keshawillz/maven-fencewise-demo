# Design direction

Fill this in during Session 1, after your positioning. Claude Code reads it before it builds any screen, so every page follows the same rules without you policing it. Keep it short. If a choice isn't here, Claude picks the plainest option.

## Voice

Three adjectives from your positioning. How the product talks.

[Example: direct, warm, unhurried]

## Look

The look must match the voice. A playful voice can't ship a grey enterprise dashboard.

- **Background:** [one color, usually white or near-white]
- **Text:** [one dark color]
- **Accent:** [one color, used for the main button and links only]
- **Accent on hover:** [a darker shade of the accent]
- **Typeface:** [one family. The starter uses the system font; name a Google Font here if you want one]

## Sizes

- **Headline:** [example: 36px on desktop, 28px on phones]
- **Body:** [example: 16px, line height 1.5]
- **Small text:** [example: 14px]
- **Corner radius:** [one value for buttons, inputs and cards. Example: 8px]
- **Spacing unit:** [one number everything is a multiple of. Example: 8px]

## Components

Every button, input and card of the same kind looks the same.

- **Main button:** accent background, white text. Hover darkens. Pressed darkens more. Disabled is 60% opacity. Visible focus ring.
- **Secondary button:** [example: white background, text color border]
- **Inputs:** [example: 1px border, text color on focus]
- **Cards:** [example: white, 1px border, corner radius above, no shadow]

## Phones

- Content stacks in one column under 640px.
- Nothing scrolls sideways.
- Buttons are at least 44px tall.
- The layout still holds when the browser text size is set to 125%.

## Not in v1

- No dark mode. One background color.
- No animations beyond a hover color change.
- No menus or navigation bars unless the spec has more than one page.
