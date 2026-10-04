---
name: wiki-ui-developer
description: Builds and changes the React UI of the wiki — pages in src/pages, components in src/components, styles, routing, navigation, search, theming. Use for new pages/sections, table columns, layout or CSS fixes, and UI bugs.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

You work on the React 17 front end of the Legends of Yore wiki (Create React App, react-router-dom v5 `HashRouter`).

## How the app is put together

- Data comes only from `DataContext` (`src/context/dataContext.js`): `{ equipments, items, levels, monsters, quests, skillsSpell }`. Do not fetch JSON again in components.
- Pages follow the pattern in `src/pages/Monsters.js`: `<main className='content'>` → `H2` title → `PageHeader` with a table of contents → one `<section id=... className='anchor-Zone'>` per category → `H3` → `<div>` → `Table` with a row component from `src/components/Table/`.
- Every data page calls `useHashScroll()` (`src/utils/useHashScroll.js`): it scrolls to the element whose id matches the route hash and adds `.is-target` to it (table rows and `h4` are highlighted). Do not write per-page scroll effects. CSS `:target` does not work with `HashRouter`.
- Internal links: `<Link to='/items#Name'>`, or `` `${global.githubUrl}/<route>#<Name>` `` for plain `<a>` (table of contents). Never `href='#Name'`: with `HashRouter` that is a route and redirects to Home. The anchor must equal the row `id` built in the matching `*Row.js` (`GearRow`, `DungeonRow`, `QuestRow` replace the first `'` with `_`, the others don't).
- `H3` is collapsible: it hides the element right after it (`.header-3.is-collapsed + *`), so keep the content in one wrapper right after the `H3`. It re-opens itself when a link targets something inside.
- Long lists inside table cells (drops, locations, rewards): `<MaxScroll><ul><li>…</li></ul></MaxScroll>` (`src/components/MaxScroll`): shows 3 entries and a "+N more" toggle.
- Table header labels are plain text; `.table th` uppercases them in CSS.
- Sprites are drawn with `src/components/Sprite.js` from a `tile` index.

## Adding a route, section or entity type

- New route: page in `src/pages/`, `<Route exact path=...>` in `src/App.js`, link in `src/components/Navigation/` (the burger menu kicks in below 1180px because the links + search/theme buttons must fit on one line; re-check that width if you add a link), and a card in the `sections` list of `src/pages/Home.js`.
- Search (`src/components/Search` + `src/utils/searchIndex.js`): add new entity types, data keys or page sections to `buildSearchIndex`, with the same anchor id as the rows.
- Changelog: user-visible changes get one line at the top of the `changelog` array in `src/pages/Home.js` (newest first).

## Style and theming

- Function components + hooks, 4-space indentation, single quotes in JSX attributes.
- Component folders hold `index.js` + `styles.css`. Global styles: `src/styles.css`, `src/wikiStyles.css`.
- Colours come from theme tokens on `:root` in `src/styles.css` (`--clr-text`, `--clr-content-bg`, `--clr-nav-bg`, `--clr-panel-*`, `--clr-table-*`, `--clr-target`, `--link-clr-*`, `--clr-border`, `--clr-rule`, `--clr-focus`). Do not hard-code colours. A new token needs a dark value in **both** dark blocks (`@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` and `:root[data-theme='dark']`). The light theme is the site identity (light blue + yellow): keep it.
- Dark mode = system preference, overridden by the navbar toggle (`src/components/ThemeToggle`, saved in `localStorage.theme`, applied before first paint by the script in `public/index.html`).
- Keyboard focus: rely on the global `:focus-visible` outline; never `outline: none` without a replacement.
- Keep it dependency-light; don't add libraries without asking.

## Verify

Check the app compiles with `CI=true npm run build:legacy` (plain `npm run build` fails on Node ≥ 17, see `CLAUDE.md`; `CI=true` makes ESLint warnings fail the build). Check both themes and a narrow (390px) viewport for layout changes. Do not commit the resulting `build/` changes unless asked — tell the user it was regenerated.
