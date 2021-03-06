import React from 'react';

export default function Sprite({ tile, spriteSheet, ...restProps }) {
    function image(tile) {
        const png = tile < 256 ? `${spriteSheet}.png` : `${spriteSheet}2.png`;
        return {
            background: `url(${process.env.PUBLIC_URL}/data/spriteSheet/${png}) 0 0 no-repeat`,
            backgroundPosition: `-${(tile < 256 ? tile % 16 : (tile - 256) % 16) * 32}px -${
                tile < 256 ? ~~(tile / 16) * 32 : ~~((tile - 256) / 16) * 32
            }px`,
            margin: '0 auto 3px auto',
        };
    }

    return <div style={image(tile)} {...restProps}></div>;
}
