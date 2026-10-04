import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './normalize.css';
import './styles.css';
import './wikiStyles.css';

import { DataContextProvider } from './context/dataContext';
import App from './App';

// Absolute URL: a relative url() inside a CSS variable resolves against the stylesheet folder
const bgImage = new URL(`${process.env.PUBLIC_URL}/data/bg-m.jpg`, window.location.href).href;
document.documentElement.style.setProperty('--bg-image', `url('${bgImage}')`);

// Base URL for in-wiki anchor links, e.g. `${global.githubUrl}/items#Bandana`.
// Built from the current page so links also work on the dev server.
global.githubUrl = `${window.location.origin}${window.location.pathname}#`;

ReactDOM.render(
    <DataContextProvider>
        <Router>
            <App />
        </Router>
    </DataContextProvider>,
    document.getElementById('root')
);
