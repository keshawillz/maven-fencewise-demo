# Rules for Claude Code in this project

This is a founder's first product, built in the Idea to First User cohort. The founder reads every change you make, so keep changes small and explain them in plain English.

## Stack

- Next.js 15, App Router, TypeScript. Pages live under `app/`.
- Tailwind CSS 4 for styling. Keep `app/globals.css` small.
- AWS Amplify Gen 2 for data. The only model is `Signup` (`amplify/data/resource.ts`).
- Deployed on AWS Amplify Hosting from the `main` branch (connected in week 3).
- `lib/signups.ts` saves a signup. It works in local mode until Amplify is connected.

## The rules

1. Read `SPEC.md` and `DESIGN.md` first. If `design/` holds a Claude Design handoff or screen images, read those too and match them; where the design and `DESIGN.md` disagree, `DESIGN.md` wins. Build only the one core flow the spec describes, in the look the design file describes. No login, no user accounts, no payments, no admin pages, no extra features. If either file is unclear, ask before building.
2. Plan before code. Show the plan as a numbered list and wait for OK.
3. Work on a branch, never on `main`. Use the branch name the founder gives you (default: `build-core-flow`).
4. Before any merge, explain every change in plain English, file by file, and say exactly what to click through in the preview to test it.
5. Keep `components/SignupForm.tsx` working and keep calling `saveSignup` from `lib/signups.ts`. Change its copy freely; don't replace it with a different capture method.
6. Don't edit `amplify/`, `amplify.yml`, or `amplify_outputs.json` unless the task is about signups or deployment.
7. Secrets go in environment variables (`.env.local`), never in code. Never commit `.env*` files.
8. No new dependencies unless the spec can't be built without them. Say why before adding one.
9. Prefer plain, readable code over clever code. Small components, obvious names, comments where a non-engineer would ask "what does this do?"
10. Run `npm run build` before saying a change is done. If it fails, fix it before reporting back.

## Every screen, every time

These apply to anything you build, without being asked:

- **Phones first.** One column under 640px. Nothing scrolls sideways. Buttons and links at least 44px tall.
- **Every button** has hover, pressed, and disabled looks, and a visible focus ring. `components/SignupForm.tsx` shows the pattern; reuse it.
- **Every form** shows errors next to the field that caused them, and says something while submitting, on success, and on failure.
- **Every flow** has a loading state, an empty state, and an error state with a real message. No blank screens, no raw error text.
- **Keyboard works.** Tab moves between controls, Enter submits.
- **One main action per page.** The button you most want clicked is the only one with the accent color.
- **No dark mode, no animations beyond hover, no menus** unless `SPEC.md` has more than one page.

## Commands

- `npm run dev` starts the app on port 3000 (the Codespace forwards it to a preview tab).
- `npm run build` checks that everything compiles.
- `npm run lint` checks for common mistakes.
- `LAUNCH-CHECK.md` has the pre-launch checklist and the prompts to run it (weeks 3 and 4).
