import React from 'react';

import { Link } from 'react-router-dom';

import useHashScroll from '../utils/useHashScroll';
import H2 from '../components/H2';
import H3 from '../components/H3';
import PageHeader from '../components/PageHeader';

import Crafting from '../components/Crafting.js';
import Fishing from '../components/Fishing.js';
import Digging from '../components/Digging.js';
import Finding from '../components/Finding.js';
import TMaps from '../components/TMaps.js';

export default function Activities() {
    useHashScroll();

    return (
        <main className='content'>
            <H2>Activities</H2>
            <PageHeader
                tablaOfContent={['repairing', 'crafting', 'treasure maps', 'digging', 'fishing', 'finding'].reduce((acc, item) => {
                    return [
                        ...acc,
                        <a href={`${global.githubUrl}/activities#${item.split(' ').join('_')}`}>
                            {item.substring(0, 1).toUpperCase() + item.substring(1)}
                        </a>,
                    ];
                }, [])}
            ></PageHeader>
            <section id='repairing' className='anchor-Zone'>
                <H3>Repairing</H3>
                <div>
                    <p>
                        You can spend 5000 <Link to='/items#Gold'>Gold</Link> and a <Link to='/items#Rusty_Sword'>Rusty Sword</Link> /{' '}
                        <Link to='/items#Dirty_Staff'>Dirty Staff</Link> / <Link to='/items#Grimey_Bow'>Grimey Bow</Link> at any gears
                        seller.
                    </p>
                    <p>It will produce a random weapon of the same type from level 0 to [your_level * 0.8].</p>
                </div>
            </section>
            <section id='crafting' className='anchor-Zone'>
                <H3>Crafting</H3>
                <div>
                    <Crafting />
                </div>
            </section>
            <section id='treasure_maps' className='anchor-Zone'>
                <H3>Treasure maps</H3>
                <div>
                    <TMaps />
                </div>
            </section>
            <section id='digging' className='anchor-Zone'>
                <H3>Digging</H3>
                <div>
                    <Digging />
                </div>
            </section>
            <section id='fishing' className='anchor-Zone'>
                <H3>Fishing</H3>
                <div>
                    <Fishing />
                </div>
            </section>
            <section id='finding' className='anchor-Zone'>
                <H3>Finding</H3>
                <div>
                    <Finding />
                </div>
            </section>
        </main>
    );
}
