# Onboarding — building and shipping sensweight.com changes

You don't need to know how to code, and you don't need an AWS account. Everything below happens by chatting with Claude Code and running four commands.

## One-time setup

1. **Install Claude Code** (if you don't have it yet) — ask the project owner for the install steps for your machine.
2. **Install Docker Desktop** — https://www.docker.com/products/docker-desktop/. You only need this to preview your changes locally; you don't need to know anything about Docker itself.
3. **Get GitHub access** — ask the project owner to add you as a collaborator on `utilcellsro/sensweight-web`. Then run `gh auth login` once in a terminal and follow the prompts.
4. **Clone the repo** — ask the project owner for the one-line command to get a local copy, or use GitHub Desktop if you prefer a visual tool.
5. **Open the project folder in Claude Code.**

That's the whole setup. From here on, everything happens through the four commands below.

## The everyday loop

### 1. `/new-task` — pick what to build

Run this to see the next thing on the list, or just tell Claude in your own words what you want to change or add — a new section, different wording, a new page, anything. Claude will turn it into a task and set up a clean, isolated branch for it so your work never conflicts with anyone else's.

### 2. Just describe what you want, in chat

Once a task is started, talk to Claude like you would to a developer sitting next to you: "make this headline shorter," "add a card here," "the button should say X instead." Claude implements it directly in the code — you don't need to touch any files yourself.

### 3. `/local-deploy` — see it for yourself

Run this any time to open the site on your own computer at **http://localhost:8080**, showing exactly your current change. Refresh the page after every round of edits to see the latest version. Nothing here affects the real website — it's your own private preview.

### 4. `/finish-task` — lock in the change

When you're happy with how it looks, run this. Claude will show you a plain-English summary of what actually changed and ask you to confirm before folding it into the shared codebase. Nothing merges without your explicit yes. This step still doesn't put anything on the live public site.

### 5. `/deploy-live` — publish it

When you're ready for the change to actually appear on the real site, run this. It kicks off an automated build-and-publish process on GitHub's servers and reports back with a link once it's done. You never see or touch AWS — that's all handled behind the scenes, authorized only through your GitHub login.

## What you never need to worry about

- **AWS** — no account, no credentials, nothing to configure. `/deploy-live` handles all of it through GitHub.
- **Breaking the live site** — your changes only ever live on your own branch until `/finish-task`, and only go live after `/deploy-live`. Nothing you do accidentally overwrites what's currently public.
- **Merge conflicts with a colleague** — every task gets its own branch by default, so parallel work stays separate until each is explicitly finished.

## If something goes wrong

- `/local-deploy` fails to build → tell Claude, it'll explain what broke in plain terms.
- `/deploy-live` fails → Claude will show you which step failed and a link to the details. Share that link with the project owner if you're not sure what to do next.
- Anything AWS/infrastructure-related that genuinely needs fixing (not just a content/code change) — flag it to the project owner rather than trying to resolve it yourself; that layer is intentionally kept out of your hands.
