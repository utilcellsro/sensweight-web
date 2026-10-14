The user is done implementing the current unifiedcloudsensors.com task and wants to merge it into `main`. This is the approval gate — never merge without their explicit yes. Keep everything you say in plain, non-technical language.

Do the following:

1. Check the current branch with `git branch --show-current`. If it's `main`, tell the user there's nothing to finish — `/unified-new-task` starts a new one — and stop.
2. Run `git status`. If there are uncommitted changes, commit them first (write a plain, clear commit message describing what changed — no need to ask permission for this commit, it's just saving their work on their own task branch).
3. Build a plain-language change summary — not a raw diff. Look at `git diff main...HEAD --stat -- unifiedcloudsensors/` for which files changed, and describe in a few bullet points what was actually changed, in terms a non-programmer would understand (e.g. "Added a new Careers listing for a Field Engineer role" rather than "modified index_v6.html").
4. **Check the translations before asking to merge.** The site is published in English, Czech and Polish; the Czech and Polish pages are generated from `unifiedcloudsensors/index_v6.html`, so any new or reworded English text needs a translation or it will show up in English on those pages. Run `node unifiedcloudsensors/scripts/build-i18n.js --report`. If either language is below 100%, run `--todo cs` / `--todo pl` to see exactly which strings are missing, write the translations into `unifiedcloudsensors/i18n/cs.json` and `pl.json` (keys are the English text, values the translation), re-run the report to confirm 100%, and commit that too. Say plainly what you translated. Do not merge with missing translations without telling the user they will appear in English.
   Keep the two files in step with each other: if the English text changed, the old key is now stale and the report flags it.
5. Show that summary to the user and ask for explicit confirmation before merging — e.g. "Here's what changed: [...]. Merge this into main?" Wait for a clear yes. If they say no or want changes, stop here and let them keep working on the branch — don't merge.
6. Once confirmed:
   - `git push -u origin <branch>` (push the task branch first, so it's backed up)
   - `git checkout main && git pull`
   - `git merge --no-ff <branch>` (keep the merge commit, matching this repo's convention)
   - `git push`
   - Delete the branch: `git branch -d <branch>` and `git push origin --delete <branch>`
7. Confirm to the user in one sentence that the change is merged into `main`. Then remind them: this does NOT put it on the live unifiedcloudsensors.com website yet — that only happens when they run `/unified-deploy-live`.

If the merge has conflicts, do not force anything — stop, explain in plain terms that something needs a human decision, and suggest reaching out to the project owner.
