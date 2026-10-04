---
name: add-game-entry
description: Add a new monster, item, equipment piece, spell/skill, quest, or dungeon floor to the wiki, end to end (data, cross-references, map marker, audit). Use when the user says "add <thing> to the wiki".
argument-hint: <type> <name> [details]
---

Add a new game entry to the Legends of Yore wiki: $ARGUMENTS

1. If key facts are missing (level, stats, drops, location, tile index), ask the user for them in one question before editing. Never invent stats.
2. Delegate the data change to the `game-data-editor` subagent with all the facts, including cross-references to update.
3. If the entry has a location on the world map (monster, NPC, dungeon) and the user gave coordinates/island, delegate the marker to the `map-editor` subagent.
4. Run the `data-auditor` subagent and report only issues related to the new entry (mention the count of pre-existing issues separately).
5. Summarise the changed files. Do not run `npm run build` or commit unless asked.
