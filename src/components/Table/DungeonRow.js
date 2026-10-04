import React from 'react';
import { Link } from 'react-router-dom';
import MaxScroll from '../MaxScroll';

export default function DungeonRows(dungeons, customData, id) {
    return dungeons.reduce((acc, floor, idx) => {
        if (floor.chest && !Array.isArray(floor.chest.itemChance)) {
            floor.chest.itemChance = [floor.chest.itemChance];
        }
        const totalChestChance = floor.chest ? floor.chest.itemChance.reduce((acc, cur) => acc + ~~cur.chance, 0) : 0;

        if (floor.ref && customData) {
            for (const key in customData.dungeon[floor.id]) {
                floor[key] = customData.dungeon[floor.id][key];
            }
        }

        const totalMonsterChance = floor.monsterChance ? floor.monsterChance.reduce((acc, cur) => acc + ~~cur.chance, 0) : 0;

        return [
            ...acc,
            {
                id: `${id.split(' ').join('_').replace("'", '_')}_F${idx + 1}`,
                data: [
                    `F${idx + 1}`,
                    `${floor.minMonsters} / ${floor.maxMonsters}`,
                    <MaxScroll>
                        <ul>
                            {floor.monsterChance
                                ? floor.monsterChance.map((monster) => {
                                      if (monster.type && monster.type !== 'none') {
                                          return (
                                              <li key={monster.type}>
                                                  <Link key={monster.type} to={`/monsters#${monster.type.split(' ').join('_')}`}>
                                                      {monster.type}
                                                  </Link>{' '}
                                                  {`${((monster.chance / totalMonsterChance) * 100).toFixed(2).replace(/\.0+$/, '')}%`}
                                              </li>
                                          );
                                      } else {
                                          return null;
                                      }
                                  })
                                : null}
                        </ul>
                    </MaxScroll>,
                    floor.chest ? floor.chests : '–',
                    <MaxScroll>
                        <ul>
                            {floor.chest && floor.chest.itemChance
                                ? floor.chest.itemChance.map((item) => {
                                      if (item.name && item.name !== 'none') {
                                          return (
                                              <li key={item.name}>
                                                  <Link key={item.name} to={`/items#${item.name.split(' ').join('_')}`}>
                                                      {item.name}
                                                  </Link>{' '}
                                                  {`${((item.chance / totalChestChance) * 100).toFixed(2).replace(/\.0+$/, '')}%`}
                                              </li>
                                          );
                                      } else {
                                          return null;
                                      }
                                  })
                                : '–'}
                        </ul>
                    </MaxScroll>,
                    floor.legend ? <Link to={`/monsters#${floor.legend.split(' ').join('_')}`}>{floor.legend}</Link> : '–',
                ],
            },
        ];
    }, []);
}
