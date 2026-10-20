# Wiki da Cara Core Informática

## Sobre este Wiki

O Wiki da Cara Core Informática foi criado como um guia completo para **estagiários**, **colaboradores** e **pessoas interessadas** em nossos projetos de tecnologia.

### Objetivo Principal

Fornecer explicações **claras e acessíveis** sobre o que a Cara Core entrega. Os **três produtos-chave** são **PDV** (caixa desktop Java + Rust), **CSO** (Frotas no ar + Transportes 2028) e **Hub** (encomendas; GA Windows 06/Abr/2027). O restante do portfólio (Ink, OIDC, Seed, Circuito, Área 51, RU, Helianto, MKT) está documentado sem competir com esse núcleo. O Wiki está alinhado ao **mapa do ecossistema** (apelido interno: Eco Mundo — matriz → produtos → oficinas → lojas em [ecosistema.html](https://wiki.caracore.com.br/ecosistema.html)); todas as páginas da wiki incluem o link **Mapa** na navegação.

## Projetos Documentados

1. **CaraCore PDV Desktop (Java · Quarkus)** — Oferta madura multi-plataforma (Windows · Linux · macOS): venda no navegador, operação local; canal estável **v3.2.12-free**. A **v4.0.0-rc6** é a pré-release pública para avaliação no Windows. A **v4.0.0-rc5** fica no histórico. T032 ainda aberto; Free sem PIX integrado e sem emissão de NF-e/NFC-e. PIX integrado e recursos fiscais permanecem no Premium.
2. **CaraCore PDV (Rust + Tauri 2)** — Linha desktop piloto Windows, instaladores pt-BR, release **v0.1.4**; download na loja pdv-rust.caracore.com.br (artefatos no GitHub, tag v0.1.4); coexiste com o PDV Desktop Java (não substitui)
3. **Ink Agenda** — Gestão para estúdios de tatuagem; Desktop Windows **v2.0.0** (26/Jun/2026); PWA em roadmap (**não antes de 2028**; Mac, Linux, Android; sem DMG/DEB)
4. **chmulatoETE Minerador 4.0** — Simulador ETE/hidrometalurgia para **Ensino Médio** e mineração (upgrade Ouro 4.0 R$ 29,90)
5. **Reino OIDC** — Educação em OAuth 2.1 e OIDC
6. **CaraCore Seed** — Aplicativo local complementar para gestão de clientes e licenças; piloto público gratuito sob MIT, sem convite. Pré-release candidata Windows x64 `0.1.5` para avaliação; `0.1.4` é a release estável anterior. Instalador unsigned, 216.466.586 bytes, SHA-256 `e449ca2cee74fda135ac098d2333fe674c2c476773a7d4adb60bc016a767db16`; homologação independente pendente, Linux fora desta etapa. API protegida, porta dinâmica, Swagger UI local sem CDN, heartbeat em UTC do servidor e migração V8 compatível com bancos 0.1.3/0.1.4. Cada produto mantém seu próprio aplicativo e banco.
7. **Circuito Ferradura** — Produto educacional em evolução para lógica, ábaco romano e Python; uso pessoal gratuito e conversa institucional para escolas
8. **Cara Core Hub** — Gestão logística interna para pontos de retirada (PUDOs), com encomendas de ML, Shopee e Temu; oficina web WAR/Tomcat 2.1; pré-release Windows **v2.1.0-rc1.2** para avaliação em hub.caracore.com.br (instalador e ZIP, sem assinatura); GA do instalador Windows **06/Abr/2027**. Não é orquestrador interno nem Python/Flask.
9. **Área 51** — Consultoria OIDC / autenticação enterprise
10. **Helianto Condominium** — Administração condominial com soberania de dados e motor financeiro auditável (loja helianto.caracore.com.br; lançamento 30/Dez/2029)
11. **CaraCore CSO** — Duas aplicações, uma solução: Frotas Web disponível em cso.caracore.com.br, sem GPS hoje; Transportes Desktop + Virtual Tracker integrado em desenvolvimento, com alvo conjunto em **08/11/2028**, sujeito à prova móvel, capacidade e homologação. Não é terceiro produto. Frotas encaminhará conteúdo cifrado sem ler ou persistir trajetos; mapa, histórico e chave privada somente no desktop, sem fila offline. A loja cso-transp.caracore.com.br apresenta a proposta sem contratação antecipada. Planejamento: 10 sprints locais estimadas + 21 tarefas INT em 6 etapas (0/21); total de sprints a fechar em INT-03. Alinhamento: [hub CSO](docs/projeto-cso.html). Atualização local de copy não confirma deploy.
12. **BioReator 4.0** — Estação de bioinsumos (loja ru.caracore.com.br; Community 1.1.1 publicada em 13/Out/2026; Premium em 18/Jun/2027, sem preço e sem PIX)
13. **Cara Core MKT** — Vitrine gratuita e Sala Cara Core (mkt.caracore.com.br · tools.caracore.com.br/sala/); não vendemos

## Design Responsivo

O Wiki foi desenvolvido com foco em **responsividade total**:

- **Desktop** - Layout com sidebar fixa
- **Tablet** - Menu colapsável, conteúdo adaptado
- **Celular** - Interface otimizada para touch
- **Celular pequeno** - Layout minimalista

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos com variáveis CSS
- **JavaScript** - Interatividade e navegação
- **Bootstrap 5.3.3** - Framework CSS (arquivos em `docs/assets/vendor/`, sem CDN externa)
- **Bootstrap Icons** - Iconografia consistente (mesmo pacote local)

## Estrutura de Arquivos

```text
wiki/
├── index.html              # Página principal
├── guia-estagiario.html    # Guia para novos estagiários
├── assets/
│   ├── wiki.css            # Estilos responsivos principais
│   └── wiki.js             # JavaScript para interatividade
└── [outras páginas...]     # Páginas específicas de projetos
```

## Migração Realizada

### Antes (Área 51 Wiki)

- Localização: `D:\dev\site\cara-core\area51\wiki\`
- Foco: Documentação técnica apenas do projeto Área 51
- Público: Desenvolvedores experientes

### Depois (Wiki Unificado)

- Localização: `D:\dev\site\cara-core\wiki\`
- Foco: **Todos os projetos** (PDV, Ink Agenda, Minerador 4.0, Reino OIDC, Seed, Circuito Ferradura, Hub, Área 51, Helianto) com explicações para leigos e estagiários
- Público: **Estagiários**, colaboradores e interessados em geral

### Links Atualizados

- `index.html` rodapé: `area51/wiki/` → `wiki/`
- `portfolio.html` rodapé: `area51/wiki/` → `wiki/`
- Título atualizado: "Wiki Técnico - Guia para Estagiários e Colaboradores"

## Características do Design

### Paleta de Cores por Projeto

- **CaraCore Hub**: Gradiente azul-verde (`#43cea2` → `#185a9d`)
- **CaraCore Seed**: Gradiente laranja-amarelo (`#f7971e` → `#ffd200`)
- **Reino OIDC**: Gradiente roxo-rosa (`#8f6ed5` → `#d084c9`)
- **Área 51**: Gradiente azul-roxo (`#667eea` → `#764ba2`)
- **Circuito Ferradura**: Gradiente verde (`#2E8B57` → `#228B22`)

### Seções Especiais

- **Leigos**: Fundo azul claro com explicações simples
- **Estagiários**: Fundo roxo claro com orientações técnicas
- **Alertas por Nível**: Iniciante (verde), Intermediário (amarelo), Avançado (vermelho)

## Funcionalidades JavaScript

- **Navegação ativa** - Destaca página atual no menu
- **Busca interna** - Filtra conteúdo em tempo real
- **Animações suaves** - Fade-in para cards e elementos
- **Smooth scroll** - Navegação suave para âncoras
- **Menu responsivo** - Colapsa automaticamente em mobile
- **Lazy loading** - Carregamento otimizado de imagens

## Público-Alvo

### Para Pessoas Leigas

- Explicações usando **analogias do cotidiano**
- **Linguagem acessível** sem jargões técnicos
- **Exemplos práticos** de como os sistemas funcionam

### Para Estagiários

- **Guias passo a passo** para configuração de ambiente
- **Orientações técnicas** específicas por projeto
- **Práticas de desenvolvimento** da empresa
- **Primeiros passos** na contribuição para projetos

### Para Desenvolvedores

- **Documentação técnica** detalhada
- **Stack tecnológico** de cada projeto
- **APIs e integrações** disponíveis

## Suporte e Contato

Para estagiários ou dúvidas sobre o Wiki:

- **Email**: [suporte@caracore.com.br]
- **Wiki publicada**: [wiki.caracore.com.br](https://wiki.caracore.com.br/)

---

**© 2026 Cara Core Informática - CNPJ: 23.969.028/0001-37**  
*Wiki criado para orientação de estagiários e divulgação técnica*
