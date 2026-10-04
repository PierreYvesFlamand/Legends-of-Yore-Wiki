import React from 'react';

import './styles.css';

// Long tables of content flow into two columns (CSS columns, see styles.css)
const TWO_COLUMNS_FROM = 18;

export default function PageHeader({ children, tablaOfContent = false, ...restProps }) {
    return (
        <header className='pageHeader' {...restProps}>
            <div className='headerContent'>{children}</div>
            {tablaOfContent ? (
                <nav className='quickLinks' aria-label='Page content'>
                    <p>Content</p>
                    <ol className={tablaOfContent.length >= TWO_COLUMNS_FROM ? 'two-columns' : ''}>
                        {tablaOfContent.map((link, id) => (
                            <li key={id}>
                                <span className='number'>{id + 1}.</span> {link}
                            </li>
                        ))}
                    </ol>
                </nav>
            ) : null}
        </header>
    );
}
