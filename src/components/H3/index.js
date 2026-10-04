import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles.css';

// Section title with a collapse toggle. Collapsing hides the element right after the
// heading (see styles.css), so pages keep the `<H3 /><div>content</div>` structure.
export default function H3({ children, className = '', ...restProps }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const ref = useRef(null);
    const { hash, key } = useLocation();

    // Re-open when a link points at something inside the collapsed content
    useEffect(() => {
        const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
        const content = ref.current.nextElementSibling;
        if (target && content && content.contains(target)) {
            setIsExpanded(true);
        }
    }, [hash, key]);

    return (
        <h3 ref={ref} className={`header-3${isExpanded ? '' : ' is-collapsed'} ${className}`.trim()} {...restProps}>
            {children}
            <button
                type='button'
                className='expandCollapse'
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                title={isExpanded ? 'Collapse' : 'Expand'}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <svg viewBox='0 0 24 24' width='1em' height='1em' aria-hidden='true'>
                    <path d='M6 9l6 6 6-6' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </button>
        </h3>
    );
}
