# One-page spec

## Product

**Name:** Fencewise

**Positioning:** For homeowners who need a fence price before they call anyone, Fencewise is a 60-second estimator that gives a real ballpark number and a next step.

## One user

A homeowner who just decided to replace or add a fence, has no idea what it costs, and doesn't want to book three contractor visits to find out.

## One problem

They can't get a number without a sales call, so they put it off for months.

## One flow

1. **Home:** headline, subhead, one button: "Get my estimate."
2. **Estimate form:** fence length in feet, material (wood, vinyl, chain link, aluminum), number of gates, height (4 ft or 6 ft). One "See my estimate" button.
3. **Result:** a price range (low to high), a one-line note on what moves the price, a plain "Change my answers" text link back to the form, and a "Request a real quote" signup form (email, name optional) that saves with source "estimate".
4. **Done:** "Got it. We'll send a real quote within two business days." with the estimate still visible.

## Pricing math (v1, keep it simple)

Per-foot ranges, 6 ft height: wood $25 to $45, vinyl $30 to $55, chain link $15 to $30, aluminum $40 to $70. Multiply by 0.8 for 4 ft. Add $350 to $650 per gate. Round to the nearest $50. These are placeholder numbers; a real contractor would replace them.

## Out of scope for v1

- No login or user accounts
- No payments
- No contractor matching, no scheduling, no photos, no address lookup
- No saving estimates across visits

## Done when

A homeowner can enter four fields, see a price range, and leave their email on the live URL, and the signup shows up with source "estimate".

## Signups

Where the signup form appears in the flow: on the result screen only. The home page has one action: "Get my estimate."

What the button says: "Request a real quote"