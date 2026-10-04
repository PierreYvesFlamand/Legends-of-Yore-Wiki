import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import './styles.css';

const links = [
    { to: '/', label: 'Home' },
    { to: '/player', label: 'Player' },
    { to: '/items', label: 'Items' },
    { to: '/monsters', label: 'Monsters' },
    { to: '/dungeons', label: 'Dungeons' },
    { to: '/quests', label: 'Quests' },
    { to: '/activities', label: 'Activities' },
    { to: '/shops', label: 'Shops' },
    { to: '/world_map', label: 'World map' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close the mobile menu whenever the page changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.classList.add('no-scroll');

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <header className={`navigation${isOpen ? ' open' : ''}`}>
            <div className='nav-bar'>
                <Link to='/' className='nav-brand'>
                    <img src={process.env.PUBLIC_URL + '/data/warrior.png'} alt='' width='28' height='28' />
                    <span>
                        Legends of Yore <span className='nav-brand-wiki'>Wiki</span>
                    </span>
                </Link>

                <button
                    className='nav-toggle'
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls='nav-links'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className='nav-toggle-bar' />
                    <span className='nav-toggle-bar' />
                    <span className='nav-toggle-bar' />
                </button>

                <nav id='nav-links' className='nav-links' aria-label='Main'>
                    <ul>
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink exact to={to} activeClassName='active'>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className='nav-backdrop' onClick={() => setIsOpen(false)} />
        </header>
    );
}
