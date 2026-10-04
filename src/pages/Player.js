import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import useHashScroll from '../utils/useHashScroll';
import H2 from '../components/H2';
import H3 from '../components/H3';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Sprite from '../components/Sprite';

import LevelCalc from '../components/LevelCalc';

import { DataContext } from '../context/dataContext';
import MaxScroll from '../components/MaxScroll';

const pets = [
    {
        tile: '67',
        name: 'Chicken',
        level: 15,
        cost: 25000,
        maxLevel: 30,
        baseHp: 10,
        hpGain: 1,
        baseAtk: 1,
        atkGain: 0.5,
        baseDef: 2,
        defGain: 0.5,
        baseCharge: 0,
        chargeGain: 1,
        names: [
            'Arnold',
            'Cluckles',
            'Kentucy',
            'Fluffy',
            'Boris',
            'Drumstick',
        ],
        abilities: [
            { level: 10, name: 'Fire Breathing' },
            { level: 25, name: 'Poison Peck' },
        ],
        evolve: false,
    },
    {
        tile: '359',
        name: 'Monkey',
        level: 15,
        cost: 25000,
        maxLevel: 30,
        baseHp: 10,
        hpGain: 1,
        baseAtk: 1,
        atkGain: 0.6,
        baseDef: 2,
        defGain: 0.4,
        baseCharge: 0,
        chargeGain: 1,
        names: ['Bubbles', 'MrTeeny', 'Nibbler', 'Shakes', 'Moo', 'Scooter'],
        abilities: [{ level: 10, name: 'Poison Bite' }],
        evolve: false,
    },
    {
        tile: '28',
        name: 'Wild Dog',
        level: 45,
        cost: 50000,
        maxLevel: 35,
        baseHp: 15,
        hpGain: 2,
        baseAtk: 2,
        atkGain: 1,
        baseDef: 3,
        defGain: 0.5,
        baseCharge: 0,
        chargeGain: 0,
        names: ['Barker', 'Bingo', 'Fido', 'Butch', 'Hobbo', 'Defer'],
        abilities: [
            { level: 12, name: 'Poison Bite' },
            { level: 25, name: 'Poison Mawl' },
        ],
        evolve: false,
    },
    {
        tile: '356',
        name: 'Blue Slime',
        level: 75,
        cost: 100000,
        maxLevel: 40,
        baseHp: 25,
        hpGain: 3,
        baseAtk: 4,
        atkGain: 1.5,
        baseDef: 5,
        defGain: 1,
        baseCharge: 0,
        chargeGain: 0,
        names: ['Goop', 'Fry', 'Gish', 'Mookie', 'Slim', 'Mauve'],
        abilities: [
            { level: 12, name: 'Poison Touch' },
            { level: 23, name: 'Poison Slime' },
            { level: 33, name: 'Poison Grab' },
        ],
        evolve: { level: 30, name: 'Bluholder', tile: '361' },
    },
    {
        tile: '355',
        name: 'Drake',
        level: 105,
        cost: 250000,
        maxLevel: 40,
        baseHp: 40,
        hpGain: 5,
        baseAtk: 12,
        atkGain: 2,
        baseDef: 13,
        defGain: 2,
        baseCharge: 25,
        chargeGain: 5,
        names: ['Drako', 'Mavis', 'Smorg', 'Bathos', 'Isdare', 'Gorin'],
        abilities: [
            { level: 8, name: 'Fire Breathing' },
            { level: 12, name: 'Poison Bite' },
            { level: 19, name: 'Frost Breath' },
            { level: 29, name: 'Fire Blast' },
        ],
        evolve: { level: 25, name: 'Dragoon', tile: '360' },
    },
    {
        tile: '358',
        name: 'Gorilla',
        level: 125,
        cost: 35000,
        maxLevel: 50,
        baseHp: 55,
        hpGain: 1,
        baseAtk: 15,
        atkGain: 2.5,
        baseDef: 13,
        defGain: 2.5,
        baseCharge: 0,
        chargeGain: 1,
        names: ['Alfie', 'Patrick', 'Rupert', 'Caeser', 'Frank', 'Kong'],
        abilities: [],
        evolve: false,
    },
    {
        tile: '362',
        name: 'Croc',
        level: 130,
        cost: 35000,
        maxLevel: 55,
        baseHp: 60,
        hpGain: 1,
        baseAtk: 14,
        atkGain: 2.6,
        baseDef: 15,
        defGain: 2.8,
        baseCharge: 0,
        chargeGain: 1,
        names: ['Snapper', 'Chomp', 'Munch', 'Smiler', 'TickTock', 'Ali'],
        abilities: [
            { level: 15, name: 'Poison Tear' },
            { level: 30, name: 'Fire Breathing' },
            { level: 45, name: 'Clamp of Poisons' },
        ],
        evolve: false,
    },
];

const warSprite = (
    <Sprite
        tile='16'
        spriteSheet='chars'
        className='sprite'
        title='Warrior'
        alt='Warrior'
    />
);
const archSprite = (
    <Sprite
        tile='18'
        spriteSheet='chars'
        className='sprite'
        title='Archer'
        alt='Archer'
    />
);
const wizSprite = (
    <Sprite
        tile='17'
        spriteSheet='chars'
        className='sprite'
        title='Wizard'
        alt='Wizard'
    />
);

export default function Dungeons() {
    const { war_skills, arch_skills, spell } =
        useContext(DataContext).skillsSpell;
    useHashScroll();

    const [statLevel, setStatLevel] = useState(61);

    return (
        <main className='content'>
            <H2>Player</H2>
            <PageHeader
                tablaOfContent={[
                    'Warrior',
                    'Archer',
                    'Wizard',
                    'Subclass',
                    'Experience',
                    'Stats',
                    'Pets',
                ].reduce(
                    (acc, key) => [
                        ...acc,
                        <a href={`${global.githubUrl}/player#${key}`}>{key}</a>,
                    ],
                    []
                )}
            ></PageHeader>
            <section id='Warrior' className='anchor-Zone'>
                <H3>Warrior</H3>
                <div>
                    <div style={{ width: '40px' }}>{warSprite}</div>
                    <p>
                        Warrior use melee weapon, shield and the rage ability.
                    </p>
                    <p>
                        Unlike the other classes, rage only increases when
                        damage is taken, and decreases when damage is not taken.
                        Rage allows for higher hits. The more close your are to
                        max rage, the higher the chance is to deal a critical
                        hit.
                    </p>
                    <p>
                        List of skills learned by{' '}
                        <Link
                            to={`/world_map#i=Aria_Island&x=-48.922499&y=-51.679688`}
                        >
                            Ryu
                        </Link>{' '}
                        :
                    </p>
                    <Table
                        header={['Icon', 'Name', 'Level', 'description']}
                        rows={war_skills.reduce(
                            (acc, skill) => [
                                ...acc,
                                {
                                    id: '',
                                    data: [
                                        <Sprite
                                            tile={skill.tile}
                                            spriteSheet='tiles'
                                            className='sprite'
                                            title={skill.name}
                                            alt={skill.name}
                                        />,
                                        skill.name,
                                        skill.level,
                                        skill.desc,
                                    ],
                                },
                            ],
                            []
                        )}
                    />
                </div>
            </section>

            <section id='Archer' className='anchor-Zone'>
                <H3>Archer</H3>
                <div>
                    <div style={{ width: '40px' }}>{archSprite}</div>
                    <p>Archer use ranged weapon, arrows and the zen ability.</p>
                    <p>
                        Zen increases by skipping turns and decreases when
                        damage is taken. Zen allows for higher hits. The more
                        close your are to max zen, the higher the chance is to
                        deal a critical hit.
                    </p>
                    <p>
                        List of skills learned by{' '}
                        <Link
                            to={`/world_map#i=Aria_Island&x=-48.922499&y=-51.679688`}
                        >
                            Ryu
                        </Link>{' '}
                        :
                    </p>
                    <Table
                        header={['Icon', 'Name', 'Level', 'description']}
                        rows={arch_skills.reduce(
                            (acc, skill) => [
                                ...acc,
                                {
                                    id: '',
                                    data: [
                                        <Sprite
                                            tile={skill.tile}
                                            spriteSheet='tiles'
                                            className='sprite'
                                            title={skill.name}
                                            alt={skill.name}
                                        />,
                                        skill.name,
                                        skill.level,
                                        skill.desc,
                                    ],
                                },
                            ],
                            []
                        )}
                    />
                </div>
            </section>

            <section id='Wizard' className='anchor-Zone'>
                <H3>Wizard</H3>
                <div>
                    <div style={{ width: '40px' }}>{wizSprite}</div>
                    <p>Wizard use staff, books and the charge ability.</p>
                    <p>
                        Charge increases by skipping turns. Charge allows you to
                        cast your spells.
                    </p>
                    <p>List of spells you can learn :</p>
                    <Table
                        header={[
                            'Icon',
                            'Name',
                            'Level',
                            'charge cost',
                            'description',
                        ]}
                        rows={spell.reduce(
                            (acc, skill) => [
                                ...acc,
                                {
                                    id: '',
                                    data: [
                                        <Sprite
                                            tile={skill.tile}
                                            spriteSheet='tiles'
                                            className='sprite'
                                            title={skill.name}
                                            alt={skill.name}
                                        />,
                                        skill.name,
                                        skill.level,
                                        skill.charge,
                                        skill.desc,
                                    ],
                                },
                            ],
                            []
                        )}
                    />
                </div>
            </section>

            <section id='Subclass' className='anchor-Zone'>
                <H3>Subclass</H3>
                <div>
                    <p>
                        At level 50 you can talk to Kayla in{' '}
                        <Link to={`/dungeons#S_Thel_Oasis`}>
                            S'Thel Oasis F2
                        </Link>{' '}
                        behind the crack.
                    </p>
                    <p>
                        She will let you choose a subclass (one of the two
                        others classes).
                    </p>
                    <p>
                        This new class will have 50 less levels than your
                        character base level and you will be able to wear items
                        and use skills/spells from this class.
                    </p>
                    <Table
                        header={['Your class', 'Subclass', 'Result', 'Name']}
                        rows={[
                            {
                                id: '',
                                data: [
                                    warSprite,
                                    archSprite,
                                    <Sprite
                                        tile='240'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Barbarian'
                                        alt='Barbarian'
                                    />,
                                    'Barbarian',
                                ],
                            },
                            {
                                id: '',
                                data: [
                                    warSprite,
                                    wizSprite,
                                    <Sprite
                                        tile='241'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Paladin'
                                        alt='Paladin'
                                    />,
                                    'Paladin',
                                ],
                            },
                            {
                                id: '',
                                data: [
                                    archSprite,
                                    warSprite,
                                    <Sprite
                                        tile='244'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Rogue'
                                        alt='Rogue'
                                    />,
                                    'Rogue',
                                ],
                            },
                            {
                                id: '',
                                data: [
                                    archSprite,
                                    wizSprite,
                                    <Sprite
                                        tile='245'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Monk'
                                        alt='Monk'
                                    />,
                                    'Monk',
                                ],
                            },
                            {
                                id: '',
                                data: [
                                    wizSprite,
                                    warSprite,
                                    <Sprite
                                        tile='243'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Warlock'
                                        alt='Warlock'
                                    />,
                                    'Warlock',
                                ],
                            },
                            {
                                id: '',
                                data: [
                                    wizSprite,
                                    archSprite,
                                    <Sprite
                                        tile='242'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Archmage'
                                        alt='Archmage'
                                    />,
                                    'Archmage',
                                ],
                            },
                        ]}
                    />
                </div>
            </section>

            <section id='Experience' className='anchor-Zone'>
                <H3>Experience</H3>
                <div>
                    <p>
                        Every time you or your pet kill an ennemy, you'll earn
                        experience.
                    </p>
                    <p>
                        The experience required to hit a <code>[level]</code>{' '}
                        from 0 is{' '}
                        <code>
                            (1000 + ([level] - 1) * ([level] - 1) * 1500 +
                            [level] * 250)
                        </code>
                    </p>
                    <Table
                        header={[
                            'Level',
                            'Exp to next',
                            'Total exp',
                            ' ',
                            'Level',
                            'Exp to next',
                            'Total exp',
                            ' ',
                            'Level',
                            'Exp to next',
                            'Total exp',
                        ]}
                        rows={['_'].reduce((__, _) => {
                            const acc = [];
                            for (let i = 0; i < 20; i++) {
                                acc.push({
                                    id: '',
                                    data: [
                                        i + 1,
                                        getExpToLevel(i + 1) -
                                            (i === 0 ? 0 : getExpToLevel(i)),
                                        i === 0 ? 0 : getExpToLevel(i),
                                        '',
                                        i + 1 + 20,
                                        getExpToLevel(i + 1 + 20) -
                                            getExpToLevel(i + 20),
                                        getExpToLevel(i + 20),
                                        '',
                                        i + 1 + 40,
                                        getExpToLevel(i + 1 + 40) -
                                            getExpToLevel(i + 40),
                                        getExpToLevel(i + 40),
                                    ],
                                });
                            }
                            return acc;
                        }, [])}
                    />
                    <LevelCalc />
                </div>
            </section>

            <section id='Stats' className='anchor-Zone'>
                <H3>Stats</H3>
                <div>
                    <p>
                        Stat gain follow these formulas (always rounded down) :
                    </p>
                    <p>
                        Hp / Rage / Zen / Charge (below level 10) :{' '}
                        <code>[currentStat] * 1.1</code>
                    </p>
                    <p>
                        Hp / Rage / Zen / Charge (level 10 +) :{' '}
                        <code>[currentStat] + ([currentLevel] / 3)</code>
                    </p>
                    <p>
                        Rage / Zen / Charge (From subclass) :{' '}
                        <code>
                            [currentStat] + (([currentLevel] / 3) * 3 - 40) / 5
                        </code>
                    </p>
                    <Table
                        header={[
                            'Level',
                            <div>
                                {warSprite}
                                <span>HP</span>
                            </div>,
                            <div>
                                {archSprite}
                                <span>HP</span>
                            </div>,
                            <div>
                                {wizSprite}
                                <span>HP</span>
                            </div>,
                            <div>
                                {warSprite}
                                <span>Rage</span>
                            </div>,
                            <div>
                                {archSprite}
                                <span>Zen</span>
                            </div>,
                            <div>
                                {wizSprite}
                                <span>Charge</span>
                            </div>,
                        ]}
                        rows={['_'].reduce((__, _) => {
                            const acc = [];
                            for (let i = 1; i <= 20; i++) {
                                acc.push({
                                    id: '',
                                    data: [
                                        i,
                                        getStat(i, 50),
                                        getStat(i, 40),
                                        getStat(i, 30),
                                        getStat(i, 10),
                                        getStat(i, 10),
                                        getStat(i, 40),
                                    ],
                                });
                            }
                            return acc;
                        }, [])}
                    />
                    <Table
                        header={[
                            'Level',
                            <div>
                                <Sprite
                                    tile='240'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Barbarian'
                                    alt='Barbarian'
                                />
                                <Sprite
                                    tile='241'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Paladin'
                                    alt='Paladin'
                                />
                                <span>HP</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='244'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Rogue'
                                    alt='Rogue'
                                />
                                <Sprite
                                    tile='245'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Monk'
                                    alt='Monk'
                                />
                                <span>HP</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='243'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Warlock'
                                    alt='Warlock'
                                />
                                <Sprite
                                    tile='242'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Archmage'
                                    alt='Archmage'
                                />
                                <span>HP</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='240'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Barbarian'
                                    alt='Barbarian'
                                />
                                <Sprite
                                    tile='241'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Paladin'
                                    alt='Paladin'
                                />
                                <span>Rage</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='244'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Rogue'
                                    alt='Rogue'
                                />
                                <Sprite
                                    tile='245'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Monk'
                                    alt='Monk'
                                />
                                <span>Zen</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='243'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Warlock'
                                    alt='Warlock'
                                />
                                <Sprite
                                    tile='242'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Archmage'
                                    alt='Archmage'
                                />
                                <span>Charge</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='244'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Rogue'
                                    alt='Rogue'
                                />
                                <Sprite
                                    tile='243'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Warlock'
                                    alt='Warlock'
                                />
                                <span>Rage</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='240'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Barbarian'
                                    alt='Barbarian'
                                />
                                <Sprite
                                    tile='242'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Archmage'
                                    alt='Archmage'
                                />
                                <span>Zen</span>
                            </div>,
                            <div>
                                <Sprite
                                    tile='241'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Paladin'
                                    alt='Paladin'
                                />
                                <Sprite
                                    tile='245'
                                    spriteSheet='chars'
                                    className='sprite'
                                    title='Monk'
                                    alt='Monk'
                                />
                                <span>Charge</span>
                            </div>,
                        ]}
                        rows={['_'].reduce((__, _) => {
                            const acc = [];
                            for (let i = 50; i <= 60; i++) {
                                acc.push({
                                    id: '',
                                    data: [
                                        i,
                                        getStat(i, 50),
                                        getStat(i, 40),
                                        getStat(i, 30),
                                        getStat(i, 10),
                                        getStat(i, 10),
                                        getStat(i, 40),
                                        getSubStat(i, 5),
                                        getSubStat(i, 10),
                                        getSubStat(i, 7),
                                    ],
                                });
                            }
                            acc.push({
                                id: '',
                                data: [
                                    <input
                                        style={{ width: '70px' }}
                                        type='number'
                                        value={statLevel}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setStatLevel(e.target.value);
                                        }}
                                    />,
                                    getStat(statLevel, 50),
                                    getStat(statLevel, 40),
                                    getStat(statLevel, 30),
                                    getStat(statLevel, 10),
                                    getStat(statLevel, 10),
                                    getStat(statLevel, 40),
                                    getSubStat(statLevel, 5),
                                    getSubStat(statLevel, 10),
                                    getSubStat(statLevel, 7),
                                ],
                            });
                            return acc;
                        }, [])}
                    />
                </div>
            </section>

            <section id='Pets' className='anchor-Zone'>
                <H3>Pets</H3>
                <div>
                    <p>
                        Pets are monsters you can buy to severals shops in the
                        world.{' '}
                        <Link
                            to={`/world_map#i=Aria_Island&x=-54.572062&y=10.546875`}
                        >
                            Mobion
                        </Link>{' '}
                        will probably be the first one you encounter.
                    </p>
                    <p>
                        Pets wins experiences when dealing the final hits on an
                        ennemy (They earn the same amout of experience than you
                        + 1000).
                    </p>
                    <p>
                        Once they reach their max level, they will stop earning
                        experiences.
                    </p>
                    <p>
                        List of all the pets (Stats are at the max level of the
                        pet).
                    </p>
                    <Table
                        header={[
                            'Icon',
                            'Name',
                            'Owner level',
                            'Cost',
                            'Max Level',
                            'Hp',
                            'Atk',
                            'Def',
                            'Charge',
                            'Possible names',
                            'Abilities',
                            'Evolve',
                        ]}
                        rows={pets.reduce(
                            (acc, pet) => [
                                ...acc,
                                {
                                    id: '',
                                    data: [
                                        <Sprite
                                            tile={pet.tile}
                                            spriteSheet='chars'
                                            className='sprite'
                                            title={pet.name}
                                            alt={pet.name}
                                        />,
                                        pet.name,
                                        pet.level,
                                        pet.cost,
                                        pet.maxLevel,
                                        pet.baseHp + pet.hpGain * pet.maxLevel,
                                        pet.baseAtk +
                                            pet.atkGain * pet.maxLevel,
                                        pet.baseDef +
                                            pet.defGain * pet.maxLevel,
                                        pet.baseCharge +
                                            pet.chargeGain * pet.maxLevel,
                                        <MaxScroll>
                                            <ul>
                                                {pet.names.map((name, id) => (
                                                    <li key={id}>{name}</li>
                                                ))}
                                            </ul>
                                        </MaxScroll>,
                                        pet.abilities.length ? (
                                            <MaxScroll>
                                                <ul>
                                                    {pet.abilities.map(
                                                        (abi, id) => (
                                                            <li key={id}>
                                                                ({abi.level}){' '}
                                                                {abi.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </MaxScroll>
                                        ) : (
                                            '–'
                                        ),
                                        pet.evolve ? (
                                            <>
                                                ({pet.evolve.level}){' '}
                                                {pet.evolve.name}
                                                <Sprite
                                                    tile={pet.evolve.tile}
                                                    spriteSheet='chars'
                                                    className='sprite'
                                                    title={pet.evolve.name}
                                                    alt={pet.evolve.name}
                                                />
                                            </>
                                        ) : (
                                            '–'
                                        ),
                                    ],
                                },
                            ],
                            []
                        )}
                    />
                </div>
            </section>
        </main>
    );
}

function getExpToLevel(level) {
    return 1000 + (level - 1) * (level - 1) * 1500 + level * 250;
}

function getStat(level, base) {
    let stat = base;

    for (let i = 2; i <= level; i++) {
        if (i < 10) {
            stat = Math.floor(stat * 1.1);
        } else {
            stat += Math.floor(i / 3);
        }
    }

    return stat;
}

function getSubStat(level, base) {
    let stat = base;

    for (let i = 51; i <= level; i++) {
        stat += Math.floor((Math.floor(i / 3) * 3 - 40) / 5);
    }

    return stat;
}
