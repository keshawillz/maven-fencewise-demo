# Idea to First User: starter

The empty foundation every product in the cohort starts from. A blank home page, a working signup form, and the deploy setup for AWS Amplify, with Claude Code ready to go in a GitHub Codespace. There is no idea in it. The idea is yours.

**Stack:** Next.js 15, Tailwind CSS 4, AWS Amplify Gen 2 (for signups), Amplify Hosting (deploy, week 3).

## 1. Make it yours (5 minutes)

1. Click **Use this template** at the top of this page, then **Create a new repository**.
2. Name it after your product (lowercase, dashes, no spaces). Keep it **Public** unless you have a reason not to.
3. Click **Create repository**. You now own a copy. Everything below happens in *your* repository, not this one.

## 2. Open it in a Codespace (5 minutes, mostly waiting)

1. In your new repository, click the green **Code** button, then the **Codespaces** tab, then **Create codespace on main**.
2. A browser tab opens with VS Code in it. If a box asks **Do you trust the authors of the files in this folder?**, click **Trust Folder & Continue**. It's your own repository, and the terminal won't work until you do.
3. The first time, it installs everything. Wait for the terminal at the bottom to go quiet (about five minutes). You'll see `npm install` finish and then `claude-code` install.
4. Nothing is installed on your laptop. The whole project runs in the Codespace.

## 3. First run (2 minutes)

In the terminal at the bottom of the Codespace, type:

```
npm run dev
```

If you paste the command and your browser asks whether the Codespace may **see text and images copied to the clipboard**, click **Allow**. That's a one-time browser permission for pasting into the terminal.

A new browser tab opens with your blank home page and the signup form. The first load takes a few seconds while Next.js compiles the page, so if the tab is blank, refresh it. If no tab opens at all (some browsers block pop-ups), click the **Ports** tab next to the terminal, hover over port 3000, and click the globe icon.

Try the form. In this phase it saves to your browser only ("local mode"). It starts saving for real when you connect Amplify in week 3.

## 4. Start Claude Code (3 minutes)

1. Open a second terminal: click the **+** at the top right of the terminal panel.
2. Type `claude` and press Enter.
3. The first time, it asks you to **choose a text style**. Use the arrow keys to pick **Auto (match terminal)** and press Enter. The Codespace terminal is light, and this picks the readable style for it. You can change it later by typing `/theme`.
4. Then it asks you to **select login method**. Pick **1. Claude account with subscription** (it's already highlighted) and press Enter.
5. VS Code asks **Do you want Code to open the external website?** Click **Cancel**. That route tries to send you back to a `localhost` page, which doesn't work from a Codespace.
6. In the terminal, under **Browser didn't open? Use the url below to sign in**, hold **Cmd** (Mac) or **Ctrl** (Windows) and click the long link. If VS Code asks about opening an external website again, click **Open** this time.
7. If the page asks you to sign in, use the same account as your Claude Pro plan. You then see **Claude Code would like to connect to your Claude chat account**. Click **Authorize**.
8. The page shows a code. Copy it, paste it into the terminal, and press Enter. When it says **Login successful. Press Enter to continue**, press Enter again.
9. It shows **Security notes**: Claude can make mistakes, and you review what it does. Read them, then press Enter.
10. It asks **Use Claude Code's terminal setup?** Leave **1. Yes, use recommended settings** highlighted and press Enter. This makes Shift+Enter start a new line in a prompt, so Enter alone sends it.
11. It asks a **Quick safety check** about the folder. Press the **down arrow** to move to **Yes, I trust this folder**, then press Enter. Don't just press Enter here: the first option is **No, exit**, and it will close Claude Code. If that happens, type `claude` again.
12. You're in. Try this as a hello world:

```
Read SPEC.md, DESIGN.md and CLAUDE.md. Tell me in three sentences what this project is and what you're allowed to build. Don't change anything.
```

Claude Code reads `CLAUDE.md` every time it starts. Those are the rules it follows for this project: plan first, work on a branch, explain every change, one flow only.

## 5. Stop the Codespace when you're done (1 minute)

The Codespace uses your free hours only while it's running.

- Click the blue button in the very bottom-left corner of the window. It says **Codespaces:** followed by your Codespace's two-word name (like "vigilant trout"). A list drops down from the top; pick **Stop Current Codespace**.
- Or go to [github.com/codespaces](https://github.com/codespaces), find it in the list, click **…**, then **Stop**.

Two settings worth changing once, at [github.com/settings/codespaces](https://github.com/settings/codespaces):

- **Default idle timeout:** 15 minutes. A forgotten tab then stops itself.
- **Default retention period:** leave at 30 days. Your stopped Codespace, with all your work, is kept that long. Your code is also in GitHub every time you merge, so nothing is lost either way.

Next time, open the same Codespace from the **Code** button (it lists existing ones) rather than creating a new one.

## What's inside

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Your home page. Replace the bracketed text with your positioning in week 1. |
| `app/layout.tsx` | Page title and description. Change them with your positioning too. |
| `components/SignupForm.tsx` | The signup form. Change the words, keep the save call. |
| `lib/signups.ts` | Saves a signup. Local mode now, Amplify in week 3. |
| `SPEC.md` | Your one-page spec. Claude Code reads it before building. Fill it in during Session 1. |
| `DESIGN.md` | Your design direction: voice, colors, type, sizes. Claude Code reads it before building any screen. Fill it in during Session 1. |
| `design/` | Your design from Claude Design (the handoff, or screenshots). Claude Code reads it before building. Added in Session 1. |
| `LAUNCH-CHECK.md` | Twelve pre-launch checks and the prompts to run them. Used in Sessions 3 and 4. |
| `CLAUDE.md` | The rules Claude Code follows in this project. |
| `amplify/` | The Amplify backend: one `Signup` table. Don't edit it in weeks 1 and 2. |
| `amplify.yml` | Build settings Amplify Hosting reads at deploy time. |
| `.devcontainer/` | What the Codespace installs. |

## Week 3 preview: going live

You'll connect this repository to AWS Amplify Hosting. Amplify builds the backend (the signup table) and the site from `main`, gives you a URL, and redeploys every time you merge. The full walkthrough comes in Session 3. For now you only need an AWS account; the AWS guide in pre-work covers that.

## If something breaks

- **Preview shows an error page:** read the error in the terminal, copy the first line, and paste it into Claude Code with "what does this mean?"
- **A preview pane inside VS Code says "github.com refused to connect":** that pane can't log you in to your app. Click the open-in-new-tab icon at its top right, or use the **Ports** tab globe icon. Your app only runs in a real browser tab.
- **`claude` says command not found:** the install didn't finish. Run `npm install -g @anthropic-ai/claude-code` in the terminal and try again.
- **Port 3000 is busy:** press Ctrl+C in the terminal running `npm run dev`, then run it again.
- **Anything else:** post in the cohort channel with the exact error message, or bring it to office hours.
