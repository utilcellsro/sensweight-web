The user wants to see the current state of unifiedcloudsensors.com on their own machine. Keep everything you say in plain, non-technical language.

unifiedcloudsensors.com is a single self-contained HTML file (`unifiedcloudsensors/index_v6.html`) — no build step, no Docker, no Node.js, nothing to install. This is simpler than sensweight.com's `/local-deploy`, which needs Docker.

Do the following:

1. Tell the user to open `unifiedcloudsensors/index_v6.html` directly in any browser — double-click the file in File Explorer/Finder, or drag it into an open browser window. Everything renders exactly as it will on the real site: text, images, layout, styling.
2. Mention one honest caveat: the Contact and Careers forms won't actually send anything from this local file preview (the form submission only works once the page is deployed for real, since it needs to reach the live backend). Tell them not to worry if a test submission there doesn't do anything — everything else (all visible content and layout) previews accurately.
3. Tell them to just refresh the file in the browser after each round of changes to see the latest version — no rebuild step needed.

This previews whatever branch is currently checked out — it does not merge anything and does not touch the real live site. Use `/unified-finish-task` when the work is ready to merge, and `/unified-deploy-live` to actually publish to the real site.
