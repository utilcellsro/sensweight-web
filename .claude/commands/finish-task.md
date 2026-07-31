The user is done implementing the current task and wants to merge it into `main`. This is the approval gate — never merge without their explicit yes. Keep everything you say in plain, non-technical language.

Do the following:

1. Check the current branch with `git branch --show-current`. If it's `main`, tell the user there's nothing to finish — `/new-task` starts a new one — and stop.
2. Run `git status`. If there are uncommitted changes, commit them first (write a plain, clear commit message describing what changed — no need to ask permission for this commit, it's just saving their work on their own task branch).
3. Build a plain-language change summary — not a raw diff. Look at `git diff main...HEAD --stat` for which files changed, and describe in a few bullet points what was actually built/changed, in terms a non-programmer would understand (e.g. "Added a new 'UCS Cloud' card to the Products page" rather than "modified products.njk").
4. Show that summary to the user and ask for explicit confirmation before merging — e.g. "Here's what changed: [...]. Merge this into main?" Wait for a clear yes. If they say no or want changes, stop here and let them keep working on the branch — don't merge.
5. Once confirmed:
   - `git push -u origin <branch>` (push the task branch first, so it's backed up)
   - `git checkout main && git pull`
   - `git merge --no-ff <branch>` (keep the merge commit, matching this repo's convention)
   - `git push`
   - Delete the branch: `git branch -d <branch>` and `git push origin --delete <branch>`
6. Confirm to the user in one sentence that the change is merged into `main`. Then remind them: this does NOT put it on the live website yet — that only happens when they run `/deploy-live`.

If the merge has conflicts, do not force anything — stop, explain in plain terms that something needs a human decision, and suggest reaching out to the project owner.
