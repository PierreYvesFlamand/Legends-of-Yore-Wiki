import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the element whose id matches the route hash (`#/items#Bandana` → `#Bandana`)
// and marks it with `.is-target` so it can be highlighted. Without a hash, scrolls to top.
// CSS `:target` cannot be used: with HashRouter the real URL fragment is `/items#Bandana`.
export default function useHashScroll() {
    const { hash, key } = useLocation();

    useEffect(() => {
        document.querySelectorAll('.is-target').forEach((el) => el.classList.remove('is-target'));

        const id = hash ? decodeURIComponent(hash.slice(1)) : '';
        const target = id ? document.getElementById(id) : null;

        if (!target) {
            window.scrollTo(0, 0);
            return;
        }

        target.classList.add('is-target');
        // Wait a frame so a collapsed section holding the target (see H3) can re-open first
        const frame = requestAnimationFrame(() => target.scrollIntoView());
        return () => cancelAnimationFrame(frame);
    }, [hash, key]);
}
