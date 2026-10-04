import React, { useState } from 'react';

import './styles.css';

export default function LevelCalc() {
    const [startLevel, setStartLevel] = useState(10);
    const [targetLevel, setTargetLevel] = useState(12);

    return (
        <div className='levelCalc'>
            <label>Your level :</label>
            <input type='number' name='startLevel' value={startLevel} onChange={({ target }) => setStartLevel(target.value)} />
            <label>Target level :</label>
            <input type='number' name='targetLevel' value={targetLevel} onChange={({ target }) => setTargetLevel(target.value)} />
            <p className='levelCalc-result'>
                {targetLevel <= startLevel
                    ? 'Your taget level should be greater then you starting level'
                    : `Experience needed : ${getExpToLevel(targetLevel - 1) - (startLevel - 1 === 0 ? 0 : getExpToLevel(startLevel - 1))}`}
            </p>
        </div>
    );
}

function getExpToLevel(level) {
    return 1000 + (level - 1) * (level - 1) * 1500 + level * 250;
}
