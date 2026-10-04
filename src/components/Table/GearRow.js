import React from 'react';
import { Link } from 'react-router-dom';

import Sprite from '../Sprite';
import MaxScroll from '../MaxScroll';

const sets = {
    1: 'Crusader set',
    2: 'Elven set',
    3: 'Magic set',
    4: 'Merlin set',
    5: 'Viking set',
    6: 'Bandit set',
    7: 'Ninja set',
    8: 'Jester set',
    9: 'Witch doctor set',
    10: 'Death set',
    11: 'Spectral set',
    12: 'Pirate set',
    13: 'Zombie set',
    14: 'Shaman set',
};

export default function GearRow(items) {
    return items
        .sort((a, b) => ~~a.level - ~~b.level)
        .reduce((acc, item) => {
            return [
                ...acc,
                {
                    id: item.name.split(' ').join('_').replace("'", '_'),
                    data: [
                        <Sprite tile={item.tile} spriteSheet='tiles' className='sprite' title={item.name} alt={item.name} />,
                        <Link to={`/items#${item.name.split(' ').join('_').replace("'", '_')}`}>{item.name}</Link>,
                        item.level,
                        item.classes ? item.classes.split(',').map((clas, id) => <p key={id}>{clas}</p>) : 'All',
                        item.attackMod ? item.attackMod : '0',
                        item.defenceMod ? item.defenceMod : '0',
                        <ItemModifier modifiers={item.modifier} />,
                        ~~(item.cost * 0.05) + 1,
                        item.dropedBy.length ? (
                            <MaxScroll>
                                <ul>
                                    {item.dropedBy.map((dropedBy) => {
                                        return (
                                            <li key={dropedBy.name}>
                                                <Link to={`/monsters#${dropedBy.name.split(' ').join('_').replace("'", '_')}`}>{dropedBy.name}</Link>{' '}
                                                {`${dropedBy.chance === '100/100' ? '' : ``} ${(
                                                    (~~dropedBy.chance.split('/')[0] / ~~dropedBy.chance.split('/')[1]) *
                                                    100
                                                )
                                                    .toFixed(2)
                                                    .replace(/\.0+$/, '')}%`}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </MaxScroll>
                        ) : (
                            '–'
                        ),
                        item.foundIn.length ? (
                            <MaxScroll>
                                <ul>
                                    {item.foundIn.map((foundIn, id) => {
                                        if (foundIn === 'Shops') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/shops#${item.name.split(' ').join('_').replace("'", '_')}`}>Shops</Link>
                                                </li>
                                            );
                                        } else if (foundIn === 'Treasure Map') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/activities#treasure_maps`}>Treasure Map</Link>
                                                </li>
                                            );
                                        } else if (foundIn === 'Crafting') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/activities#crafting`}>Crafting</Link>
                                                </li>
                                            );
                                        } else if (foundIn === 'Finding') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/activities#finding`}>Finding</Link>
                                                </li>
                                            );
                                        } else if (foundIn === 'Fishing') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/activities#fishing`}>Fishing</Link>
                                                </li>
                                            );
                                        } else if (foundIn === 'Digging') {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/activities#digging`}>Digging</Link>
                                                </li>
                                            );
                                        } else if (foundIn.name) {
                                            return (
                                                <li key={id}>
                                                    <Link to={`/dungeons#${foundIn.name.split(' ').slice(0, -1).join('_').replace("'", '_')}`}>
                                                        {foundIn.name}
                                                    </Link>{' '}
                                                    {`${foundIn.chance === '100/100' ? '' : ``} ${(
                                                        (~~foundIn.chance.split('/')[0] / ~~foundIn.chance.split('/')[1]) *
                                                        100
                                                    )
                                                        .toFixed(2)
                                                        .replace(/\.0+$/, '')}%`}
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={id}>
                                                    Quest{' '}
                                                    <Link to={`/quests#${foundIn.quest.split(' ').join('_').replace("'", '_')}`}>
                                                        {foundIn.quest}
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </MaxScroll>
                        ) : (
                            '–'
                        ),
                    ],
                },
            ];
        }, []);
}

function ItemModifier({ modifiers }) {
    if (!modifiers) {
        return '–';
    }

    if (!Array.isArray(modifiers)) {
        modifiers = [modifiers];
    }

    modifiers = modifiers.map((modif, id) => {
        switch (modif.type) {
            case 'tick':
                return (
                    <p key={id} className='gear-info'>
                        {modif.value.substring(0, 1) === '-' ? `- ${modif.value.substring(1)}` : `+ ${modif.value}`} {modif.attribute} /{' '}
                        {modif.attribute === 'hp' ? 'attack' : 'turn'}
                    </p>
                );

            case 'magic':
            case 'resist':
                return (
                    <p key={id} className='gear-info'>
                        + {modif.value} {modif.type}
                    </p>
                );

            case 'set':
                return (
                    <Link key={id} className='gear-info' to={`/items#${sets[modif.value].split(' ').join('_')}`}>
                        {sets[modif.value]}
                    </Link>
                );

            default:
                return (
                    <p key={id} className='gear-info'>
                        {modif.value.substring(0, 1) === '-' ? `- ${modif.value.substring(1)}` : `+ ${modif.value}`} {modif.attribute} vs {modif.type}
                    </p>
                );
        }
    });

    return <>{modifiers}</>;
}
