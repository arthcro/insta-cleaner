// ==UserScript==
// @name         Instagram No Reels & No Suggestions (Ultra Light)
// @namespace    https://github.com/
// @version      1.8.1
// @description  Masque l'onglet Reels et les suggestions en CSS pur sans ralentir Instagram
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Injection CSS pure (0 charge CPU, 0 latence au démarrage)
    const style = document.createElement('style');
    style.textContent = `
        /* Masque l'onglet Reels */
        a[href="/reels/"],
        svg[aria-label="Reels"] {
            display: none !important;
        }

        /* Masque le bloc horizontal "Suggestions for you" sous les Stories */
        main section > div > div > div:has(a[href*="/explore/people/"]),
        div:has(> div > a[href*="/explore/people/"]) {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);
})();
