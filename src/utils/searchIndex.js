import levelFilter from './levelFilter';

// Anchor ids must match the row ids built in src/components/Table/*Row.js:
// GearRow, DungeonRow and QuestRow also replace the first apostrophe, the others do not.
const anchor = (name) => name.split(' ').join('_');
const anchorApos = (name) => anchor(name).replace("'", '_');
const capitalize = (txt) => txt.substring(0, 1).toUpperCase() + txt.substring(1);

// Page sections that are not game entities
const SECTIONS = [
    ...['Warrior', 'Archer', 'Wizard', 'Subclass', 'Experience', 'Stats', 'Pets'].map((name) => ({ name, to: `/player#${name}` })),
    ...['Repairing', 'Crafting', 'Treasure maps', 'Digging', 'Fishing', 'Finding'].map((name) => ({
        name,
        to: `/activities#${anchor(name.toLowerCase())}`,
    })),
    ...['Gears shops', 'Magic shops', 'Inn shops'].map((name) => ({ name, to: `/shops#${anchor(name.toLowerCase())}` })),
    { name: 'Sets', to: '/items#Sets' },
    { name: 'World map', to: '/world_map' },
].map((section) => ({ ...section, type: 'Page' }));

export function buildSearchIndex({ equipments, items, monsters, quests, skillsSpell }) {
    const entries = [];
    const add = (entry) => entries.push({ ...entry, key: normalize(entry.name) });

    Object.keys(equipments).forEach((slot) =>
        equipments[slot].forEach((item) =>
            add({ name: item.name, type: capitalize(slot), tile: item.tile, sheet: 'tiles', to: `/items#${anchorApos(item.name)}` })
        )
    );

    skillsSpell.spell.forEach((spell) =>
        add({ name: spell.name, type: 'Spell', tile: spell.tile, sheet: 'tiles', to: `/items#${anchor(spell.name)}` })
    );

    [
        ['war_skills', 'Warrior skill', 'Warrior'],
        ['arch_skills', 'Archer skill', 'Archer'],
    ].forEach(([key, type, section]) =>
        (skillsSpell[key] || []).forEach((skill) => add({ name: skill.name, type, tile: skill.tile, sheet: 'tiles', to: `/player#${section}` }))
    );

    Object.keys(items).forEach((type) =>
        items[type].forEach((item) =>
            add({ name: item.name, type: capitalize(type), tile: item.tile, sheet: 'tiles', to: `/items#${anchor(item.name)}` })
        )
    );

    Object.keys(monsters).forEach((group) =>
        monsters[group].forEach((monster) =>
            add({
                name: monster.name,
                type: group === 'legends' ? 'Legend' : group === 'rares' ? 'Rare monster' : 'Monster',
                tile: monster.tile,
                sheet: 'chars',
                to: `/monsters#${anchor(monster.name)}`,
            })
        )
    );

    [...levelFilter.map(({ name }) => name), 'Passageway', 'Hidden Cove'].forEach((name) =>
        add({ name, type: 'Dungeon', to: `/dungeons#${anchorApos(name)}` })
    );

    quests.forEach(({ town, npc, quests: list }) => {
        add({ name: `${town} quests`, type: `Quest giver: ${npc}`, to: `/quests#${anchorApos(town)}` });
        list.forEach((quest) => add({ name: quest.title, type: `Quest · ${town}`, to: `/quests#${anchorApos(quest.title)}` }));
    });

    SECTIONS.forEach(add);

    // The same entity can be listed twice (e.g. a monster in several groups)
    const seen = new Set();
    return entries.filter((entry) => {
        const id = entry.to + entry.name;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
}

export function search(index, query, limit = 8) {
    const q = normalize(query);
    if (!q) return [];

    return index
        .map((entry) => {
            const pos = entry.key.indexOf(q);
            if (pos === -1) return null;
            // Best: name starts with the query, then a word starts with it, then anywhere
            const score = pos === 0 ? 0 : entry.key[pos - 1] === ' ' ? 1 : 2;
            return { entry, score };
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score || a.entry.name.length - b.entry.name.length || a.entry.name.localeCompare(b.entry.name))
        .slice(0, limit)
        .map(({ entry }) => entry);
}

function normalize(txt) {
    return txt
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[_\s]+/g, ' ')
        .trim();
}
