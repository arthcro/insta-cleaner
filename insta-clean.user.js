// ==UserScript==
// @name         Instagram No Reels (Ultra Light)
// @namespace    https://github.com/
// @version      1.8
// @description  Masque uniquement l'onglet Reels sans ralentir Instagram
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Injection CSS pure (0 charge CPU, 0 latence au démarrage)
    const style = document.createElement('style');
    style.textContent = `
        a[href="/reels/"],
        svg[aria-label="Reels"] {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);
})();
