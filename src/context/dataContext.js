import React, { useState, useEffect } from 'react';
import levelFilter from '../utils/levelFilter';
const DataContext = React.createContext();

function DataContextProvider({ children }) {
    const [equipments, setEquipments] = useState(null);
    const [items, setItems] = useState(null);
    const [levels, setLevels] = useState(null);
    const [monsters, setMonsters] = useState(null);
    const [quests, setQuests] = useState(null);
    const [skillsSpell, setSkillsSpell] = useState(null);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/data/gameData/equipments.json')
            .then((res) => res.json())
            .then((data) => {
                setEquipments(data);
            });

        fetch(process.env.PUBLIC_URL + '/data/gameData/items.json')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });

        fetch(process.env.PUBLIC_URL + '/data/gameData/levels.json')
            .then((res) => res.json())
            .then((data) => {
                const sortedLevels = {};
                levelFilter.forEach((filter) => {
                    sortedLevels[filter.name] = data.levels.level.filter((_, id) => filter.floors.includes(id));
                    if (filter.name === 'Tower Courtyard') {
                        sortedLevels[filter.name] = sortedLevels[filter.name].reverse();
                    }
                });
                setLevels(sortedLevels);
            });

        fetch(process.env.PUBLIC_URL + '/data/gameData/monsters.json')
            .then((res) => res.json())
            .then((data) => {
                setMonsters(data);
            });

        fetch(process.env.PUBLIC_URL + '/data/gameData/quests.json')
            .then((res) => res.json())
            .then((data) => {
                setQuests(data);
            });

        fetch(process.env.PUBLIC_URL + '/data/gameData/skillsSpell.json')
            .then((res) => res.json())
            .then((data) => {
                setSkillsSpell(data);
            });
    }, []);

    return (
        <DataContext.Provider value={{ equipments, items, levels, monsters, quests, skillsSpell }}>
            {equipments && items && levels && monsters && quests && skillsSpell ? children : null}
        </DataContext.Provider>
    );
}

export { DataContextProvider, DataContext };
