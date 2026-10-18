# Launch check

Run this in Session 3, before the quiet launch, and again in Session 4 after you rewrite the site copy. It's twelve checks for a one-flow product. Claude Code reports first and fixes nothing until you say so.

## The prompt

Paste this into Claude Code:

```
Read SPEC.md and DESIGN.md. Then check this project against the twelve items in LAUNCH-CHECK.md. Don't change anything. Give me a list of what fails, one line each, grouped as mobile, states, and launch basics. Then wait.
```

Read the list. Pick what matters. Then fix it in three small merges, one group at a time, each on its own branch, each reviewed with the "Before every merge" prompt:

```
Fix only the mobile items from your list, on a branch called fix-mobile. Then explain what you changed, file by file, and tell me what to click through to test it.
```

Repeat for `fix-states` and `fix-launch`. Three small diffs you can read beat one big one you can't.

## The twelve checks

**Mobile**

1. Nothing scrolls sideways at 390px wide, and nothing spills off the screen.
2. Every button and link is at least 44px tall.
3. The layout holds when the browser text size is set to 125%.

**States**

4. The core flow has a loading state, an empty state, and an error state, each with a real message. No blank screens, no raw error text.
5. Every button has hover, pressed, and disabled looks, and a visible focus ring.
6. Form errors show next to the field that caused them. Submitting, success, and failure each say something.

**Launch basics**

7. The home page says what the product is and who it's for in one line a stranger understands in five seconds.
8. Each page has one main button, the thing you most want the visitor to click.
9. Every page has a title and description (in `app/layout.tsx` or the page's own metadata) and the favicon is yours, not the starter's.
10. No bracketed placeholder text anywhere. Search the project for `[` to be sure.
11. The whole flow works with keyboard only: Tab to move, Enter to submit.
12. Every link goes somewhere, and every button does something.

## What's not on this list, on purpose

No mobile menu, no dark mode, no transitions on modals or tabs. A one-flow product doesn't have those, and asking for them is how v1 grows a navigation bar nobody needed. If your spec added a second page, add a check for its link and nothing else.
