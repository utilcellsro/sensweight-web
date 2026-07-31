The user wants to see the current state of the site running on their own machine, using Docker (no Node.js or other dev tools required — just Docker Desktop). Keep everything you say in plain, non-technical language.

Do the following:

1. Check Docker is available: run `docker info`. If it fails, tell the user plainly: "Docker Desktop needs to be installed and running first — download it from https://www.docker.com/products/docker-desktop/, open the app, wait for it to say it's running, then run `/local-deploy` again." Stop here if Docker isn't available.
2. From the repo root, run `docker compose up --build -d`. This builds the site fresh (using the exact same build the live site uses) and serves it locally via nginx.
3. If the build fails, show the last ~30 lines of `docker compose logs` and explain in plain terms what likely went wrong (e.g. "the last change introduced a typo in a template file") rather than pasting the raw error unexplained.
4. If it succeeds, tell the user the site is now running at **http://localhost:8080** — they can open that in any browser to click around and see the current state of their branch's work.
5. Mention, briefly, that it'll keep running in the background until they either restart their machine or run `docker compose down` — they don't need to do anything to stop it if they're just moving on to more changes.

This command previews whatever branch is currently checked out — it does not merge anything and does not touch the real live site. Use `/finish-task` when the work is ready to merge, and `/deploy-live` to actually publish to the real site.
