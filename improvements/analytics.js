// Sistema de Analytics para NAPJe
class Analytics {
    constructor() {
        this.storageKey = 'napje_analytics';
        this.data = this.loadData();
        this.initializeTracking();
    }

    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            clicks: {},
            favorites: {},
            searches: {},
            sessions: [],
            lastVisit: null,
            totalClicks: 0,
            totalSessions: 0
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    initializeTracking() {
        // Rastrear cliques nos botões
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.button-container button');
            if (button) {
                this.trackClick(button.textContent.trim());
            }
        });

        // Rastrear favoritos
        this.observeFavorites();

        // Rastrear sessões
        this.trackSession();

        // Rastrear buscas
        this.observeSearch();
    }

    trackClick(buttonText) {
        if (!this.data.clicks[buttonText]) {
            this.data.clicks[buttonText] = 0;
        }
        this.data.clicks[buttonText]++;
        this.data.totalClicks++;
        this.saveData();
    }

    trackFavorite(buttonText, action) {
        if (!this.data.favorites[buttonText]) {
            this.data.favorites[buttonText] = { added: 0, removed: 0 };
        }
        this.data.favorites[buttonText][action]++;
        this.saveData();
    }

    trackSearch(term) {
        if (!this.data.searches[term]) {
            this.data.searches[term] = 0;
        }
        this.data.searches[term]++;
        this.saveData();
    }

    trackSession() {
        const now = new Date();
        const session = {
            start: now.toISOString(),
            userAgent: navigator.userAgent,
            screenSize: `${screen.width}x${screen.height}`,
            referrer: document.referrer
        };

        this.data.sessions.push(session);
        this.data.lastVisit = now.toISOString();
        this.data.totalSessions++;
        this.saveData();
    }

    observeFavorites() {
        // Observar mudanças nos favoritos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('favorite-item')) {
                            const text = node.textContent.trim();
                            this.trackFavorite(text, 'added');
                        }
                    });
                    mutation.removedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('favorite-item')) {
                            const text = node.textContent.trim();
                            this.trackFavorite(text, 'removed');
                        }
                    });
                }
            });
        });

        const favoritesList = document.getElementById('favorites-list');
        if (favoritesList) {
            observer.observe(favoritesList, { childList: true, subtree: true });
        }
    }

    observeSearch() {
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (e.target.value.trim()) {
                        this.trackSearch(e.target.value.trim());
                    }
                }, 1000);
            });
        }
    }

    getTopClickedButtons(limit = 10) {
        return Object.entries(this.data.clicks)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([text, clicks]) => ({ text, clicks }));
    }

    getTopSearches(limit = 10) {
        return Object.entries(this.data.searches)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([term, count]) => ({ term, count }));
    }

    getTopFavorites(limit = 10) {
        return Object.entries(this.data.favorites)
            .map(([text, data]) => ({
                text,
                added: data.added,
                removed: data.removed,
                net: data.added - data.removed
            }))
            .sort((a, b) => b.net - a.net)
            .slice(0, limit);
    }

    getSessionStats() {
        const now = new Date();
        const lastVisit = this.data.lastVisit ? new Date(this.data.lastVisit) : null;
        const daysSinceLastVisit = lastVisit ? 
            Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24)) : null;

        return {
            totalSessions: this.data.totalSessions,
            totalClicks: this.data.totalClicks,
            lastVisit: lastVisit,
            daysSinceLastVisit: daysSinceLastVisit,
            averageClicksPerSession: this.data.totalSessions > 0 ? 
                Math.round(this.data.totalClicks / this.data.totalSessions) : 0
        };
    }

    generateReport() {
        const stats = this.getSessionStats();
        const topButtons = this.getTopClickedButtons(5);
        const topSearches = this.getTopSearches(5);
        const topFavorites = this.getTopFavorites(5);

        return {
            summary: {
                totalClicks: stats.totalClicks,
                totalSessions: stats.totalSessions,
                averageClicksPerSession: stats.averageClicksPerSession,
                daysSinceLastVisit: stats.daysSinceLastVisit
            },
            topButtons,
            topSearches,
            topFavorites,
            generatedAt: new Date().toISOString()
        };
    }

    exportData() {
        return {
            analytics: this.data,
            report: this.generateReport()
        };
    }

    resetData() {
        this.data = {
            clicks: {},
            favorites: {},
            searches: {},
            sessions: [],
            lastVisit: null,
            totalClicks: 0,
            totalSessions: 0
        };
        this.saveData();
    }
}

// Instância global
const analytics = new Analytics();

// Funções de conveniência para uso global
window.analytics = {
    trackClick: (text) => analytics.trackClick(text),
    trackFavorite: (text, action) => analytics.trackFavorite(text, action),
    trackSearch: (term) => analytics.trackSearch(term),
    getReport: () => analytics.generateReport(),
    getTopButtons: (limit) => analytics.getTopClickedButtons(limit),
    getTopSearches: (limit) => analytics.getTopSearches(limit),
    getTopFavorites: (limit) => analytics.getTopFavorites(limit),
    exportData: () => analytics.exportData(),
    resetData: () => analytics.resetData()
};

// Exemplo de uso:
// analytics.trackClick('Gmail');
// analytics.trackFavorite('Drive', 'added');
// analytics.trackSearch('contracheque');
// console.log(analytics.getReport()); 