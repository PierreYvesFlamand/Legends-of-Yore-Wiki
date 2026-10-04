---
name: release
description: Publish the wiki — audit the data, rebuild build/ with npm run build, and commit it so GitHub Pages serves the new version. Use when the user asks to release, publish, deploy or update the live wiki.
disable-model-invocation: true
---

Publish the Legends of Yore wiki. GitHub Pages serves the committed `build/` folder from `master`.

1. `git status` — if there are uncommitted source changes, list them and ask whether to include them.
2. Run the `data-auditor` subagent. If it reports JSON parse errors or broken drop references, stop and show them.
3. `npm run build`. If it fails, show the error and stop.
4. Show `git status --short build | head` and the number of changed files in `build/`.
5. Ask for confirmation, then commit source + `build/` together with a message like `Release: <short summary of changes>`.
6. Ask before pushing. After pushing, give the live URL: https://pierreyvesflamand.github.io/Legends-of-Yore-Wiki/build
