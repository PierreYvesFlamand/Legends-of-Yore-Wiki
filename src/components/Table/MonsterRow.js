import React from 'react';
import { Link } from 'react-router-dom';

import Sprite from '../Sprite';
import MaxScroll from '../MaxScroll';

export default function MonsterRow(monsters, isRare = false) {
    return monsters.reduce((acc, monster) => {
        const { health, attack, defence, charge, zen, rage } = monster.statistics;

        return [
            ...acc,
            {
                id: monster.name.split(' ').join('_'),
                data: [
                    <Sprite tile={monster.tile} spriteSheet='chars' className='sprite' title={monster.name} alt={monster.name} />,
                    <Link to={`/monsters#${monster.name.split(' ').join('_')}`}>{monster.name}</Link>,
                    monster.exp,
                    monster.kingdom,
                    health,
                    attack,
                    defence,
                    `${charge ? charge : 0} / ${zen ? zen : 0} / ${rage ? rage : 0}`,
                    <MaxScroll>
                        <ul>{GetDrop(monster)}</ul>
                    </MaxScroll>,
                    isRare ? (
                        <>
                            {monster.foundIn}{' '}
                            <Link to={`/monsters#${monster.name === 'Golden Imp' ? 'Black_Imp' : monster.name.split(' ')[1]}`}>
                                {monster.name === 'Golden Imp' ? 'Black Imp' : monster.name.split(' ')[1]}
                            </Link>
                        </>
                    ) : monster.foundIn.length ? (
                        <MaxScroll>
                            <ul>
                                {monster.foundIn.map((foundIn, id) => {
                                    if (
                                        foundIn.split(' ')[0] !== 'The' &&
                                        (foundIn.split(' ')[1] === 'Island' || foundIn.split(' ')[2] === 'Island')
                                    ) {
                                        return (
                                            <li key={id}>
                                                <Link to={`/world_map#${foundIn.split(' ').join('_')}`}>{foundIn}</Link>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={id}>
                                                <Link to={`/dungeons#${foundIn.split(' ').slice(0, -1).join('_').replace("'", '_')}`}>{foundIn}</Link>
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

function GetDrop(monster) {
    if ((!monster.item && !monster.itemChance) || monster.name === 'Devil') {
        return '–';
    } else {
        return (
            <>
                {monster.item ? <ItemsDrop items={monster.item} /> : null}
                {monster.itemChance ? <ItemChance itemChance={monster.itemChance} monster={monster} /> : null}
            </>
        );
    }
}

function ItemsDrop({ items }) {
    if (!Array.isArray(items)) {
        items = [items];
    }

    return (
        <>
            {items.map((item, id) => {
                return (
                    <li key={id}>
                        <Link to={`/items#${item.name.split(' ').join('_').replace("'", '_')}`}>{item.name}</Link>{' '}
                        {item.onein ? `${((1 / ~~item.onein) * 100).toFixed(2).replace(/\.0+$/, '')}%` : '100%'}
                    </li>
                );
            })}
        </>
    );
}

function ItemChance({ itemChance }) {
    if (!Array.isArray(itemChance)) {
        itemChance = [itemChance];
    }
    const maxChance = itemChance.reduce((acc, cur) => acc + ~~cur.chance, 0);

    return (
        <>
            {itemChance.map((item, id) => {
                return item.chance && item.name && item.name !== 'null' ? (
                    <li key={id}>
                        <Link to={`/items#${item.name.split(' ').join('_').replace("'", '_')}`}>{item.name}</Link>{' '}
                        {`${((item.chance / maxChance) * 100).toFixed(2).replace(/\.0+$/, '')}%`}
                    </li>
                ) : null;
            })}
        </>
    );
}
