// ==UserScript==
// @name         Instagram Focus (100% CSS Ultra-Rapide)
// @namespace    https://github.com/
// @version      2.0
// @description  Vitesse maximale, 0 JavaScript actif, masque Reels, Suggestions et For You
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        /* 1. Masquer l'onglet Reels */
        a[href="/reels/"],
        svg[aria-label="Reels"] {
            display: none !important;
        }

        /* 2. Masquer le carrousel horizontal "Suggestions for you" */
        main div[role="region"],
        main ul[style*="transform"],
        div:has(> div > div > ul > li button) {
            display: none !important;
        }

        /* 3. Masquer la barre "For you v" tout en haut de l'accueil */
        main > div > div > div:first-child:has(svg[aria-label="Notifications"]) {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);
})();
