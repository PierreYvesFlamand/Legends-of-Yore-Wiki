# Legends of Yore Wiki

Fan wiki for the game Legends of Yore. React 17 single-page app (Create React App, `react-scripts` 4) using `react-router-dom` v5 with `HashRouter`. Published on GitHub Pages from the committed `build/` folder:
https://pierreyvesflamand.github.io/Legends-of-Yore-Wiki/build

## Commands

- `npm install` — install dependencies
- `npm start` — dev server on http://localhost:3000
- `npm run build` — production build into `build/` (this folder **is committed**; it is what GitHub Pages serves)
- `npm test` — CRA test runner (there are currently no tests)

### Node version workaround

`react-scripts` 4 does not run on Node ≥ 17 (Node 24 fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` in `postcss-safe-parser`). Until it is upgraded to `react-scripts` 5, use the `:legacy` scripts, which run react-scripts through a temporary Node 16 via npx:

- `npm run build:legacy` — production build into `build/`
- `npm run start:legacy` — dev server

`npm install` works fine on the current Node. Before committing, build with `CI=true npm run build:legacy` (Git Bash) so ESLint warnings fail the build.

## Layout

- `src/index.js` — entry; sets `global.githubUrl` (base URL used to build in-wiki anchor links) and wraps the app in `DataContextProvider` + `HashRouter`.
- `src/App.js` — route table (`/player`, `/items`, `/monsters`, `/dungeons`, `/quests`, `/activities`, `/shops`, `/world_map`).
- `src/context/dataContext.js` — fetches every JSON file in `public/data/gameData/` at startup and exposes them via `DataContext`. Children render only once all data is loaded. Levels are regrouped by dungeon using `src/utils/levelFilter.js`.
- `src/pages/` — one component per route.
- `src/components/` — shared UI (`H2`, `H3`, `PageHeader`, `Navigation`, `Footer`, `LevelCalc`, `Sprite`) and `Table/` with one row component per entity type (`GearRow`, `NonGearRow`, `MonsterRow`, `DungeonRow`, `QuestRow`).
- `public/data/gameData/*.json` — the game data (the wiki's real content):
  - `equipments.json` — object keyed by slot: `head, body, gloves, feet, melee, magic, ranged, off-hand, cloak, ring`
  - `items.json` — keyed by `consumable, miscellaneous, quest item`
  - `monsters.json` — keyed by `commons, legends, rares, no location`
  - `skillsSpell.json` — keyed by `spell, arch_skills, war_skills`
  - `levels.json` — `{ levels: { level: [...] } }`, a flat array of floors; indices are mapped to dungeons in `levelFilter.js`
  - `quests.json` — array of `{ town, npc, quests: [...] }`
- `public/data/spriteSheet/` — sprite sheets; entries reference them by `tile` index (see `Sprite.js`).
- `public/map/` — standalone Leaflet map (plain JS + jQuery, not React), embedded by `src/pages/Map.js` via `<object>`. Per-island markers live in `public/map/data/popup/<Island>.js`; tiles in `public/map/data/tiles/<Island>/z/x/y.png`.

## Conventions

- Game data values are **strings**, even numbers (`"level": "4"`, `"id": "11"`). Keep that format; code casts with `~~` / `Number()` where needed.
- Some fields may be a single object or an array (e.g. `itemChance`, `item`, `monsterChance`). Preserve whatever shape the surrounding entries use.
- Derived cross-reference fields (`dropedBy`, `foundIn`) are precomputed in the JSON. When adding/changing a monster drop or chest, update the matching item/equipment entry too. (Note the existing spelling `dropedBy` — do not "fix" it, the UI reads that key.)
- Anchor links between pages use `` `${global.githubUrl}/<page>#<Name>` ``; row `id`s must match entity names.
- Code style: 4-space indentation, single quotes in JSX attributes, function components with hooks.
- Never edit `build/` by hand — regenerate it with `npm run build`.
