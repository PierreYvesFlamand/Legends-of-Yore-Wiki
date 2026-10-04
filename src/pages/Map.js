import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import H2 from '../components/H2';

import './Map.css';

export default function Map() {
    // Here the hash is not an anchor: it is passed to the map (e.g. #Aria_Island or #i=...&x=...&y=...)
    const hash = useLocation().hash;
    const mapUrl = `${process.env.PUBLIC_URL}/map/index.html${hash}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className='content'>
            <H2>World Map</H2>

            <section>
                <div>
                    <iframe className='world-map' src={mapUrl} title='Legends of Yore interactive world map' />
                    <p className='world-map-links'>
                        <a href={mapUrl} target='_blank' rel='noreferrer'>
                            Open the map in full screen
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
