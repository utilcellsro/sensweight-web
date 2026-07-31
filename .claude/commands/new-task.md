The user wants to start a new piece of work on the sensweight.com site. They may not be a programmer — keep everything you say in plain, non-technical language. Never mention AWS, Terraform, IAM, CloudFront, or infra details unless something actually breaks and you need to explain why.

Do the following:

1. Make sure the local repo is clean and up to date: `git status` (if there are uncommitted changes on `main`, stop and ask what to do with them — don't discard anything), then `git checkout main && git pull`.
2. Read `TASKS.md` in the repo root. Find the first task in the `## Status` list still marked `- [ ]` (not started). Skip anything marked `[x]` (done) or `[~]` (in progress).
3. If you found one: show the user its title and a short plain-language summary of what it involves (translate the technical "Done when" bullets into a couple of sentences a non-programmer would understand). Ask them to confirm they want to work on this one, or whether they'd rather describe something else.
4. If there's nothing pending in `TASKS.md`, or the user wants to work on something not listed: ask them, in their own words, what they want to build or change. Turn that into a short new task entry (title + one-line "done when") and append it to `TASKS.md`'s Status list as `- [ ]`. Keep it simple — no need for the full detail template the other tasks use, a short entry is fine.
5. Once the task is confirmed, create a branch for it: slugify the task title into a few kebab-case words and run `git checkout -b task/<slug>` off the up-to-date `main`.
6. Tell the user, plainly: they're now set up to work on "<task title>". They can just describe what they want in the chat and you'll implement it. When they want to see it running, they can use `/local-deploy`. When they're happy with the result, `/finish-task` will wrap it up and merge it in — nothing goes live on the real site until they separately run `/deploy-live`.

Do not start implementing anything yet in this command — just get the task picked/confirmed and the branch created. Implementation happens in the normal conversation that follows.
