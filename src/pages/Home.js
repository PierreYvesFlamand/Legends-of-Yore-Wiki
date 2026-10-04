import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import H2 from '../components/H2';
import Search from '../components/Search';
import Sprite from '../components/Sprite';

import './Home.css';

const sections = [
    { to: '/player', title: 'Player', desc: 'Classes, subclasses, experience, stats and pets', tile: '16', sheet: 'chars' },
    { to: '/items', title: 'Items', desc: 'Gears, spells, sets, consumables and quest items', tile: '2', sheet: 'tiles' },
    { to: '/monsters', title: 'Monsters', desc: 'Stats, drops and locations of every monster', tile: '19', sheet: 'chars' },
    { to: '/dungeons', title: 'Dungeons', desc: 'Floors, spawns, chests and legends', tile: '84', sheet: 'tiles' },
    { to: '/quests', title: 'Quests', desc: 'Every quest giver, objective and reward', tile: '424', sheet: 'tiles' },
    { to: '/activities', title: 'Activities', desc: 'Repairing, crafting, treasure maps, digging, fishing, finding', tile: '235', sheet: 'tiles' },
    { to: '/shops', title: 'Shops', desc: 'What each gears, magic and inn shop sells', tile: '82', sheet: 'tiles' },
    { to: '/world_map', title: 'World map', desc: 'Interactive map of every island', tile: '351', sheet: 'tiles' },
];

// Newest first
const changelog = [
    'Global search (press / anywhere) + light / dark theme',
    'Easier to read tables: striped rows, highlighted linked row, "+N more" on long lists',
    'New home page, collapsible sections, accessibility fixes',
    'New top navigation + mobile friendly layout',
    'Player section',
    'Added Shops',
    'Added activities (Repairing, Crafting, TMaps, Digging, Fishing, Finding)',
    'All quests added + Add quest reward on items',
    'World map Dungeons / Monsters finish',
    'Monsters / Dungeons finish',
    'Hidden Cove in-depth info',
    'New theme',
    'Imported all raw Dungeons / Monsters / Items',
];

const DISCORD_URL = 'https://discord.gg/YKXpRrrunp';

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className='content home'>
            <H2 as='h1'>Legends of Yore Wiki</H2>
            <section>
                <div>
                    <p>
                        An in-depth fan wiki about{' '}
                        <a target='_blank' rel='noreferrer' href='https://www.legendsofyore.com/' title='Legends of Yore website'>
                            Legends of Yore
                        </a>
                        : items, monsters, dungeons, quests and more.
                    </p>
                    <div className='home-search'>
                        <Search id='home-search' />
                    </div>
                </div>
            </section>

            <section aria-labelledby='home-sections'>
                <h2 id='home-sections' className='visually-hidden'>
                    Wiki sections
                </h2>
                <ul className='home-cards'>
                    {sections.map(({ to, title, desc, tile, sheet }) => (
                        <li key={to}>
                            <Link to={to} className='home-card'>
                                <Sprite tile={tile} spriteSheet={sheet} className='sprite home-card-sprite' />
                                <span className='home-card-title'>{title}</span>
                                <span className='home-card-desc'>{desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <H2>Changelog</H2>
            <section>
                <div>
                    <ul className='no-list-style'>
                        {changelog.map((txt, id) => (
                            <li key={id}>✅ {txt}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <H2>Contributing - Reporting issues</H2>
            <section>
                <div>
                    <p>This wiki is edited only by its owner, @polfy.</p>
                    <p>
                        If you want to contribute (text, images) or report an issue, contact @polfy on Discord, for example on the{' '}
                        <a target='_blank' rel='noreferrer' href={DISCORD_URL} title='Legends of Yore Discord'>
                            Legends of Yore Discord
                        </a>
                        .
                    </p>
                </div>
            </section>
        </main>
    );
}
