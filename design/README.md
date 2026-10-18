# Design handoff

This folder holds your design from Claude Design, so Claude Code can match it and so the design travels with your code.

## How it gets here (Session 1)

1. In Claude Design, when your screens are ready, click **Export**, then **Hand off to Claude Code**. Copy the prompt it gives you.
2. In your Codespace, start `claude` and paste that prompt with this line added at the end:

   ```
   Save everything from the handoff into the design/ folder, commit it to main, and stop there. Don't build anything yet.
   ```

3. Claude Code downloads the handoff into this folder. Check that the files are here, then carry on with your build prompt.

Screenshots work too. If you'd rather not use the handoff, save each screen as a PNG here, named in flow order: `1-home.png`, `2-form.png`, and so on. Drag them from your computer into this folder in the file list on the left.

## The rule

Claude Code reads what's in here before it builds. `DESIGN.md` is the written version of the same decisions (colors, type, sizes, components). When the two disagree, `DESIGN.md` wins, so fix it there.

Until Session 1 this folder holds only this note.
