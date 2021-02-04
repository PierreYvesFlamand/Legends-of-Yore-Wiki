import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import H2 from '../components/H2';

export default function Map() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.8);
    const hash = useLocation().hash;

    useEffect(() => {
        window.addEventListener('resize', () => {
            setMapHeight(window.innerHeight * 0.8);
        });
    }, []);

    return (
        <main className='content'>
            <H2>World Map</H2>

            <section>
                <div>
                    <p className='bold underline'>Work in progress</p>
                    <ul className='no-list-style'>
                        <li>❗ Only Island 1 is made</li>
                        <br />
                        <li>🟡 If you have any feedback or want to contribute to add markers, contact me on discord</li>
                    </ul>
                    <div>
                        <object
                            type='text/html'
                            data={process.env.PUBLIC_URL + '/map' + hash}
                            width='100%'
                            height={`${mapHeight}px`}
                            style={{ overflow: 'auto', border: '2px solid lightblue' }}
                            aria-label='If you see this message contact me on Dicord : Polfy#6924'
                            inner-text='If you see this message contact me on Dicord : Polfy#6924'
                            aria-labelledby='If you see this message contact me on Dicord : Polfy#6924'
                        ></object>
                    </div>
                </div>
            </section>
        </main>
    );
}
