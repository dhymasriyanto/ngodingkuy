(function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchStatus = document.getElementById('search-status');
    const resultsContainer = document.getElementById('results-of-search');

    if (!searchInput || !resultsContainer || !window.store) {
        return;
    }

    // Build Lunr index
    let idx = null;
    try {
        idx = lunr(function () {
            this.ref('url');
            this.field('title', { boost: 10 });
            this.field('categories', { boost: 5 });
            this.field('tags', { boost: 5 });
            this.field('content');

            for (const key in window.store) {
                const item = window.store[key];
                this.add({
                    url: item.url,
                    title: item.title,
                    categories: (item.categories || []).join(' '),
                    tags: (item.tags || []).join(' '),
                    content: item.content
                });
            }
        });
    } catch (e) {
        console.error('Error initializing Lunr index:', e);
    }

    function doSearch(query) {
        const q = (query || '').trim();
        if (!q) {
            searchStatus.textContent = 'Please enter keywords to search articles.';
            resultsContainer.innerHTML = '';
            return;
        }

        if (!idx) {
            searchStatus.textContent = 'Search index is not ready.';
            return;
        }

        try {
            // Wildcard search support
            let results = idx.search(q);
            if (results.length === 0 && !q.includes('*')) {
                results = idx.search(q + '*');
            }

            if (results.length === 0) {
                searchStatus.textContent = 'No results found for "' + q + '".';
                resultsContainer.innerHTML = '';
                return;
            }

            searchStatus.textContent = 'Found ' + results.length + ' result(s) for "' + q + '":';
            let html = '';
            results.forEach(function (res) {
                const item = window.store[res.ref];
                if (!item) return;

                const snippet = (item.content || '').substring(0, 160).trim() + '...';
                html += '<li class="search-result-item">';
                html += '  <h3><a href="' + item.url + '">' + item.title + '</a></h3>';
                html += '  <div class="result-meta">';
                if (item.date) {
                    html += '    <span class="result-date">' + item.date + '</span>';
                }
                if (item.categories && item.categories.length) {
                    html += '    <span class="result-cat">[' + item.categories.join(', ') + ']</span>';
                }
                html += '  </div>';
                html += '  <p class="result-snippet">' + snippet + '</p>';
                html += '</li>';
            });
            resultsContainer.innerHTML = html;
        } catch (err) {
            searchStatus.textContent = 'Invalid search query format.';
            resultsContainer.innerHTML = '';
        }
    }

    // Check URL parameters (?q=... or ?query=...)
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || urlParams.get('query');
    if (initialQuery) {
        searchInput.value = initialQuery;
        doSearch(initialQuery);
    } else {
        searchStatus.textContent = 'Type keywords above to search articles.';
    }

    // Event listeners
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            doSearch(searchInput.value);
        });
    }

    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            doSearch(searchInput.value);
        }
    });
})();
