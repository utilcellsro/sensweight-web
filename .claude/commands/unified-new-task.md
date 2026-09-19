The user wants to start a new piece of work on the unifiedcloudsensors.com site (the corporate "about us" page — distinct from sensweight.com's product/industry site, which uses `/new-task` instead). They may not be a programmer — keep everything you say in plain, non-technical language. Never mention AWS, Terraform, IAM, CloudFront, Lambda, or infra details unless something actually breaks and you need to explain why.

Do the following:

1. Make sure the local repo is clean and up to date: `git status` (if there are uncommitted changes on `main`, stop and ask what to do with them — don't discard anything), then `git checkout main && git pull`.
2. Ask the user, in their own words, what they want to change on unifiedcloudsensors.com — a wording change, a new Careers listing, a new item in the Updates carousel, a team photo swap, anything. There's no shared backlog file for this site (unlike sensweight.com's `TASKS.md`) — just start from whatever they describe.
3. Turn their description into a short branch name: slugify a few kebab-case words from it and run `git checkout -b task/uc-<slug>` off the up-to-date `main`.
4. Tell the user, plainly: they're now set up to work on "<description>". They can just describe what they want in the chat and you'll implement it directly in `unifiedcloudsensors/index_v6.html`. When they want to see it, `/unified-local-deploy`. When they're happy with the result, `/unified-finish-task` will wrap it up and merge it in — nothing goes live on the real site until they separately run `/unified-deploy-live`.

Do not start implementing anything yet in this command — just get the branch created. Implementation happens in the normal conversation that follows.
