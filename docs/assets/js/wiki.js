// Wiki - Cara Core Informática
// Navegação, filtros e acessibilidade. Sem animações de entrada.

document.addEventListener('DOMContentLoaded', function() {
    const mobileSidebarQuery = window.matchMedia('(max-width: 1024.98px)');

    function debounce(fn, wait) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() { fn.apply(null, args); }, wait);
        };
    }

    // Navegação ativa no menu
    function setActiveMenuItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.wiki-menu a');

        menuLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Link de salto para teclado
    function initSkipLink() {
        const main = document.querySelector('.wiki-content') || document.querySelector('main') || document.querySelector('.wiki-container');
        if (!main || document.querySelector('.wiki-skip-link')) return;

        if (!main.id) main.id = 'main-content';
        const link = document.createElement('a');
        link.className = 'wiki-skip-link';
        link.href = '#' + main.id;
        link.textContent = 'Pular para o conteúdo';
        document.body.insertBefore(link, document.body.firstChild);
    }

    // Hambúrguer: estado e rótulos acessíveis
    function initNavAccessibility() {
        document.querySelectorAll('nav.wiki-nav').forEach(nav => {
            if (!nav.getAttribute('aria-label')) {
                nav.setAttribute('aria-label', 'Navegação principal');
            }
        });

        document.querySelectorAll('.navbar-toggler').forEach(toggler => {
            toggler.setAttribute('aria-controls', 'navbarWiki');
            toggler.setAttribute('aria-expanded', 'false');
        });
    }

    // Sidebar vira um painel recolhido no celular e no tablet
    function initSidebarToggle() {
        const sidebar = document.querySelector('.wiki-sidebar');
        if (!sidebar) return;

        const column = sidebar.parentElement;
        if (!sidebar.id) sidebar.id = 'wiki-sidebar-panel';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'wiki-sidebar-toggle';
        button.setAttribute('aria-controls', sidebar.id);
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i><span>Navegação desta página</span><i class="bi bi-chevron-down" aria-hidden="true"></i>';
        column.insertBefore(button, sidebar);

        function sync() {
            if (mobileSidebarQuery.matches) {
                button.hidden = false;
                sidebar.hidden = true;
                button.setAttribute('aria-expanded', 'false');
            } else {
                button.hidden = true;
                sidebar.hidden = false;
                button.setAttribute('aria-expanded', 'true');
            }
        }

        button.addEventListener('click', function() {
            const willOpen = sidebar.hidden;
            sidebar.hidden = !willOpen;
            button.setAttribute('aria-expanded', String(willOpen));
        });

        if (mobileSidebarQuery.addEventListener) {
            mobileSidebarQuery.addEventListener('change', sync);
        } else if (mobileSidebarQuery.addListener) {
            mobileSidebarQuery.addListener(sync);
        }

        sync();
    }

    // Tabelas: rótulos por célula, rolagem controlada e cartões no celular
    function initResponsiveTables() {
        document.querySelectorAll('.wiki-content table').forEach(table => {
            if (table.dataset.responsiveReady) return;
            table.dataset.responsiveReady = '1';

            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            if (headers.length) {
                table.querySelectorAll('tbody tr').forEach(row => {
                    Array.from(row.children).forEach((cell, index) => {
                        if (!cell.dataset.label && headers[index] && !cell.hasAttribute('colspan')) {
                            cell.dataset.label = headers[index];
                        }
                    });
                });
            }

            table.classList.add('wiki-table-cards');

            const label = table.querySelector('caption');
            const heading = table.closest('section') ? table.closest('section').querySelector('h2') : null;
            const accessibleName = (label && label.textContent.trim()) || (heading && heading.textContent.trim()) || 'Tabela de dados';

            const existing = table.closest('.table-responsive');
            if (existing) {
                existing.tabIndex = 0;
                existing.setAttribute('role', 'region');
                existing.setAttribute('aria-label', accessibleName);
                return;
            }

            if (table.parentElement && table.parentElement.classList.contains('wiki-table-scroll')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'wiki-table-scroll';
            wrapper.tabIndex = 0;
            wrapper.setAttribute('role', 'region');
            wrapper.setAttribute('aria-label', accessibleName);
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    // Glossário: cada letra vira um acordeão fechado
    function initGlossaryAccordions() {
        const sections = document.querySelectorAll('.wiki-content .glossary-section');
        if (!sections.length) return;

        sections.forEach(section => {
            const heading = section.querySelector('.glossary-letter');
            if (!heading) return;

            const details = document.createElement('details');
            details.className = 'wiki-accordion wiki-accordion--glossary';
            details.id = section.id;

            const summary = document.createElement('summary');
            const wrapper = document.createElement('span');
            const title = document.createElement('span');
            title.className = 'wiki-accordion-title';
            title.textContent = heading.textContent.trim();

            const count = section.querySelectorAll('.glossary-term').length;
            const meta = document.createElement('span');
            meta.className = 'wiki-accordion-meta';
            meta.textContent = count + (count === 1 ? ' termo' : ' termos');
            wrapper.appendChild(title);
            wrapper.appendChild(meta);
            summary.appendChild(wrapper);

            const body = document.createElement('div');
            body.className = 'wiki-accordion-body';
            Array.from(section.children).forEach(child => {
                if (child !== heading) body.appendChild(child);
            });

            details.appendChild(summary);
            details.appendChild(body);
            section.replaceWith(details);
        });
    }

    // Glossário: filtro tolerante a acentos e por conteúdo
    function initGlossaryFilter() {
        const input = document.getElementById('glossary-search');
        if (!input) return;

        const terms = Array.from(document.querySelectorAll('.glossary-term'));
        const groups = Array.from(document.querySelectorAll('.wiki-accordion--glossary, .glossary-section'));
        const count = document.getElementById('glossary-count');
        const empty = document.getElementById('glossary-empty');

        function normalize(value) {
            return (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }

        function apply() {
            const query = normalize(input.value.trim());
            let visible = 0;

            terms.forEach(term => {
                const matches = !query || normalize(term.textContent).includes(query);
                term.hidden = !matches;
                if (matches) visible++;
            });

            groups.forEach(group => {
                const groupTerms = Array.from(group.querySelectorAll('.glossary-term'));
                const groupVisible = groupTerms.filter(term => !term.hidden).length;
                group.hidden = Boolean(query) && groupVisible === 0;
                if (query && groupVisible > 0 && group.tagName === 'DETAILS') {
                    group.open = true;
                }
            });

            if (count) {
                count.textContent = query
                    ? visible + (visible === 1 ? ' termo encontrado' : ' termos encontrados')
                    : terms.length + ' termos no glossário';
            }
            if (empty) empty.hidden = !(query && visible === 0);
        }

        input.addEventListener('input', debounce(apply, 120));
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                input.value = '';
                apply();
            }
        });

        apply();
    }

    // Projetos: filtro + limite inicial para não despejar o catálogo inteiro
    function initProjectFilter() {
        const input = document.querySelector('[data-project-filter]');
        if (!input) return;

        const items = Array.from(document.querySelectorAll('.wiki-content .project-card'));
        if (!items.length) return;

        const count = document.querySelector('[data-project-filter-count]');
        const empty = document.querySelector('[data-project-filter-empty]');
        const more = document.querySelector('[data-project-filter-more]');
        const limit = 6;
        let expanded = false;

        const entries = items.map(item => {
            const section = item.closest('section');
            const soloSection = section && section.querySelectorAll('.project-card').length === 1 ? section : null;
            return {
                item: item,
                wrapper: item.closest('.col-lg-4') || soloSection || item,
                text: item.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            };
        });

        function apply() {
            const query = input.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let visible = 0;

            entries.forEach((entry, index) => {
                const matches = !query || entry.text.includes(query);
                const withinLimit = Boolean(query) || expanded || index < limit;
                const show = matches && withinLimit;
                entry.wrapper.classList.toggle('wiki-project-hidden', !show);
                if (matches) visible++;
            });

            if (count) {
                if (query) {
                    count.textContent = visible + (visible === 1 ? ' projeto encontrado' : ' projetos encontrados');
                } else if (expanded) {
                    count.textContent = items.length + ' projetos exibidos';
                } else {
                    count.textContent = Math.min(limit, items.length) + ' de ' + items.length + ' projetos exibidos';
                }
            }

            if (empty) empty.hidden = !(query && visible === 0);

            if (more) {
                more.hidden = Boolean(query) || items.length <= limit;
                more.textContent = expanded ? 'Mostrar menos projetos' : 'Mostrar todos os projetos';
            }
        }

        input.addEventListener('input', debounce(apply, 120));
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                input.value = '';
                apply();
            }
        });

        if (more) {
            more.addEventListener('click', function() {
                expanded = !expanded;
                apply();
            });
        }

        apply();
    }

    // Abre o acordeão certo quando a URL aponta para dentro dele
    function openDetailsForHash(hash, shouldScroll) {
        if (!hash || hash === '#') return;

        let target;
        try {
            target = document.querySelector(hash);
        } catch (error) {
            return;
        }
        if (!target) return;

        let node = target;
        while (node) {
            if (node instanceof HTMLDetailsElement) node.open = true;
            node = node.parentElement;
        }

        if (shouldScroll) target.scrollIntoView({ block: 'start' });
    }

    function initHashDetails() {
        openDetailsForHash(window.location.hash, false);
        window.addEventListener('hashchange', function() {
            openDetailsForHash(window.location.hash, true);
        });
    }

    // Breadcrumb dinâmico (fallback quando a página não traz a trilha escrita)
    function initBreadcrumb() {
        const breadcrumb = document.querySelector('.wiki-breadcrumb nav');
        if (breadcrumb && !breadcrumb.querySelector('ol.breadcrumb')) {
            const currentPage = document.title;
            const pathParts = window.location.pathname.split('/').filter(part => part !== '');

            let breadcrumbHTML = '<a href="index.html">Wiki Home</a>';

            if (pathParts.length > 2) {
                const currentFile = pathParts[pathParts.length - 1];
                if (currentFile !== 'index.html') {
                    breadcrumbHTML += ` > <span>${currentPage}</span>`;
                }
            }

            breadcrumb.innerHTML = breadcrumbHTML;
        }
    }

    // Copiar código para clipboard
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.innerHTML = '<i class="bi bi-clipboard" aria-hidden="true"></i>';
            button.title = 'Copiar código';
            button.setAttribute('aria-label', 'Copiar código');

            block.parentNode.style.position = 'relative';
            block.parentNode.appendChild(button);

            button.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    button.innerHTML = '<i class="bi bi-check" aria-hidden="true"></i>';
                    setTimeout(() => {
                        button.innerHTML = '<i class="bi bi-clipboard" aria-hidden="true"></i>';
                    }, 2000);
                });
            });
        });
    }

    // Print friendly
    function initPrintSupport() {
        const printBtn = document.getElementById('print-page');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }

    // Lazy loading para imagens com data-src
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        if (!images.length || !('IntersectionObserver' in window)) {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    initSkipLink();
    initNavAccessibility();
    initSidebarToggle();
    initResponsiveTables();
    initGlossaryAccordions();
    initGlossaryFilter();
    initProjectFilter();
    setActiveMenuItem();
    initBreadcrumb();
    initCodeCopy();
    initPrintSupport();
    initLazyLoading();
    initHashDetails();

    window.addEventListener('popstate', setActiveMenuItem);
});

// Utilitários globais
window.WikiUtils = {
    formatDate: function(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    generateId: function(prefix = 'wiki') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    },

    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
