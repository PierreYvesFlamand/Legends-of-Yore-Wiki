import React, { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DataContext } from '../../context/dataContext';
import { buildSearchIndex, search } from '../../utils/searchIndex';
import Sprite from '../Sprite';

import './styles.css';

// Search over every item, monster, dungeon, quest and page section.
// Picking a result navigates to its row (useHashScroll highlights it).
export default function Search({ id = 'search', autoFocus = false, placeholder = 'Search items, monsters, quests…', onNavigate, onDismiss }) {
    const { equipments, items, monsters, quests, skillsSpell } = useContext(DataContext);
    const index = useMemo(
        () => buildSearchIndex({ equipments, items, monsters, quests, skillsSpell }),
        [equipments, items, monsters, quests, skillsSpell]
    );
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const results = useMemo(() => search(index, query), [index, query]);
    const showResults = isOpen && query.trim() !== '';
    const listId = `${id}-results`;

    function go(entry) {
        history.push(entry.to);
        setQuery('');
        setIsOpen(false);
        if (onNavigate) onNavigate();
    }

    function onKeyDown(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setIsOpen(true);
                setActive((active + 1) % Math.max(results.length, 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActive((active - 1 + results.length) % Math.max(results.length, 1));
                break;
            case 'Enter':
                if (showResults && results[active]) {
                    e.preventDefault();
                    go(results[active]);
                }
                break;
            case 'Escape':
                if (showResults) {
                    setIsOpen(false);
                } else if (onDismiss) {
                    onDismiss();
                }
                break;
            default:
                break;
        }
    }

    function onBlur(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsOpen(false);
        if (onDismiss) onDismiss();
    }

    return (
        <div className='search' onBlur={onBlur}>
            <label htmlFor={id} className='visually-hidden'>
                Search the wiki
            </label>
            <svg className='search-icon' viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
                <circle cx='10.5' cy='10.5' r='6.5' fill='none' stroke='currentColor' strokeWidth='2.5' />
                <path d='M15.5 15.5L21 21' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
            </svg>
            <input
                id={id}
                type='search'
                className='search-input'
                placeholder={placeholder}
                autoComplete='off'
                spellCheck='false'
                autoFocus={autoFocus}
                role='combobox'
                aria-autocomplete='list'
                aria-expanded={showResults}
                aria-controls={listId}
                aria-activedescendant={showResults && results[active] ? `${listId}-${active}` : undefined}
                value={query}
                onChange={({ target }) => {
                    setQuery(target.value);
                    setActive(0);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={onKeyDown}
            />

            {showResults ? (
                <ul id={listId} className='search-results' role='listbox' aria-label='Search results'>
                    {results.length ? (
                        results.map((entry, idx) => (
                            <li
                                key={entry.to + entry.name}
                                id={`${listId}-${idx}`}
                                role='option'
                                aria-selected={idx === active}
                                className={`search-result${idx === active ? ' is-active' : ''}`}
                                // Keep focus in the input so onBlur does not close the list before the click
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseEnter={() => setActive(idx)}
                                onClick={() => go(entry)}
                            >
                                <span className='search-result-icon'>
                                    {entry.tile !== undefined ? <Sprite tile={entry.tile} spriteSheet={entry.sheet} className='sprite' /> : null}
                                </span>
                                <span className='search-result-name'>{entry.name}</span>
                                <span className='search-result-type'>{entry.type}</span>
                            </li>
                        ))
                    ) : (
                        <li className='search-empty' role='presentation'>
                            No result for “{query.trim()}”
                        </li>
                    )}
                </ul>
            ) : null}
        </div>
    );
}
