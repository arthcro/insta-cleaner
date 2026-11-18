// ==UserScript==
// @name         Instagram Focus Mode (DM Reels + Following Feed)
// @namespace    https://github.com/
// @version      1.6
// @description  Autorise les Reels reçus en DM, affiche le feed des abonnements (?variant=following), bloque Explore/Reels infinis et posts sponsorisés
// @match        https://*.instagram.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Masquage CSS ciblé (uniquement les onglets Explore/Reels de la barre de navigation)
    const style = document.createElement('style');
    style.textContent = `
        /* Masquer uniquement les boutons de navigation vers Explore et l'onglet Reels */
        nav a[href="/reels/"],
        nav a[href="/explore/"],
        a[href="/reels/"],
        a[href="/explore/"],
        svg[aria-label="Reels"],
        svg[aria-label="Découvrir"],
        svg[aria-label="Explore"] {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }

        /* Débloquer le scroll de la fenêtre principale pour rétracter la barre Safari */
        html, body {
            height: auto !important;
            min-height: 120vh !important;
            overflow-y: auto !important;
            position: relative !important;
        }
    `;
    document.documentElement.appendChild(style);

    // 2. Gestion intelligente des URL (Autorise /reel/XYZ, force ?variant=following sur l'accueil)
    const manageNavigation = () => {
        const path = window.location.pathname;
        const search = window.location.search;

        // Bloquer uniquement l'onglet global /reels/ ou /explore/ (sans ID de vidéo derrière)
        if (path === '/reels' || path === '/reels/' || path.startsWith('/explore')) {
            window.location.replace('https://www.instagram.com/direct/inbox/');
            return;
        }

        // Forcer automatiquement le fil "Suivis" (Following) sur la page d'accueil
        if (path === '/' && !search.includes('variant=following')) {
            window.location.replace('https://www.instagram.com/?variant=following');
        }
    };

    // 3. Filtrer uniquement les pubs et suggestions dans le fil d'actualité
    const cleanSuggestedPosts = () => {
        if (window.location.pathname !== '/') return;
        document.querySelectorAll('article').forEach(article => {
            const text = article.innerText || '';
            if (
                text.includes('Sponsored') ||
                text.includes('Sponsorisé') ||
                text.includes('Suggested for you') ||
                text.includes('Suggestion pour vous')
            ) {
                article.style.display = 'none';
            }
        });
    };

    // Interception de navigation SPA
    const pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        manageNavigation();
    };
    window.addEventListener('popstate', manageNavigation);
    manageNavigation();

    // Nettoyage léger au défilement pour masquer les pubs résiduelles
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(cleanSuggestedPosts, 150);
    }, { passive: true });
})();
