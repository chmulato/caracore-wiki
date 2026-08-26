// Wiki Search - Cara Core Informática
// Sistema de busca inteligente para o Wiki

document.addEventListener('DOMContentLoaded', function() {
    initWikiSearch();
});

function initWikiSearch() {
    const searchInput = document.getElementById('wiki-search');
    if (!searchInput) return;

    // Índice de conteúdo do wiki
    const wikiIndex = [
        {
            title: 'CaraCore PDV (hub Java + Rust)',
            description: 'Duas linhas desktop do mesmo caixa: Java maduro v3.2.2-free e Rust piloto v0.1.2 — nenhuma substitui a outra',
            url: 'projeto-pdv.html',
            tags: ['pdv', 'hub', 'coexistência', 'java', 'rust', 'v3', 'pix split'],
            category: 'projeto'
        },
        {
            title: 'CaraCore PDV Desktop (Java)',
            description: 'PDV maduro multi-plataforma (v3.2.2-free): PIX, operação local, JavaFX, Quarkus e conformidade fiscal',
            url: 'projeto-pdv.html#java',
            tags: ['pdv', 'ponto de venda', 'varejo', 'pix', 'javafx', 'quarkus', 'sqlite', 'fiscal', 'pme', 'selo verde', 'v3.2.2-free', 'java 25'],
            category: 'projeto'
        },
        {
            title: 'CaraCore PDV (Rust + Tauri)',
            description: 'Linha desktop Rust + Tauri 2 — piloto Windows, instaladores pt-BR, release v0.1.2, download no GitHub Releases',
            url: 'projeto-pdv-rust.html',
            tags: ['pdv', 'rust', 'tauri', 'react', 'windows', 'piloto', 'caracore pdv', 'pt-br', 'msi', 'nsis', 'v0.1.2', 'github releases'],
            category: 'projeto'
        },
        {
            title: 'Ink Agenda',
            description: 'Aplicativo para estúdios de tatuagem com agenda, clientes, financeiro e operação offline no desktop — v2.0.0 lançada',
            url: 'projeto-ink.html',
            tags: ['ink agenda', 'tatuagem', 'estúdio', 'agenda', 'financeiro', 'clientes', 'javafx', 'sqlite', 'offline', 'windows', 'v2.0.0'],
            category: 'projeto'
        },
        {
            title: 'Minerador 4.0',
            description: 'Simulador de ETE e hidrometalurgia para Ensino Médio e mineração. Terras raras, upgrade Ouro 4.0',
            url: 'projeto-minerador.html',
            tags: ['minerador', 'ete', 'efluentes', 'hidrometalurgia', 'terras raras', 'ensino médio', 'campo largo', 'simulador', 'ouro 4.0', 'streamlit', 'python'],
            category: 'projeto'
        },
        {
            title: 'CaraCore Hub',
            description: 'Gestão logística e e-commerce (WAR/Tomcat) para centros de distribuição — Garagem Abr/2027',
            url: 'projeto-hub.html',
            tags: ['java', 'tomcat', 'war', 'logística', 'e-commerce', 'hub', 'garagem'],
            category: 'projeto'
        },
        {
            title: 'CaraCore Seed',
            description: 'Contador de licenças interno — vitrine pública; aplicação não está em oferta',
            url: 'projeto-seed.html',
            tags: ['seed', 'licença', 'interno', 'windows', 'sqlite', 'contador'],
            category: 'projeto'
        },
        {
            title: 'Reino OIDC',
            description: 'Projeto educacional sobre OAuth 2.1 e OpenID Connect com analogia de reino medieval',
            url: 'projeto-reino.html',
            tags: ['oauth', 'oidc', 'segurança', 'autenticação', 'educação', 'open source'],
            category: 'projeto'
        },
        {
            title: 'Área 51',
            description: 'Sistema de autenticação centralizado com múltiplos provedores OIDC',
            url: 'projeto-area51.html',
            tags: ['oauth', 'oidc', 'autenticação', 'google', 'microsoft', 'entra id', 'segurança'],
            category: 'projeto'
        },
        {
            title: 'Circuito Ferradura',
            description: 'Produto educacional em evolução para lógica, ábaco romano e Python',
            url: 'projeto-python.html',
            tags: ['python', 'treinamento', 'educação', 'estagiário', 'circuito', 'ferradura'],
            category: 'projeto'
        },
        {
            title: 'CaraCore CSO',
            description: 'Gestão de Frotas (Web, em produção) e Gestão de Transportes (Desktop bunker 08/11/2028) em cso.caracore.com.br — CSO não é rastreador GPS',
            url: 'projeto-cso.html',
            tags: ['cso', 'frotas', 'transportes', 'quarkus', 'logística', 'javafx', 'produção', 'frota', 'veículos', 'lgpd', 'pix', 'planilha', 'bunker'],
            category: 'projeto'
        },
        {
            title: 'Gestão de Frotas (CSO)',
            description: 'SaaS no navegador: veículos, combustível, manutenção, motoristas, viagens e relatórios — já em produção',
            url: 'projeto-cso.html#frotas',
            tags: ['frotas', 'cso', 'veículos', 'abastecimento', 'manutenção', 'motorista', 'relatórios', 'free_3', 'p5', 'p10'],
            category: 'projeto'
        },
        {
            title: 'Gestão de Transportes (CSO)',
            description: 'Bunker desktop offline-first (JavaFX + SQLite), lançamento 08/11/2028 — não substitui a Frotas Web',
            url: 'projeto-cso.html#transportes',
            tags: ['transportes', 'cso', 'desktop', 'javafx', 'sqlite', 'bunker', 'entregas', '2028'],
            category: 'projeto'
        },
        {
            title: 'RU Soberano',
            description: 'Simulador de reator e sala RETRO — lançamento 18/06/2027, loja ru.caracore.com.br',
            url: 'projeto-ru.html',
            tags: ['ru', 'soberano', 'reator', 'retro', 'javafx', 'engenharia', 'simulador'],
            category: 'projeto'
        },
        {
            title: 'Helianto Condominium',
            description: 'Administração condominial com soberania de dados — helianto.caracore.com.br, lançamento 30/12/2027',
            url: 'projeto-helianto.html',
            tags: ['helianto', 'condomínio', 'bolepix', 'spring boot', 'react', 'postgresql'],
            category: 'projeto'
        },
        {
            title: 'Cara Core MKT',
            description: 'Vitrine gratuita e Sala Cara Core — rotina, disciplina e presença digital. Não vendemos.',
            url: 'projeto-mkt.html',
            tags: ['mkt', 'sala', 'gratuito', 'lgpd', 'python', 'tools'],
            category: 'projeto'
        },
        {
            title: 'Eco Mundo',
            description: 'Mapa do ecossistema: matriz, produtos, oficinas, lojas e presenças institucionais',
            url: 'ecosistema.html',
            tags: ['eco mundo', 'ecossistema', 'matriz', 'oficina', 'loja', 'mapa'],
            category: 'navegação'
        },
        {
            title: 'Visão Geral dos Projetos',
            description: 'Overview completo de todos os projetos da Cara Core',
            url: 'projetos-overview.html',
            tags: ['overview', 'projetos', 'portfólio', 'visão geral'],
            category: 'navegação'
        },
        {
            title: 'Centro de Alinhamento (Trilhas)',
            description: 'Entrada da wiki por personagens: Cliente, Estagiário e Sócio — com cenários e linha do tempo',
            url: 'index.html',
            tags: ['trilha', 'cliente', 'estagiário', 'sócio', 'cenários', 'linha do tempo', 'desde 2010', 'storytelling', 'alinhamento'],
            category: 'navegação'
        },
        {
            title: 'Trilha do Sucesso (Cliente)',
            description: 'Cenários e decisões práticas: economia, blindagem e produtividade — foco em resultado',
            url: 'trilha-cliente.html',
            tags: ['trilha', 'cliente', 'sucesso', 'resultado', 'economia', 'blindagem', 'selo verde', 'pdv', 'produtividade'],
            category: 'guia'
        },
        {
            title: 'Trilha do Aprendizado (Estagiário)',
            description: 'Cultura, padrão de execução e cenários reais de trabalho',
            url: 'trilha-estagiario.html',
            tags: ['trilha', 'estagiário', 'aprendizado', 'cultura', 'execução', 'onboarding', 'padrão', 'visita técnica'],
            category: 'guia'
        },
        {
            title: 'Trilha da Estratégia (Sócio)',
            description: 'Visão, decisões por cenário e próximos passos 2026 (alto nível)',
            url: 'trilha-socio.html',
            tags: ['trilha', 'sócio', 'estratégia', 'decisão', '2026', 'visão', 'evolução', 'governança'],
            category: 'guia'
        },
        {
            title: 'Tecnologias Utilizadas',
            description: 'Stack tecnológico: Python, Flask, OAuth, Azure, Docker',
            url: 'tecnologias.html',
            tags: ['python', 'flask', 'oauth', 'oidc', 'azure', 'docker', 'html', 'css', 'javascript', 'tecnologia'],
            category: 'referência'
        },
        {
            title: 'Guia do Estagiário',
            description: 'Guia completo para novos estagiários da Cara Core',
            url: 'guia-estagiario.html',
            tags: ['estagiário', 'onboarding', 'treinamento', 'início', 'tutorial'],
            category: 'guia'
        },
        {
            title: 'Como Contribuir',
            description: 'Instruções para contribuir com os projetos da Cara Core',
            url: 'contribuindo.html',
            tags: ['git', 'github', 'contribuição', 'desenvolvimento', 'workflow'],
            category: 'guia'
        },
        {
            title: 'Glossário Técnico',
            description: 'Dicionário de termos técnicos com explicações simples',
            url: 'glossario.html',
            tags: ['glossário', 'termos', 'definições', 'referência', 'dicionário'],
            category: 'referência'
        }
    ];

    let searchResults = null;
    let selectedIndex = -1;

    // Criar container de resultados
    const resultsContainer = createResultsContainer();
    searchInput.parentElement.appendChild(resultsContainer);

    // Event listener para input
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            hideResults();
            filterLocalCards('');
            return;
        }

        const results = searchWiki(searchTerm, wikiIndex);
        displayResults(results);
        filterLocalCards(searchTerm);
    }, 300));

    // Navegação por teclado
    searchInput.addEventListener('keydown', function(e) {
        if (!resultsContainer.classList.contains('show')) return;

        const items = resultsContainer.querySelectorAll('.search-result-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelectedItem(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelectedItem(items);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        } else if (e.key === 'Escape') {
            hideResults();
        }
    });

    // Fechar resultados ao clicar fora
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            hideResults();
        }
    });

    // Funções auxiliares
    function searchWiki(term, index) {
        const results = [];
        
        index.forEach(item => {
            let score = 0;
            
            // Busca no título (peso maior)
            if (item.title.toLowerCase().includes(term)) {
                score += 10;
            }
            
            // Busca na descrição
            if (item.description.toLowerCase().includes(term)) {
                score += 5;
            }
            
            // Busca nas tags
            item.tags.forEach(tag => {
                if (tag.includes(term)) {
                    score += 3;
                }
            });
            
            if (score > 0) {
                results.push({ ...item, score });
            }
        });
        
        // Ordenar por relevância
        return results.sort((a, b) => b.score - a.score);
    }

    function createResultsContainer() {
        const container = document.createElement('div');
        container.className = 'wiki-search-results';
        container.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bs-body-bg, #fff);
            border: 1px solid var(--bs-border-color, #dee2e6);
            border-radius: 0.375rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 0.25rem;
            display: none;
        `;
        return container;
    }

    function displayResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results" style="padding: 1rem; text-align: center; color: var(--bs-secondary-color, #6c757d);">
                    <i class="bi bi-search"></i> Nenhum resultado encontrado
                </div>
            `;
            resultsContainer.style.display = 'block';
            resultsContainer.classList.add('show');
            return;
        }

        resultsContainer.innerHTML = results.map((item, index) => `
            <div class="search-result-item" data-url="${item.url}" data-index="${index}" style="
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid var(--bs-border-color, #dee2e6);
                transition: background-color 0.2s;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="bi bi-${getCategoryIcon(item.category)}" style="color: var(--wiki-primary, #0d6efd);"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--bs-body-color, #212529);">${highlightText(item.title, searchInput.value)}</div>
                        <div style="font-size: 0.875rem; color: var(--bs-secondary-color, #6c757d); margin-top: 0.25rem;">
                            ${highlightText(item.description, searchInput.value)}
                        </div>
                        <div style="margin-top: 0.25rem;">
                            ${item.tags.slice(0, 4).map(tag => 
                                `<span class="badge bg-secondary" style="font-size: 0.7rem; margin-right: 0.25rem;">${tag}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Adicionar event listeners
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                window.location.href = this.dataset.url;
            });
            
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--bs-light, #f8f9fa)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.backgroundColor = '';
                }
            });
        });

        resultsContainer.style.display = 'block';
        resultsContainer.classList.add('show');
        selectedIndex = -1;
    }

    function hideResults() {
        resultsContainer.style.display = 'none';
        resultsContainer.classList.remove('show');
        selectedIndex = -1;
    }

    function updateSelectedItem(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
                item.style.backgroundColor = 'var(--bs-light, #f8f9fa)';
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
                item.style.backgroundColor = '';
            }
        });
    }

    function filterLocalCards(searchTerm) {
        // Filtrar cards na página atual (se existirem)
        const cards = document.querySelectorAll('.project-card, .feature-card, .resource-card');
        
        cards.forEach(card => {
            if (searchTerm === '') {
                card.style.display = '';
                return;
            }

            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function highlightText(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fff3cd; padding: 0 0.2rem;">$1</mark>');
    }

    function getCategoryIcon(category) {
        const icons = {
            'projeto': 'folder',
            'guia': 'book',
            'referência': 'bookmark',
            'navegação': 'compass'
        };
        return icons[category] || 'file-text';
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function debounce(func, wait) {
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
}

// CSS para animação
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .wiki-search-results::-webkit-scrollbar {
        width: 8px;
    }

    .wiki-search-results::-webkit-scrollbar-track {
        background: var(--bs-light, #f8f9fa);
        border-radius: 4px;
    }

    .wiki-search-results::-webkit-scrollbar-thumb {
        background: var(--bs-secondary, #6c757d);
        border-radius: 4px;
    }

    .wiki-search-results::-webkit-scrollbar-thumb:hover {
        background: var(--bs-dark, #212529);
    }

    #wiki-search {
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    #wiki-search:focus {
        border-color: var(--wiki-primary, #0d6efd);
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    [data-theme="dark"] .wiki-search-results {
        background: #2c3e50;
        border-color: rgba(255, 255, 255, 0.1);
    }

    [data-theme="dark"] .search-result-item {
        border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    [data-theme="dark"] .search-result-item:hover,
    [data-theme="dark"] .search-result-item.selected {
        background-color: rgba(255, 255, 255, 0.05) !important;
    }

    [data-theme="dark"] mark {
        background-color: rgba(255, 193, 7, 0.3) !important;
        color: #ffc107;
    }
`;
document.head.appendChild(style);
