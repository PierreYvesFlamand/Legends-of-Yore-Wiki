import React from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import Sprite from './Sprite';
import MaxScroll from './MaxScroll';

const shops = [
    {
        name: 'Skull',
        tile: 238,
        cost: 100000,
        towns: ['Necro'],
    },
    {
        name: 'Tooth Dagger',
        tile: 212,
        cost: 1500,
        requirement: 'Tooth Ache',
        towns: ['Aria'],
    },
    {
        name: 'Lava Bow',
        tile: 221,
        cost: 63600,
        requirement: 'Medicine Man',
        towns: ["S'thel"],
    },
    {
        name: 'Band of Odin',
        tile: 9,
        cost: 45500,
        requirement: 'The Treaty',
        towns: ['Donheim'],
    },
    {
        name: 'Elven Boots',
        tile: 20,
        cost: 7000,
        requirement: 'The Treaty',
        towns: ['Donheim'],
    },
    {
        name: 'Crusader Shield',
        tile: 3,
        cost: 26000,
        requirement: 'The Treaty',
        towns: ['Donheim'],
    },
    {
        name: 'Lion Shield',
        tile: 220,
        cost: 56000,
        requirement: 'Hyrda Claw',
        towns: ['Gombard'],
    },
    {
        name: 'Spade',
        tile: 237,
        cost: 500,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Durnik',
            'Hermit',
            'Jungle',
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
        name: 'Fishing Pole',
        tile: 235,
        cost: 500,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Hermit',
            'Jungle',
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
        name: 'Lava Rod',
        tile: 319,
        cost: 5000,
        requirement: 'Dragon Bashing',
        towns: ['Gombard'],
    },
    {
        name: 'Lava Rod',
        tile: 319,
        cost: 5000,
        towns: ['Thule', 'Cennyn', 'Naleg', 'Tal Mita', 'Kor', 'Ynys', 'Tal Nivek', 'Airlon'],
    },
    {
        name: 'Attack Elixir',
        tile: 76,
        cost: 150000,
        towns: ['Nordolk'],
    },
    {
        name: 'Apple',
        tile: 81,
        cost: 4,
        towns: ['Aria', "S'thel", 'Donheim', 'Gombard', 'Jungle'],
    },
    {
        name: 'Meat',
        tile: 98,
        cost: 5,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Durnik',
            'Jungle',
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
        name: 'Chop',
        tile: 265,
        cost: 100,
        towns: ['Jungle'],
    },
    {
        name: 'Trap',
        tile: 78,
        cost: 50,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Durnik',
            'Hermit',
            'Jungle',
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
        name: 'Powder Keg',
        tile: 73,
        cost: 2000,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Jungle',
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
        name: 'Pet Food',
        tile: 386,
        cost: 200,
        towns: [
            'Aria',
            "S'thel",
            'Donheim',
            'Gombard',
            'Durnik',
            'Hermit',
            'Jungle',
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
        name: 'Octopus',
        tile: 507,
        cost: 740,
        towns: ['Thicket'],
    },
    {
        name: 'Grog',
        tile: 411,
        cost: 100,
        towns: ['Thicket'],
    },
    {
        name: 'Horse Hair',
        tile: 309,
        cost: 25000,
        towns: ['Paititi'],
    },
    {
        name: 'Gold Plate',
        tile: 308,
        cost: 40000,
        towns: ['Thule', 'Cennyn', 'Naleg', 'Tal Mita', 'Kor', 'Ynys', 'Tal Nivek', 'Airlon'],
    },
];
export default function InnShops() {
    return (
        <Table
            header={['Icon', 'Name', 'Price', 'Location', 'Requirement']}
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
                            item.requirement ? (
                                <>
                                    Complete <Link to={`/quests#${item.requirement.split(' ').join('_')}`}>{item.requirement}</Link>
                                </>
                            ) : (
                                '–'
                            ),
                        ],
                    },
                ];
            }, [])}
        />
    );
}
