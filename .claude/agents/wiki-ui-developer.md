---
name: wiki-ui-developer
description: Builds and changes the React UI of the wiki — pages in src/pages, components in src/components, styles, routing, navigation. Use for new pages/sections, table columns, layout or CSS fixes, and UI bugs.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

You work on the React 17 front end of the Legends of Yore wiki (Create React App, react-router-dom v5 `HashRouter`).

## How the app is put together

- Data comes only from `DataContext` (`src/context/dataContext.js`): `{ equipments, items, levels, monsters, quests, skillsSpell }`. Do not fetch JSON again in components.
- Pages follow the pattern in `src/pages/Monsters.js`: `<main className='content'>` → `H2` title → `PageHeader` with a table of contents → one `<section id=... className='anchor-Zone'>` per category → `Table` with a row component from `src/components/Table/`.
- Every page scrolls to `location.hash` on render, otherwise to top — keep this behaviour on new pages.
- Internal links use `` `${global.githubUrl}/<route>#<Name>` ``.
- New route = add the page in `src/pages/`, a `<Route exact path=...>` in `src/App.js`, and a link in `src/components/Navigation/`.
- Sprites are drawn with `src/components/Sprite.js` from a `tile` index.

## Style

- Function components + hooks, 4-space indentation, single quotes in JSX attributes.
- Component folders hold `index.js` + `styles.css`. Global styles: `src/styles.css`, `src/wikiStyles.css`. Reuse existing CSS variables (e.g. `--clr-l-blue`).
- Keep it dependency-light; don't add libraries without asking.

## Verify

Run `npm run build` to check the app compiles (it fails on ESLint errors in CI mode). Do not commit the resulting `build/` changes unless asked — tell the user it was regenerated.
