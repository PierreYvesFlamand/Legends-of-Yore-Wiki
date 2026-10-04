import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import useHashScroll from '../utils/useHashScroll';
import H2 from '../components/H2';
import H3 from '../components/H3';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import DungeonRows from '../components/Table/DungeonRow';
import Sprite from '../components/Sprite';
import HiddenCoveMonsters from '../components/HiddenCoveMonsters';

import { DataContext } from '../context/dataContext';
import levelFilter from '../utils/levelFilter';
import MaxScroll from '../components/MaxScroll';

export default function Dungeons() {
    const levels = useContext(DataContext).levels;
    const customData = useContext(DataContext).customData;
    useHashScroll();

    return (
        <main className='content'>
            <H2>Dungeons</H2>
            <PageHeader
                tablaOfContent={[
                    ...levelFilter.map((filter, id) => (
                        <a key={id} href={`${global.githubUrl}/dungeons#${filter.name.split(' ').join('_').replace("'", '_')}`}>
                            {filter.name}
                        </a>
                    )),
                    <a key='hc999' href={`${global.githubUrl}/dungeons#Passageway`}>
                        Passageway
                    </a>,
                    <a key='hc99' href={`${global.githubUrl}/dungeons#Hidden_Cove`}>
                        Hidden Cove
                    </a>,
                ]}
            >
                <p>Here is the list of all the dungeons of the game.</p>
                <p>When monsters total of spawn rate isn't 100%, the rest of the rate is "no monster"</p>
            </PageHeader>
            {levels
                ? levelFilter.map((filter, id) => {
                      return (
                          <section key={id} id={filter.name.split(' ').join('_').replace("'", '_')} className='anchor-Zone'>
                              <H3>{filter.name.substring(0, 1).toUpperCase() + filter.name.substring(1)}</H3>
                              <div>
                                  <Table
                                      header={['Floor', 'Monster / Room', 'Monsters', 'Max Chest / F', 'Chest', 'Legend']}
                                      rows={DungeonRows(levels[filter.name], customData, filter.name)}
                                  />
                              </div>
                          </section>
                      );
                  })
                : null}
            <section key='hc999' id='Passageway' className='anchor-Zone'>
                <H3>Passageway</H3>
                <div>
                    <Table
                        header={['Floor', 'Monsters', 'Legend']}
                        rows={[
                            {
                                id: 'Passageway',
                                data: [
                                    'F1',
                                    <MaxScroll>
                                        <ul>
                                            <li>
                                                <Link to={`/monsters#Blob`}>Blob</Link>{' '}
                                            </li>
                                            <li>
                                                <Link to={`/monsters#Faca`}>Faca</Link>{' '}
                                            </li>
                                        </ul>
                                    </MaxScroll>,
                                    <Link to={`/monsters#Dark_Lord`}>Dark Lord</Link>,
                                ],
                            },
                        ]}
                    />
                </div>
            </section>
            <section key='hc99' id='Hidden_Cove' className='anchor-Zone'>
                <H3>Hidden Cove</H3>
                <div>
                    <p>
                        The Hidden Cove is the only random infinite dungeon of the game.
                        <br></br>Each level, you have 10% chance to get one of theses 10 monsters sets (1 to 4 monsters / room) :
                    </p>
                    <div className='grid-1'>
                        <HiddenCoveMonsters />
                    </div>

                    <p>Each 5 levels (5, 10, 15, ...), you have a random Legends from this list that also spawn :</p>

                    <Table
                        header={['Icon', 'Name', 'Chance']}
                        rows={[
                            {
                                id: 'hclegend1',
                                data: [
                                    <Sprite
                                        tile='237'
                                        spriteSheet='chars'
                                        className='sprite'
                                        title='Giant Scorpion'
                                        alt='Giant Scorpion'
                                    />,
                                    <Link to={`/monsters#Giant_Scorpion`}>Giant Scorpion</Link>,
                                    '20%',
                                ],
                            },
                            {
                                id: 'hclegend2',
                                data: [
                                    <Sprite tile='194' spriteSheet='chars' className='sprite' title='Red Dragon' alt='Red Dragon' />,
                                    <Link to={`/monsters#Red_Dragon`}>Red Dragon</Link>,
                                    '20%',
                                ],
                            },
                            {
                                id: 'hclegend3',
                                data: [
                                    <Sprite tile='57' spriteSheet='chars' className='sprite' title='Dark Lord' alt='Dark Lord' />,
                                    <Link to={`/monsters#Dark_Lord`}>Dark Lord</Link>,
                                    '20%',
                                ],
                            },
                            {
                                id: 'hclegend4',
                                data: [
                                    <Sprite tile='257' spriteSheet='chars' className='sprite' title='Frost Demon' alt='Frost Demon' />,
                                    <Link to={`/monsters#Frost_Demon`}>Frost Demon</Link>,
                                    '20%',
                                ],
                            },
                            {
                                id: 'hclegend5',
                                data: [
                                    <Sprite tile='192' spriteSheet='chars' className='sprite' title='Green Dragon' alt='Green Dragon' />,
                                    <Link to={`/monsters#Green_Dragon`}>Green Dragon</Link>,
                                    '20%',
                                ],
                            },
                        ]}
                    />
                    <p>List of possible drop from chests :</p>
                    <Table
                        header={['Icon', 'Name', 'Chance']}
                        rows={[
                            {
                                id: 'hcchest1',
                                data: [
                                    <Sprite tile='127' spriteSheet='tiles' className='sprite' title='Orange Potion' alt='Orange Potion' />,
                                    <Link to={`/items#Orange_Potion`}>Orange Potion</Link>,
                                    '17.09%',
                                ],
                            },
                            {
                                id: 'hcchest2',
                                data: [
                                    <Sprite tile='126' spriteSheet='tiles' className='sprite' title='Turq Potion' alt='Turq Potion' />,
                                    <Link to={`/items#Turq_Potion`}>Turq Potion</Link>,
                                    '17.09%',
                                ],
                            },
                            {
                                id: 'hcchest3',
                                data: [
                                    <Sprite tile='100' spriteSheet='tiles' className='sprite' title='Town Portal' alt='Town Portal' />,
                                    <Link to={`/items#Town_Portal`}>Town Portal</Link>,
                                    '17.09%',
                                ],
                            },
                            {
                                id: 'hcchest4',
                                data: [
                                    <Sprite tile='78' spriteSheet='tiles' className='sprite' title='Trap' alt='Trap' />,
                                    <Link to={`/items#Trap`}>Trap</Link>,
                                    '17.09%',
                                ],
                            },
                            {
                                id: 'hcchest5',
                                data: [
                                    <Sprite tile='82' spriteSheet='tiles' className='sprite' title='Gold' alt='Gold' />,
                                    <Link to={`/items#Gold`}>100 - 200 Gold</Link>,
                                    '31.64%',
                                ],
                            },
                        ]}
                    />
                </div>
            </section>
        </main>
    );
}
