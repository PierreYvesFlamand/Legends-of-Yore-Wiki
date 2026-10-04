import React from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import Sprite from './Sprite';

import ncpLocation from '../utils/npcLocation';
import MaxScroll from './MaxScroll';

const craftingData = [
    {
        item: { name: 'Cloak', tile: '129' },
        material: [
            {
                item: 'Dog Pelt',
                value: 10,
            },
            {
                item: 'Gold',
                value: 10,
            },
        ],
        npc: ['Leon', 'Alva'],
    },
    {
        item: { name: 'Longsword', tile: '87' },
        material: [
            {
                type: 'gear',
                item: 'Sword',
                value: 1,
            },
            {
                item: 'Ruby',
                value: 12,
            },
            {
                item: 'Gold',
                value: 100,
            },
        ],
        npc: ['Leon'],
    },
    {
        item: { name: 'Composite Bow', tile: '91' },
        material: [
            {
                type: 'gear',
                item: 'Bow',
                value: 2,
            },
            {
                item: 'Gem',
                value: 5,
            },
            {
                item: 'Gold',
                value: 100,
            },
        ],
        npc: ['Leon'],
    },
    {
        item: { name: 'Spiked Shield', tile: '53' },
        material: [
            {
                type: 'gear',
                item: 'Wooden Shield',
                value: 1,
            },
            {
                item: 'Stinger',
                value: 10,
            },
            {
                item: 'Gold',
                value: 1000,
            },
        ],
        npc: ['Meaty'],
    },
    {
        item: { name: 'Spiked Boots', tile: '52' },
        material: [
            {
                type: 'gear',
                item: 'Boots',
                value: 1,
            },
            {
                item: 'Stinger',
                value: 10,
            },
            {
                item: 'Gold',
                value: 1000,
            },
        ],
        npc: ['Meaty'],
    },
    {
        item: { name: 'Goif Bow', tile: '48' },
        material: [
            {
                type: 'gear',
                item: 'Bow',
                value: 1,
            },
            {
                type: 'gear',
                item: 'Goif Gloves',
                value: 20,
            },
            {
                item: 'Gold',
                value: 1000,
            },
        ],
        npc: ['Meaty'],
    },
    {
        item: { name: 'Flame Cloak', tile: '432' },
        material: [
            {
                item: 'Dragon Horn',
                value: 10,
            },
            {
                item: 'Lion Skin',
                value: 10,
            },
            {
                item: 'Gold',
                value: 20000,
            },
        ],
        npc: ['Mcarthur'],
    },
    {
        item: { name: 'Katana', tile: '418' },
        material: [
            {
                item: 'Frost Claw',
                value: 20,
            },
            {
                item: 'Bone',
                value: 10,
            },
            {
                item: 'Gold',
                value: 24000,
            },
        ],
        npc: ['Mcarthur'],
    },
    {
        item: { name: 'Ornate Bow', tile: '284' },
        material: [
            {
                item: 'Diamond',
                value: 10,
            },
            {
                item: 'Horse Hair',
                value: 15,
            },
            {
                item: 'Gold',
                value: 22000,
            },
        ],
        npc: ['Mcarthur'],
    },
];

export default function Crafting() {
    return (
        <Table
            header={['Icon', 'Name', 'Materials', 'Npc']}
            rows={craftingData.reduce((acc, craft) => {
                return [
                    ...acc,
                    {
                        id: `craft-${craft.item.name}`,
                        data: [
                            <Sprite tile={craft.item.tile} spriteSheet='tiles' className='sprite' title={craft.item.name} alt={craft.item.name} />,
                            <Link to={`/items#${craft.item.name.split(' ').join('_')}`}>{craft.item.name}</Link>,

                            <MaxScroll>
                                <ul>
                                    {craft.material.map((mat, id) => (
                                        <li key={id}>
                                            {mat.value}{' '}
                                            {mat.type ? (
                                                <Link to={`/items#${mat.item.split(' ').join('_')}`}>{mat.item}</Link>
                                            ) : (
                                                <Link to={`/items#${mat.item.split(' ').join('_')}`}>{mat.item}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </MaxScroll>,

                            <MaxScroll>
                                <ul>
                                    {craft.npc.map((npc, id) => (
                                        <li key={id}>
                                            <Link to={`/world_map#i=${ncpLocation[npc].map}&x=${ncpLocation[npc].x}&y=${ncpLocation[npc].y}`}>
                                                {npc}
                                            </Link>
                                        </li>
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
