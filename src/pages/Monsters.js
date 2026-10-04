import React, { useContext } from 'react';

import { DataContext } from '../context/dataContext';
import useHashScroll from '../utils/useHashScroll';
import H2 from '../components/H2';
import H3 from '../components/H3';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import MonsterRow from '../components/Table/MonsterRow';

export default function Monsters() {
    const { monsters } = useContext(DataContext);
    useHashScroll();

    return (
        <main className='content'>
            <H2>Monsters</H2>
            <PageHeader
                tablaOfContent={Object.keys(monsters).reduce((acc, key) => {
                    return [
                        ...acc,
                        <a href={`${global.githubUrl}/monsters#${key}`}>{key.substring(0, 1).toUpperCase() + key.substring(1)}</a>,
                    ];
                }, [])}
            >
                <p>Here is the list of all the monsters of the game</p>
            </PageHeader>

            {Object.keys(monsters).map((type, id) => {
                return (
                    <section id={type} className='anchor-Zone' key={id}>
                        <H3>{type.substring(0, 1).toUpperCase() + type.substring(1)}</H3>
                        <div>
                            <Table
                                header={['Icon', 'Name', 'Exp', 'Kingdom', 'Hp', 'Atk', 'Def', 'Cha / Ze / Ra', 'Drop', 'Location']}
                                rows={MonsterRow(monsters[type], type === 'rares' ? true : false)}
                            />
                        </div>
                    </section>
                );
            })}
        </main>
    );
}
