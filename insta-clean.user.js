// ==UserScript==
// @name         Instagram Focus Mode
// @namespace    https://github.com/
// @version      1.1
// @description  Supprime les Reels, Explorer et le Feed. Garde uniquement Stories et Messages.
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Injection CSS immédiate pour masquer les éléments
    const style = document.createElement('style');
    style.innerHTML = `
        /* Masquer les boutons Reels et Explorer dans la barre du bas/côté */
        a[href*="/reels/"],
        a[href*="/explore/"],
        svg[aria-label="Reels"],
        svg[aria-label="Découvrir"],
        svg[aria-label="Explore"] {
            display: none !important;
        }

        /* Masquer toutes les publications (posts/vidéos) du fil d'actualité */
        main[role="main"] article {
            display: none !important;
        }

        /* Masquer le chargement infini du feed sous la barre des stories */
        main[role="main"] div[data-visualcompletion="loading-state"] {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);

    // 2. Sécurité : si tu cliques sur un Reel envoyé en DM, redirection vers la boîte de réception
    const observer = new MutationObserver(() => {
        if (window.location.pathname.startsWith('/reels')) {
            window.location.replace('https://www.instagram.com/direct/inbox/');
        }
    });

    observer.observe(document, { subtree: true, childList: true });
})();
