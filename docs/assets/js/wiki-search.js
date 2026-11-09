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
            title: 'CaraCore PDV (Java + Rust)',
            description: 'Duas linhas do caixa da loja: a linha Java madura e a linha piloto Rust. O que cada uma faz e como escolher',
            url: 'projeto-pdv.html',
            tags: ['pdv', 'ponto de venda', 'caixa', 'varejo', 'java', 'rust', 'coexistência'],
            category: 'projeto'
        },
        {
            title: 'CaraCore PDV Java (linha madura)',
            description: 'PDV maduro no navegador: cadastro de produtos, venda e operação local. Sem PIX integrado e sem NF-e/NFC-e no Free.',
            url: 'projeto-pdv.html#java',
            tags: ['pdv', 'ponto de venda', 'varejo', 'quarkus', 'sqlite', 'navegador', 'pme', 'java'],
            category: 'projeto'
        },
        {
            title: 'CaraCore PDV (Rust + Tauri)',
            description: 'Linha desktop do PDV em Rust + Tauri para Windows — piloto com instaladores em pt-BR.',
            url: 'projeto-pdv-rust.html',
            tags: ['pdv', 'rust', 'tauri', 'react', 'windows', 'piloto', 'desktop', 'pt-br'],
            category: 'projeto'
        },
        {
            title: 'Ink Agenda',
            description: 'Aplicativo para tatuagem, odontologia e beleza com agenda, clientes, financeiro, equipe com papéis e mensageria no desktop — v2.2.1 publicada',
            url: 'projeto-ink.html',
            tags: ['ink agenda', 'tatuagem', 'odontologia', 'beleza', 'estúdio', 'agenda', 'financeiro', 'clientes', 'equipe', 'mensageria', 'javafx', 'sqlite', 'offline', 'windows', 'linux', 'v2.2.1'],
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
            description: 'Gestão logística interna de ponto de retirada (PUDO): recebimento, guarda por posição e retirada conferida. Canais desta edição: Mercado Livre, Shopee e Temu.',
            url: 'projeto-hub.html',
            tags: ['hub', 'pudo', 'ponto de retirada', 'encomendas', 'mercado livre', 'shopee', 'temu', 'java'],
            category: 'projeto'
        },
        {
            title: 'Manual operacional do Hub',
            description: 'Como usar a aplicação web do ponto de retirada: login por telefone, dashboard, pedidos, estoque, administração e problemas comuns',
            url: 'hub/index.html',
            tags: ['hub', 'manual', 'tutorial', 'pudo', 'ponto de retirada', 'pedidos', 'estoque', 'login', 'encomendas', '2.1'],
            category: 'guia'
        },
        {
            title: 'Hub — pedidos e estoque',
            description: 'Lista de pedidos, triagem, mapa de posições, etiquetas, recebimento e inventário cíclico',
            url: 'hub/pedidos.html',
            tags: ['hub', 'pedidos', 'estoque', 'qr', 'etiqueta', 'inventário', 'pudo', 'ponto de retirada', 'marketplace'],
            category: 'guia'
        },
        {
            title: 'Hub — administração e conectores',
            description: 'RBAC, métricas, relatórios, Mercado Livre, Shopee, Temu e auditoria LGPD',
            url: 'hub/admin.html',
            tags: ['hub', 'admin', 'rbac', 'mercado livre', 'shopee', 'temu', 'auditoria', 'whatsapp'],
            category: 'guia'
        },
        {
            title: 'CaraCore Seed',
            description: 'Guia de uso do CaraCore Seed: primeiros passos, clientes, licenças, backups e integrações da pré-release Windows 0.1.5',
            url: 'projeto-seed.html',
            tags: ['seed', 'clientes', 'licenças', 'token', 'assinatura', 'backup', 'seedbackup', 'api', 'integração', 'windows', '0.1.5'],
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
            title: 'Área 51 (laboratório de segurança)',
            description: 'Onde testamos padrões de acesso e autenticação antes de liberar no restante dos produtos',
            url: 'projeto-area51.html',
            tags: ['área 51', 'laboratorio', 'segurança', 'oauth', 'oidc', 'autenticação', 'google', 'microsoft', 'entra id'],
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
            description: 'Gestão de Frotas no navegador e Gestão de Transportes no desktop — duas aplicações, uma solução. CSO não é rastreador GPS.',
            url: 'projeto-cso.html',
            tags: ['cso', 'frotas', 'transportes', 'quarkus', 'frota', 'veículos', 'logística', 'javafx', 'lgpd', 'pix', 'planilha'],
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
            title: 'BioReator 4.0',
            description: 'Community 1.1.1 publicada em 13/10/2026. Premium em 18/06/2027, sem preço e sem PIX. Loja ru.caracore.com.br',
            url: 'projeto-bioreator.html',
            tags: ['ru', 'bioreator', 'bioinsumos', 'fermentacao', 'community', 'premium', 'javafx'],
            category: 'projeto'
        },
        {
            title: 'Helianto Condominium',
            description: 'Administração condominial com soberania de dados — helianto.caracore.com.br, lançamento 30/12/2029',
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
            title: 'Mapa do ecossistema (Eco Mundo)',
            description: 'Como a Cara Core se organiza: empresa, produto, oficina e loja. Núcleo PDV, CSO, Hub e Ink Agenda. Eco Mundo é só o apelido interno.',
            url: 'ecosistema.html',
            tags: ['eco mundo', 'ecossistema', 'matriz', 'oficina', 'loja', 'mapa', 'garagem'],
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
            title: 'Wiki Cara Core — portal de conhecimento',
            description: 'Ponto de entrada: o que é a Cara Core, quem você é, produtos principais e recursos da wiki',
            url: 'index.html',
            tags: ['início', 'portal', 'conhecimento', 'produtos', 'cliente', 'estagiário', 'sócio'],
            category: 'navegação'
        },
        {
            title: 'Estado dos Produtos (versões e datas)',
            description: 'Centro de status: linhas e versões do PDV, CSO, Hub e Ink Agenda, pré-lançamentos, RC, GA, manutenção e cronogramas',
            url: 'status.html',
            tags: ['status', 'estado', 'versão', 'versões', 'rc', 'ga', 'manutenção', 'pré-lançamento', 'roadmap', 'cronograma', 'datas'],
            category: 'referência'
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
        },
        {
            title: 'Componentes da entrega — Área 51',
            description: 'Componentes fieis do pacote licenciado Área 51: scripts OIDC, operação Keycloak, testes e documentação.',
            url: 'area51/componentes-entrega.html',
            tags: ['area51', 'oidc', 'keycloak', 'scripts', 'entrega'],
            category: 'projeto'
        },
        {
            title: 'Fluxo OIDC de referência — Área 51',
            description: 'Diagrama de referência: Authorization Code + PKCE para integrações OIDC do cliente licenciado — não modela a loja pública.',
            url: 'area51/fluxo-oidc-referencia.html',
            tags: ['area51', 'oidc', 'pkce', 'authorization code', 'diagrama'],
            category: 'projeto'
        },
        {
            title: 'Fronteiras e segurança — Área 51',
            description: 'Fronteiras on-premises, variáveis de ambiente, controlos PKCE/JWT e pipeline de validação do produto Área 51.',
            url: 'area51/fronteiras-seguranca.html',
            tags: ['area51', 'segurança', 'jwt', 'pkce', 'on-premises'],
            category: 'projeto'
        },
        {
            title: 'O que é o Área 51',
            description: 'Definição fiel do produto Área 51: titularidade, entrega licenciada, pacote baseline e serviços Cara Core.',
            url: 'area51/o-que-e-area51.html',
            tags: ['área 51', 'laboratório', 'licenciado', 'baseline', 'oidc'],
            category: 'projeto'
        },
        {
            title: 'O que recebe na entrega — Área 51',
            description: 'Estrutura do pacote licenciado Área 51, exemplos de configuração, comandos de validação e referência de laboratório.',
            url: 'area51/o-que-recebe-entrega.html',
            tags: ['área 51', 'pacote', 'configuração', 'validação', 'laboratório'],
            category: 'projeto'
        },
        {
            title: 'BioReator 4.0 — modelo e exemplo 1.1.1',
            description: 'Modelo, parâmetros, método numérico, critérios de término e trajetória de referência do BioReator 4.0 Community 1.1.1.',
            url: 'bioreator-tecnico.html',
            tags: ['bioreator', 'modelo', 'parâmetros', 'numérico', '1.1.1'],
            category: 'projeto'
        },
        {
            title: 'Downloads — Circuito Ferradura',
            description: 'Baixe e avalie o Circuito Ferradura para Windows, macOS ou HTML offline.',
            url: 'circuito/entregas.html',
            tags: ['circuito', 'download', 'windows', 'macos', 'html offline'],
            category: 'projeto'
        },
        {
            title: 'Dúvidas rápidas — Circuito Ferradura',
            description: 'Dúvidas rápidas e transparentes sobre download, uso pessoal, conversa com escolas e suporte do Circuito Ferradura.',
            url: 'circuito/faq.html',
            tags: ['circuito', 'dúvidas', 'suporte', 'escolas', 'gratuito'],
            category: 'projeto'
        },
        {
            title: 'Como funciona — Circuito Ferradura',
            description: 'Conheça a proposta do Circuito Ferradura em linguagem simples e transparente.',
            url: 'circuito/roteiro-pedagogico.html',
            tags: ['circuito', 'lógica', 'ábaco', 'python', 'pedagogia'],
            category: 'projeto'
        },
        {
            title: 'Como acessar o CaraCore Hub',
            description: 'A aplicação web do ponto de retirada abre no navegador. URL local típica no Tomcat instalado.',
            url: 'hub/acesso.html',
            tags: ['hub', 'acesso', 'navegador', 'tomcat', 'url'],
            category: 'guia'
        },
        {
            title: 'Casos de uso — CaraCore Hub',
            description: 'Três fluxos: receber mercadoria, processar pedido do Mercado Livre e fazer inventário.',
            url: 'hub/casos-de-uso.html',
            tags: ['hub', 'casos de uso', 'mercado livre', 'inventário', 'recebimento'],
            category: 'guia'
        },
        {
            title: 'Dashboard — CaraCore Hub',
            description: 'A sala de controle depois do login: métricas, atalhos, alertas e status dos conectores.',
            url: 'hub/dashboard.html',
            tags: ['hub', 'dashboard', 'métricas', 'conectores', 'alertas'],
            category: 'guia'
        },
        {
            title: 'Dicas e atalhos — CaraCore Hub',
            description: 'Atalhos de teclado, busca, operação no chão e alertas que pedem ação.',
            url: 'hub/dicas.html',
            tags: ['hub', 'atalhos', 'teclado', 'operação', 'alertas'],
            category: 'guia'
        },
        {
            title: 'Controle de estoque — CaraCore Hub',
            description: 'Painel, busca, etiquetas, ocupação, mapa, recebimento, retirada e inventário cíclico.',
            url: 'hub/estoque.html',
            tags: ['hub', 'estoque', 'etiquetas', 'inventário', 'mapa'],
            category: 'guia'
        },
        {
            title: 'Login e sessão — CaraCore Hub',
            description: 'Como entrar, recuperar senha, perfil e logout na aplicação web do Hub.',
            url: 'hub/login.html',
            tags: ['hub', 'login', 'sessão', 'senha', 'perfil'],
            category: 'guia'
        },
        {
            title: 'Problemas comuns — CaraCore Hub',
            description: 'Login, lentidão, leitor, gravação, conector, estoque e exportação — o que tentar antes do suporte.',
            url: 'hub/troubleshooting.html',
            tags: ['hub', 'problemas', 'suporte', 'login', 'conector'],
            category: 'guia'
        },
        {
            title: 'Contador do PDV Free',
            description: 'O que o PDV Free gera hoje para o contador e a Reforma Tributária.',
            url: 'pdv/contador.html',
            tags: ['pdv free', 'contador', 'reforma tributária', 'fiscal'],
            category: 'guia'
        },
        {
            title: 'Hub de Guias do PDV',
            description: 'Central de guias públicos do CaraCore PDV, com foco na aplicação web local no navegador e arquivo resumido de apoio.',
            url: 'pdv/guias-aplicacao.html',
            tags: ['pdv', 'guias', 'aplicação web', 'manual', 'navegador'],
            category: 'guia'
        },
        {
            title: 'Wiki do PDV Free',
            description: 'Wiki do PDV Free: usar, contador e parceiros.',
            url: 'pdv/index.html',
            tags: ['pdv free', 'wiki', 'manual', 'contador', 'parceiros'],
            category: 'guia'
        },
        {
            title: 'Manual Operacional PDV Java - Aplicação Web Local',
            description: 'Guia operacional do CaraCore PDV Java, aplicação web local acessada pelo navegador e com SQLite no computador da loja.',
            url: 'pdv/manual-operacional-pdv-java21.html',
            tags: ['pdv', 'manual', 'java 21', 'aplicação web', 'sqlite'],
            category: 'guia'
        },
        {
            title: 'Programa de Parceiros',
            description: 'Programa de Parceiros Cara Core: comissão de ativação e comissão mensal pela venda do PDV Free.',
            url: 'pdv/parceiros.html',
            tags: ['pdv free', 'parceiros', 'comissão', 'venda', 'ativação'],
            category: 'guia'
        },
        {
            title: 'Usar o PDV Free',
            description: 'Instalar o PDV Free, fazer a primeira venda, entender mensagens e pedir suporte.',
            url: 'pdv/usar.html',
            tags: ['pdv free', 'instalação', 'primeira venda', 'suporte', 'operador'],
            category: 'guia'
        },
        {
            title: 'Manual Operacional PDV - Alias Historico',
            description: 'Alias historico mantido para continuidade de links antigos, com redirecionamento editorial para os materiais corretamente classificados da loja.',
            url: 'pdv/manual-operacional-pdv-stack-anterior.html',
            tags: ['pdv', 'histórico', 'alias', 'manual', 'links antigos'],
            category: 'guia'
        },
        {
            title: 'Manual de Upgrade Historico - Transicao Java 21',
            description: 'Guia historico preservado da transicao para Java 21, mantido para auditoria e consulta tecnica, nao como fluxo publico principal.',
            url: 'pdv/manual-upgrade-java21.html',
            tags: ['pdv', 'upgrade', 'java 21', 'histórico', 'transição'],
            category: 'guia'
        }
    ];

    let searchResults = null;
    let selectedIndex = -1;

    // Criar container de resultados (padrão ARIA combobox/listbox)
    const resultsContainer = createResultsContainer();
    searchInput.parentElement.appendChild(resultsContainer);

    searchInput.setAttribute('role', 'combobox');
    searchInput.setAttribute('aria-autocomplete', 'list');
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.setAttribute('aria-controls', resultsContainer.id);

    // Região live: anuncia quantidade de resultados a leitores de tela
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    searchInput.parentElement.appendChild(liveRegion);

    // Exemplos ficam ocultos enquanto o dropdown está aberto (evita sobreposição no mobile)
    const examplesRow = document.querySelector('.wiki-search-examples');
    document.querySelectorAll('[data-wiki-search-example]').forEach(function (chip) {
        chip.addEventListener('click', function () {
            searchInput.value = chip.getAttribute('data-wiki-search-example') || '';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.focus();
        });
    });

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

    // Confirmação (botão ou Enter sem seleção): vai ao melhor resultado
    const searchForm = document.getElementById('wiki-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            confirmSearch();
        });
    }

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
        container.id = 'wiki-search-results';
        container.setAttribute('role', 'listbox');
        container.setAttribute('aria-label', 'Resultados da busca');
        container.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--wiki-inst-surface, #fff);
            border: 1px solid var(--wiki-inst-border, #dee2e6);
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
        if (examplesRow) examplesRow.classList.add('wiki-search-examples--hidden');
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results" style="padding: 1rem; text-align: center; color: var(--wiki-inst-muted, #6c757d);">
                    <i class="bi bi-search"></i> Nenhum resultado encontrado
                </div>
            `;
            resultsContainer.style.display = 'block';
            resultsContainer.classList.add('show');
            searchInput.setAttribute('aria-expanded', 'true');
            announce('Nenhum resultado encontrado para "' + searchInput.value.trim() + '"');
            return;
        }

        resultsContainer.innerHTML = results.map((item, index) => `
            <div class="search-result-item" role="option" id="wiki-search-option-${index}" aria-selected="false" data-url="${item.url}" data-index="${index}" style="
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid var(--wiki-inst-border, #dee2e6);
                transition: background-color 0.2s;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="bi bi-${getCategoryIcon(item.category)}" style="color: var(--wiki-inst-accent, #0d6efd);"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--wiki-inst-text, #212529);">${highlightText(item.title, searchInput.value)}</div>
                        <div style="font-size: 0.875rem; color: var(--wiki-inst-muted, #6c757d); margin-top: 0.25rem;">
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
                this.style.backgroundColor = 'var(--wiki-inst-header-bg, #f8f9fa)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.backgroundColor = '';
                }
            });
        });

        resultsContainer.style.display = 'block';
        resultsContainer.classList.add('show');
        searchInput.setAttribute('aria-expanded', 'true');
        searchInput.removeAttribute('aria-activedescendant');
        announce(results.length + (results.length === 1 ? ' resultado encontrado' : ' resultados encontrados'));
        selectedIndex = -1;
    }

    function hideResults() {
        resultsContainer.style.display = 'none';
        resultsContainer.classList.remove('show');
        if (examplesRow) examplesRow.classList.remove('wiki-search-examples--hidden');
        searchInput.setAttribute('aria-expanded', 'false');
        searchInput.removeAttribute('aria-activedescendant');
        resultsContainer.querySelectorAll('[aria-selected="true"]').forEach(function(item) {
            item.setAttribute('aria-selected', 'false');
        });
        selectedIndex = -1;
    }

    function announce(message) {
        liveRegion.textContent = '';
        liveRegion.textContent = message;
    }

    function confirmSearch() {
        const term = searchInput.value.trim().toLowerCase();

        if (term.length < 2) {
            searchInput.focus();
            return;
        }

        const results = searchWiki(term, wikiIndex);

        if (results.length > 0) {
            window.location.href = results[0].url;
        } else {
            displayResults([]);
            filterLocalCards(term);
            searchInput.focus();
        }
    }

    function updateSelectedItem(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
                item.setAttribute('aria-selected', 'true');
                item.style.backgroundColor = 'var(--wiki-inst-header-bg, #f8f9fa)';
                searchInput.setAttribute('aria-activedescendant', item.id);
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
                item.setAttribute('aria-selected', 'false');
                item.style.backgroundColor = '';
            }
        });
        if (selectedIndex < 0) {
            searchInput.removeAttribute('aria-activedescendant');
        }
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
        background: var(--wiki-inst-header-bg, #f8f9fa);
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

    .wiki-search-examples--hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);
