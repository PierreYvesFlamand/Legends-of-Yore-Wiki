import React from 'react';

import './styles.css';

// `as` lets a page use the same style for its main title (e.g. as='h1' on Home)
export default function H2({ children, as: Tag = 'h2', ...restProps }) {
    return (
        <Tag className='header-2' {...restProps}>
            {children}
        </Tag>
    );
}
