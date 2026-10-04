import React from 'react';

import './styles.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <p>
                Fan wiki for the{' '}
                <a target='_blank' rel='noreferrer' href='https://www.legendsofyore.com/' title='Legends of Yore website'>
                    Legends of Yore
                </a>{' '}
                made by @polfy on Discord
            </p>
        </footer>
    );
}
