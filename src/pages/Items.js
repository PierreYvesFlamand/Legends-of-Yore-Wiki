import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import useHashScroll from '../utils/useHashScroll';
import H2 from '../components/H2';
import H3 from '../components/H3';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import GearRow from '../components/Table/GearRow';
import NonGearRow from '../components/Table/NonGearRow';

import { DataContext } from '../context/dataContext';

const setsBonus = [
    {
        name: 'Bandit set',
        bonus: '3% exp',
        items: ['Bandana', 'Bandit Armor', 'Bandit Shiv'],
    },
    {
        name: 'Crusader set',
        bonus: '6% exp',
        items: [
            'Crusader Helm',
            'Crusader Armor',
            'Crusader Gloves',
            'Crusader Sword',
            'Crusader Shield',
        ],
    },
    {
        name: 'Ninja set',
        bonus: '8% exp',
        items: ['Bandit Hood', 'Ninja Gi', 'Tabi Boots', 'Nunchuks'],
    },
    {
        name: 'Zombie set',
        bonus: '12% exp',
        items: ['Zombie Scalp', 'Zombie Disguise', 'Zombie Gloves'],
    },
    {
        name: 'Viking set',
        bonus: '10% gold',
        items: ['Viking Helm', 'Viking Armor', 'Viking Axe'],
    },
    {
        name: 'Merlin set',
        bonus: '2 charge / turn',
        items: ['Merlins Cap', 'Merlins Cloak', 'Merlins Wand'],
    },
    {
        name: 'Magic set',
        bonus: '4 charge / turn',
        items: [
            'Wizard Hat',
            'Magicians Robes',
            'Pointy Boots',
            'Warlock Staff',
            'Ring of Tra',
        ],
    },
    {
        name: 'Witch doctor set',
        bonus: '5 magic',
        items: [
            'Tribal Mask',
            'Grass Skirt',
            'Pygmy Staff',
            'Amulet of the Sun',
            'Bone Ring',
        ],
    },
    {
        name: 'Spectral set',
        bonus: '10 magic',
        items: [
            'Spectral Hood',
            'Spectral Boots',
            'Spectral Blade',
            'Spectral Shield',
            'Spectral Cloak',
            'Spectral Ring',
        ],
    },
    {
        name: 'Elven set',
        bonus: '2 zen / turn',
        items: [
            'Elven Coif',
            'Elven Chainmail',
            'Elven Boots',
            'Elven Bow',
            'Elven Cloak',
        ],
    },
    {
        name: 'Jester set',
        bonus: '8 zen / turn',
        items: [
            'Jester Hat',
            'Jester Robes',
            'Jingly Gloves',
            'Curly Clogs',
            'Jesters Shaker',
            'Juggling Balls',
        ],
    },
    {
        name: 'Shaman set',
        bonus: '12 zen / turn',
        items: ['Deer Antlers', 'Furs', 'Crooked Staff', 'Tooth Pendant'],
    },
    {
        name: 'Pirate set',
        bonus: '12 rage / turn',
        items: [
            'Pirate Hat',
            'Eye Patch',
            'Pirate Hook',
            'Pirate Boots',
            'Cutlass',
        ],
    },
    {
        name: 'Death set',
        bonus: 'poison',
        items: [
            'Skull Mask',
            'Black Robes',
            'Bone Gloves',
            'Scythe',
            'Blood Ring',
        ],
    },
];

export default function Items() {
    const {
        equipments,
        items,
        skillsSpell: { spell },
    } = useContext(DataContext);
    useHashScroll();

    return (
        <main className='content'>
            <H2>Gears</H2>
            <PageHeader
                tablaOfContent={[
                    ...Object.keys(equipments).reduce((acc, type) => {
                        return [
                            ...acc,
                            <a href={`${global.githubUrl}/items#${type}`}>
                                {type.substring(0, 1).toUpperCase() +
                                    type.substring(1)}
                            </a>,
                        ];
                    }, []),
                    <a href={`${global.githubUrl}/items#Spells`}>Spells</a>,
                    <a href={`${global.githubUrl}/items#Sets`}>Sets</a>,
                    ...Object.keys(items).reduce((acc, type) => {
                        return [
                            ...acc,
                            <a
                                href={`${global.githubUrl}/items#${type
                                    .split(' ')
                                    .join('_')}`}
                            >
                                {type.substring(0, 1).toUpperCase() +
                                    type.substring(1)}
                            </a>,
                        ];
                    }, []),
                ]}
            >
                <p>
                    Here is the list of all the gears of the game. The value is
                    the sell value
                </p>
            </PageHeader>
            {Object.keys(equipments).map((type, id) => {
                return (
                    <section key={id} id={type} className='anchor-Zone'>
                        <H3>
                            {type.substring(0, 1).toUpperCase() +
                                type.substring(1)}
                        </H3>
                        <div>
                            <Table
                                header={[
                                    'Icon',
                                    'Name',
                                    'Level',
                                    'Class',
                                    'Atk',
                                    'Def',
                                    'Modifier',
                                    'Sell Value',
                                    'Drop by',
                                    'Other',
                                ]}
                                rows={GearRow(equipments[type])}
                            />
                        </div>
                    </section>
                );
            })}
            <section id='Spells' className='anchor-Zone'>
                <H3>Spells</H3>
                <div>
                    <Table
                        header={[
                            'Icon',
                            'Name',
                            'level',
                            'Effect',
                            'Sell Value',
                            'Drop by',
                            'Other',
                        ]}
                        rows={NonGearRow(spell, 'spell')}
                    />
                </div>
            </section>
            <section id='Sets' className='anchor-Zone'>
                <H3>Sets</H3>
                <div>
                    <p>
                        By equiping a full set, you'll have a unique stats
                        boost.
                    </p>
                    <p>List of sets :</p>

                    {setsBonus.map((set, id) => {
                        return (
                            <div key={id}>
                                <h4
                                    id={set.name.split(' ').join('_')}
                                    className='anchor-Zone'
                                >
                                    {set.name} (Bonus : {set.bonus})
                                </h4>
                                <ul className='no-list-style'>
                                    {set.items.map((item, id) => {
                                        return (
                                            <li key={id}>
                                                <Link
                                                    to={`/items#${item
                                                        .split(' ')
                                                        .join('_')}`}
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>
            {Object.keys(items).map((type, id) => {
                return (
                    <section
                        key={id}
                        id={type.split(' ').join('_')}
                        className='anchor-Zone'
                    >
                        <H3>
                            {type.substring(0, 1).toUpperCase() +
                                type.substring(1)}
                        </H3>
                        <div>
                            {type === 'quest item' ? (
                                <Table
                                    header={['Icon', 'Name']}
                                    rows={NonGearRow(items[type], 'quest-item')}
                                />
                            ) : type === 'consumable' ? (
                                <Table
                                    header={[
                                        'Icon',
                                        'Name',
                                        'Effect',
                                        'Sell Value',
                                        'Drop by',
                                        'Other',
                                    ]}
                                    rows={NonGearRow(items[type], 'consumable')}
                                />
                            ) : (
                                <Table
                                    header={[
                                        'Icon',
                                        'Name',
                                        'Sell Value',
                                        'Drop by',
                                        'Other',
                                    ]}
                                    rows={NonGearRow(items[type])}
                                />
                            )}
                        </div>
                    </section>
                );
            })}
        </main>
    );
}
