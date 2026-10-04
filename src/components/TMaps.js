import React from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import MaxScroll from './MaxScroll';

const tMaps = [
    {
        level: 2,
        cost: 100,
        desc: 'The map shows Aria town',
        reward: ['Spire Dagger', 'Gold'],
        gold: 1000,
        map: 'Aria_Island',
        x: '-43.961191',
        y: '-18.632813',
    },
    {
        level: 4,
        cost: 1000,
        desc: 'The map shows Aria town',
        reward: ['Gold Ring', 'Gold'],
        gold: 1000,
        map: 'Aria_Island',
        x: '-43.834527',
        y: '-40.78125',
    },
    {
        level: 5,
        cost: 200,
        desc: 'The map shows the graveyard',
        reward: ['Bone Staff', 'Spiked Flail', 'Ridged Dagger', 'Gold'],
        gold: 2000,
        map: 'Aria_Island',
        x: '-68.656555',
        y: '-24.609375',
    },
    {
        level: 8,
        cost: 500,
        desc: 'The map shows the desert valley',
        reward: ['Viking Helm', 'Capped Boots', 'Gold'],
        gold: 2000,
        map: 'Aria_Island',
        x: '2.460181',
        y: '-95.976563',
    },
    {
        level: 14,
        cost: 1000,
        desc: 'The map shows the wilderness',
        reward: ['Ice Shards', 'Gold'],
        gold: 3000,
        map: 'Aria_Island',
        x: '6.664608',
        y: '-38.671875',
    },
    {
        level: 19,
        cost: 2000,
        desc: 'The map shows the snowy wastes',
        reward: ['Opal Wand', 'Gold'],
        gold: 4000,
        map: 'Aria_Island',
        x: '54.572062',
        y: '-149.0625',
    },
    {
        level: 26,
        cost: 4000,
        desc: 'The map shows the beach',
        reward: ['Knights Shield', 'Gold'],
        gold: 5000,
        map: 'Cennyn_Island',
        x: '-15.45368',
        y: '-102.304687',
    },
    {
        level: 30,
        cost: 1000,
        desc: 'The map shows the snowy wastes near Nordolk',
        reward: ['Long Shield', 'Gold'],
        gold: 3000,
        map: 'Aria_Island',
        x: '61.606396',
        y: '-91.40625',
    },
    {
        level: 55,
        cost: 2000,
        desc: 'The map shows the east gate of Toronega',
        reward: ['Phoenix Blade', 'Gold'],
        gold: 5000,
        map: 'Cennyn_Island',
        x: '33.72434',
        y: '-25.136719',
    },
    {
        level: 65,
        cost: 5000,
        desc: 'The map shows the jungle',
        reward: ['Fire Shield', 'Gold'],
        gold: 10000,
        map: 'Cennyn_Island',
        x: '65.802776',
        y: '33.398438',
    },
];

export default function Crafting() {
    return (
        <Table
            header={['Level', 'Cost', 'Description', 'Reward', 'Location']}
            rows={tMaps.reduce((acc, tMap) => {
                return [
                    ...acc,
                    {
                        id: ``,
                        data: [
                            tMap.level,
                            tMap.cost,
                            tMap.desc,
                            <MaxScroll>
                                <ul>
                                    {tMap.reward.map((item, id) => {
                                        return (
                                            <li key={id}>
                                                {item === 'Gold' ? `${tMap.gold} ` : null}
                                                <Link to={`/items#${item.split(' ').join('_')}`}>{item}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </MaxScroll>,
                            <Link to={`/world_map#i=${tMap.map}&x=${tMap.x}&y=${tMap.y}`}>Click to see on map</Link>,
                        ],
                    },
                ];
            }, [])}
        />
    );
}
