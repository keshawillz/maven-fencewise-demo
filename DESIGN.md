# Design direction

Claude Code reads this before it builds any screen. Everything here is deliberate. If a choice isn't here, Claude picks the plainest option, never a decorative one.

## Voice

Plain, confident, neighborly. Fencewise talks like a contractor who gives you a straight number over the fence instead of booking a sales visit. Sentence case everywhere, including buttons and labels. No all-caps text anywhere. Buttons say what happens: "Get my estimate," "See my estimate," "Request a real quote."

## The one memorable thing

Fences are measured in linear feet, with a tape measure. The product's signature is a **tape measure** drawn in CSS:

- A horizontal band, 40px tall, tape yellow, with black tick marks every 8px along its top edge (a repeating linear gradient, no images), and a taller tick every 40px.
- On the home page it sits under the headline as a full-width rule, like a tape laid across the page.
- On the result screen it carries the estimate: the low price sits at the left end, the high price at the right end, both in the condensed face at headline size, and the band between them is the range. One line under it says what moves the price.

Nothing else on the page competes with it. No other decoration.

## Look

- **Background:** white (#FFFFFF)
- **Text:** black (#000000)
- **Accent:** tape yellow (#FFD23F). Used for the main button and the tape band only.
- **Accent on hover:** deeper yellow (#F2BF1C). Pressed: #E0AE0C.
- **Tint:** off-white (#F3F3EE) for input backgrounds and the selected material tile.
- **Typeface:** Barlow Condensed (weight 600) for headlines, prices and the big numbers; Barlow (weights 400 and 500) for everything else. Load both with `next/font/google` in `app/layout.tsx`. That's built into Next.js, so no new package.

## Sizes

- **Headline:** 56px on desktop, 40px on phones. Line height 1.0. Letter spacing -0.01em. Condensed face.
- **Prices on the result screen:** same as headline.
- **Body:** 18px, line height 1.5.
- **Small text:** 14px.
- **Corner radius:** 4px on buttons, inputs and tiles. Not rounder.
- **Spacing unit:** 8px. Sections are 64px apart on desktop, 48px on phones.
- **Content width:** 560px maximum, left-aligned. The tape band is the one element allowed to run the full width of the content column.

## Components

Every button, input and tile of the same kind looks the same.

- **Main button:** tape yellow background, black text, 52px tall, condensed face at 22px. Hover and pressed use the darker yellows above. Disabled is 60% opacity. Visible 2px black focus ring with 2px offset. One per page.
- **Secondary button:** none in v1. If the spec needs a back link, it's a plain underlined text link.
- **Inputs:** tint background, 1px black border at 20% opacity, 2px solid black border on focus, 52px tall, 18px text. Label above in Barlow 500, never a placeholder alone.
- **Material picker:** four tiles in a 2 by 2 grid (wood, vinyl, chain link, aluminum). Each is a radio input styled as a tile: tint background, 1px border, the material name in the condensed face at 22px and its per-foot range in small text underneath. The selected tile gets a 2px black border. Keyboard arrows move between them.
- **Height picker:** two tiles the same way (4 ft, 6 ft). Default 6 ft.
- **Gates:** a plain number input, default 1, minimum 0.
- **The estimate slip (result screen):** no card, no border. The tape band with the two prices, the one-line note, then the quote form below with 48px of space above it.
- **The signup form:** keep the starter's `SignupForm` component and its `saveSignup` call. Restyle its input and button to match the rules above. Heading: "Request a real quote." Button: "Request a real quote."

## Phones

- Content stacks in one column under 640px. The material tiles stay 2 by 2 down to 360px.
- Nothing scrolls sideways. The tape band shrinks with the column; the prices stay at the ends.
- Buttons and tiles are at least 44px tall.
- The layout still holds when the browser text size is set to 125%.

## Not in v1

- No dark mode. One background color.
- No animations beyond the hover color change.
- No menus or navigation bars. The flow is home, estimate, result, done.
- No illustrations, icons, stock photos, gradients or shadows.
- No cards except the picker tiles.