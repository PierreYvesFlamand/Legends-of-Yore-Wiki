import React, { useEffect, useState } from 'react';

// Light/dark switch. Follows the system setting until the reader picks one; the pick is
// stored in localStorage and applied before first paint by the script in public/index.html.
const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || (darkQuery && darkQuery.matches ? 'dark' : 'light');
}

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useState(currentTheme);

    // Keep the icon right when the system theme changes and the reader has no saved choice
    useEffect(() => {
        if (!darkQuery) return;
        const onChange = () => setTheme(currentTheme());
        // Safari < 14 only has the deprecated addListener/removeListener
        if (darkQuery.addEventListener) {
            darkQuery.addEventListener('change', onChange);
            return () => darkQuery.removeEventListener('change', onChange);
        }
        darkQuery.addListener(onChange);
        return () => darkQuery.removeListener(onChange);
    }, []);

    function toggle() {
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Storage blocked (private mode...): the choice just won't be remembered
        }
        setTheme(next);
    }

    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

    return (
        <button type='button' className={className} onClick={toggle} aria-label={label} title={label}>
            {theme === 'dark' ? (
                <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
                    <circle cx='12' cy='12' r='4.5' fill='currentColor' />
                    <path
                        d='M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8'
                        stroke='currentColor'
                        strokeWidth='2.2'
                        strokeLinecap='round'
                    />
                </svg>
            ) : (
                <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
                    <path d='M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z' fill='currentColor' />
                </svg>
            )}
        </button>
    );
}
