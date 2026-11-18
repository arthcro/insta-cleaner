// ==UserScript==
// @name         Instagram No Reels & No Suggestions (Ultra Light)
// @namespace    https://github.com/
// @version      1.8.2
// @description  Masque l'onglet Reels, la barre For you et le carrousel Suggestions en CSS pur
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        /* 1. Masque l'onglet Reels */
        a[href="/reels/"],
        svg[aria-label="Reels"] {
            display: none !important;
        }

        /* 2. Masque la barre du haut "For you v" (uniquement sur l'accueil) */
        header:has(svg[aria-label="Notifications"]),
        header:has(a[href*="/notifications/"]) {
            display: none !important;
        }

        /* 3. Masque le carrousel horizontal "Suggestions for you" (liste horizontale ul/li sous les Stories) */
        main ul:has(button) {
            display: none !important;
        }
        div:has(> div > ul > li button) {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);
})();
