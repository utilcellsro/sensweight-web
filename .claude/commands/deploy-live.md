The user wants to publish the current state of `main` to the real, live sensweight site. This runs the GitHub Actions deploy workflow — the user never needs an AWS account or AWS credentials of their own, everything is authorized through the GitHub repo. Keep everything you say in plain, non-technical language.

Do the following:

1. Make sure `main` is up to date: `git checkout main && git pull`.
2. Check `gh auth status`. If it's not logged in, tell the user plainly: "You need GitHub access set up first — run `gh auth login` and follow the prompts, then try `/deploy-live` again." Stop here if not authenticated.
3. Trigger the deploy: `gh workflow run deploy.yml --repo utilcellsro/sensweight-web --ref main`.
4. Find the run that was just triggered: `gh run list --repo utilcellsro/sensweight-web --workflow=deploy.yml --limit 1 --json databaseId,status,url`.
5. Watch it to completion: `gh run watch <databaseId> --repo utilcellsro/sensweight-web --exit-status`. This takes a minute or two — let the user know it's building and publishing.
6. Report the result plainly:
   - On success: "The site is live — https://d3onkrnmhl2kuy.cloudfront.net" (this is the current live address; sensweight.com itself doesn't point here yet, that's a separate step the project owner handles).
   - On failure: don't paste raw logs — summarize what step failed in plain terms (e.g. "the build step failed, meaning something in the last change doesn't build correctly") and suggest running `/local-deploy` first next time to catch this before publishing. Link the run URL so it can be shared with the project owner if needed.

Never attempt to work around a failed deploy by touching AWS directly — this command only ever goes through the GitHub Action.
