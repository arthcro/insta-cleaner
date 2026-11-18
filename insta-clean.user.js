// ==UserScript==
// @name         Instagram Focus Mode (Ultra Fluide)
// @namespace    https://github.com/
// @version      1.5
// @description  Masquage Reels/Feed/Explore + déblocage scroll Safari
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        /* Masquage Reels, Explore et Feed */
        a[href*="/reels/"],
        a[href*="/explore/"],
        svg[aria-label="Reels"],
        svg[aria-label="Découvrir"],
        svg[aria-label="Explore"],
        article,
        div[data-visualcompletion="loading-state"],
        section main > div > div > div:not(:first-child) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
        }

        /* Débloquer le scroll de la fenêtre principale pour rétracter Safari */
        html, body {
            height: auto !important;
            min-height: 120vh !important;
            overflow-y: auto !important;
            position: relative !important;
        }
    `;
    document.documentElement.appendChild(style);

    const blockDistractions = () => {
        const path = window.location.pathname;
        if (path.startsWith('/reels') || path.startsWith('/explore')) {
            window.location.replace('https://www.instagram.com/direct/inbox/');
        }
    };

    const pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        blockDistractions();
    };
    window.addEventListener('popstate', blockDistractions);
    blockDistractions();
})();
