// ==UserScript==
// @name         Instagram Focus Mode (Démarrage Instantané)
// @namespace    https://github.com/
// @version      1.7
// @description  0 redirection sur l'accueil, ouverture rapide, Reels DM autorisés
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. CSS pur exécuté avant même le rendu de la page (0 latence)
    const style = document.createElement('style');
    style.textContent = `
        nav a[href="/reels/"],
        nav a[href="/explore/"],
        a[href="/reels/"],
        a[href="/explore/"],
        svg[aria-label="Reels"],
        svg[aria-label="Découvrir"],
        svg[aria-label="Explore"] {
            display: none !important;
        }

        html, body {
            height: auto !important;
            min-height: 115vh !important;
            overflow-y: auto !important;
        }
    `;
    document.documentElement.appendChild(style);

    // 2. Redirection uniquement si tu cliques sur l'onglet Reels ou Explore
    const blockTabs = () => {
        const path = window.location.pathname;
        if (path === '/reels' || path === '/reels/' || path.startsWith('/explore')) {
            window.location.replace('https://www.instagram.com/direct/inbox/');
        }
    };

    const pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        blockTabs();
    };
    window.addEventListener('popstate', blockTabs);
    blockTabs();
})();
