import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import Search from '../Search';
import ThemeToggle from '../ThemeToggle';

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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Close the mobile menu and the search whenever the page changes
    useEffect(() => {
        setIsOpen(false);
        setIsSearchOpen(false);
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

    // "/" opens the search from anywhere (unless the reader is typing in a field)
    useEffect(() => {
        const onKeyDown = (e) => {
            const tag = e.target.tagName;
            if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
                return;
            }
            e.preventDefault();
            setIsOpen(false);
            setIsSearchOpen(true);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <header className={`navigation${isOpen ? ' open' : ''}${isSearchOpen ? ' search-open' : ''}`}>
            <div className='nav-bar'>
                <Link to='/' className='nav-brand'>
                    <img src={process.env.PUBLIC_URL + '/data/warrior.png'} alt='' width='28' height='28' />
                    <span>
                        Legends of Yore <span className='nav-brand-wiki'>Wiki</span>
                    </span>
                </Link>

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

                <div className='nav-actions'>
                    <button
                        type='button'
                        className='nav-icon-btn'
                        aria-label={isSearchOpen ? 'Close search' : 'Search (shortcut: /)'}
                        title='Search (/)'
                        aria-expanded={isSearchOpen}
                        aria-controls='nav-search'
                        // Keep focus in the search field so its blur does not close it before this click toggles it
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setIsOpen(false);
                            setIsSearchOpen(!isSearchOpen);
                        }}
                    >
                        <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
                            <circle cx='10.5' cy='10.5' r='6.5' fill='none' stroke='currentColor' strokeWidth='2.6' />
                            <path d='M15.5 15.5L21 21' stroke='currentColor' strokeWidth='2.6' strokeLinecap='round' />
                        </svg>
                    </button>

                    <ThemeToggle className='nav-icon-btn' />

                    <button
                        className='nav-toggle'
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls='nav-links'
                        onClick={() => {
                            setIsSearchOpen(false);
                            setIsOpen(!isOpen);
                        }}
                    >
                        <span className='nav-toggle-bar' />
                        <span className='nav-toggle-bar' />
                        <span className='nav-toggle-bar' />
                    </button>
                </div>
            </div>

            {isSearchOpen ? (
                <div id='nav-search' className='nav-search'>
                    <Search
                        id='nav-search-input'
                        autoFocus
                        onNavigate={() => setIsSearchOpen(false)}
                        onDismiss={() => setIsSearchOpen(false)}
                    />
                </div>
            ) : null}

            <div className='nav-backdrop' onClick={() => setIsOpen(false)} />
        </header>
    );
}
