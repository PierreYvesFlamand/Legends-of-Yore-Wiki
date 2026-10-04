import React, { useLayoutEffect, useRef, useState } from 'react';

import './styles.css';

const VISIBLE = 3;

// Long list in a table cell (drops, locations, rewards...): shows the first entries
// and a "+N more" toggle for the rest. Children are expected to be a <ul> of <li>.
export default function MaxScroll({ children }) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Count the rendered entries (lists are built by several helpers, some return fragments)
    useLayoutEffect(() => {
        setCount(ref.current.querySelectorAll('li').length);
    }, [children]);

    // Hiding a single entry behind a button would not save any space
    const canCollapse = count > VISIBLE + 1;
    const isCollapsed = canCollapse && !isExpanded;

    return (
        <div ref={ref} className={`maxScroll${isCollapsed ? ' is-collapsed' : ''}`}>
            {children}
            {canCollapse ? (
                <button type='button' className='maxScroll-toggle' aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Show less' : `+${count - VISIBLE} more`}
                </button>
            ) : null}
        </div>
    );
}
