import React from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import Sprite from './Sprite';
import MaxScroll from './MaxScroll';

const shops = [
    {
        name: 'Attack Elixir',
        tile: 76,
        cost: 150000,
        towns: ['Dondheim'],
    },
    {
        name: 'Defence Elixir',
        tile: 77,
        cost: 150000,
        towns: ["S'thel"],
    },

    {
        name: 'Protect',
        tile: 123,
        cost: 2000,
        towns: ['Aria'],
    },

    {
        name: 'Flashbang',
        tile: 99,
        cost: 2000,
        towns: ['Aria'],
    },
    {
        name: 'Frost Bolt',
        tile: 107,
        cost: 2200,
        towns: ['Dondheim'],
    },
    {
        name: 'Freeze',
        tile: 122,
        cost: 3000,
        towns: ['Aria', 'Dondheim', 'Gombard'],
    },
    {
        name: 'Teleport',
        tile: 105,
        cost: 4000,
        towns: ['Aria', 'Gombard'],
    },

    {
        name: 'Greater Heal',
        tile: 103,
        cost: 2500,
        towns: ["S'thel"],
    },

    {
        name: 'Drain',
        tile: 313,
        cost: 6000,
        towns: ['Thule', 'Cennyn', 'Naleg', 'Tal Mita', 'Kor', 'Ynys', 'Tal Nivek', 'Airlon'],
    },
    {
        name: 'Move',
        tile: 119,
        cost: 6000,
        towns: ['Dondheim'],
    },

    {
        name: 'Cure',
        tile: 316,
        cost: 12000,
        towns: ["S'thel", 'Gombard', 'Nordolk', 'Paititi'],
    },

    {
        name: 'Explosion',
        tile: 109,
        cost: 8000,
        towns: ["S'thel"],
    },

    {
        name: 'Magic Missile',
        tile: 108,
        cost: 28000,
        towns: ['Nordolk', 'Toronega', 'Paititi', 'Thule', 'Cennyn', 'Naleg', 'Tal Mita', 'Kor', 'Ynys', 'Tal Nivek', 'Airlon'],
    },

    {
        name: 'Anger',
        tile: 315,
        cost: 68000,
        towns: ['Paititi'],
    },
    {
        name: 'Town Portal',
        tile: 100,
        cost: 250,
        towns: [
            'Aria',
            "S'thel",
            'Dondheim',
            'Gombard',
            'Hermit',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Red Potion',
        tile: 80,
        cost: 25,
        towns: [
            'Aria',
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Blue Potion',
        tile: 83,
        cost: 80,
        towns: [
            'Aria',
            "S'thel",
            'Dondheim',
            'Gombard',
            'Hermit',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Purple Potion',
        tile: 79,
        cost: 220,
        towns: [
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Turq Potion',
        tile: 126,
        cost: 450,
        towns: [
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Orange Potion',
        tile: 127,
        cost: 1000,
        towns: [
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Green Potion',
        tile: 85,
        cost: 30,
        towns: [
            'Aria',
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
    {
        name: 'Aqua Potion',
        tile: 124,
        cost: 130,
        towns: [
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
            'Thicket',
        ],
    },
    {
        name: 'Gold Potion',
        tile: 125,
        cost: 270,
        towns: [
            "S'thel",
            'Dondheim',
            'Gombard',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
            'Thicket',
        ],
    },
    {
        name: 'Pale Potion',
        tile: 317,
        cost: 525,
        towns: [
            "S'thel",
            'Gombard',
            'Durnik',
            'Nordolk',
            'Toronega',
            'Paititi',
            'Thule',
            'Cennyn',
            'Naleg',
            'Tal Mita',
            'Kor',
            'Ynys',
            'Tal Nivek',
            'Airlon',
        ],
    },
];
export default function MagicShops() {
    return (
        <Table
            header={['Icon', 'Name', 'Price', 'Location']}
            rows={shops.reduce((acc, item) => {
                return [
                    ...acc,
                    {
                        id: item.name.split(' ').join('_'),
                        data: [
                            <Sprite tile={item.tile} spriteSheet='tiles' className='sprite' title={item.name} alt={item.name} />,
                            <Link to={`/items#${item.name.split(' ').join('_')}`}>{item.name}</Link>,
                            item.cost,
                            <MaxScroll>
                                <ul>
                                    {item.towns.map((town, id) => (
                                        <li key={id}>{town}</li>
                                    ))}
                                </ul>
                            </MaxScroll>,
                        ],
                    },
                ];
            }, [])}
        />
    );
}
