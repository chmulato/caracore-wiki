#!/usr/bin/env python3
"""Gera o manual operacional do Hub em wiki.caracore.com.br/hub/.

Fonte: caracore-hub/project_hub/docs/tutorial/TUTORIAL_CARACORE_HUB_PROFISSIONAL.md
Ajustes de honestidade:
- manual da aplicação web da oficina 2.1 (não é GA Windows 06/04/2027)
- marketplaces vivos: Mercado Livre, Shopee e Temu (sem WooCommerce)
- URL local da oficina: Tomcat :9090
"""
from __future__ import annotations

from pathlib import Path

OUT = Path(r"D:\onedrive\dev\caracore-wiki\docs\hub")

NAV = [
    ("index.html", "bi-map", "Mapa do manual"),
    ("acesso.html", "bi-globe", "Como acessa"),
    ("login.html", "bi-box-arrow-in-right", "Login e sessão"),
    ("dashboard.html", "bi-speedometer2", "Dashboard"),
    ("pedidos.html", "bi-receipt", "Pedidos"),
    ("estoque.html", "bi-boxes", "Estoque"),
    ("admin.html", "bi-shield-lock", "Administração"),
    ("casos-de-uso.html", "bi-list-check", "Casos de uso"),
    ("dicas.html", "bi-lightning", "Dicas"),
    ("troubleshooting.html", "bi-wrench", "Problemas comuns"),
]

BANNER = """
          <div class="alert alert-warning" role="note">
            <i class="bi bi-cone-striped"></i>
            <strong>Oficina, não oferta madura.</strong> Este manual descreve a aplicação
            <strong>web</strong> da oficina (versão <strong>2.1</strong>, WAR/Tomcat).
            Não há SaaS público do Hub nem instalador Windows em oferta.
            O calendário oficial do instalador com SQLite é <strong>06 de abril de 2027</strong>.
            Conectores vivos no código: Mercado Livre, Shopee e Temu.
          </div>
"""


def nav_html(active: str) -> str:
    items = []
    for href, icon, label in NAV:
        cls = ' class="active"' if href == active else ""
        items.append(f'            <li><a href="{href}"{cls}><i class="bi {icon}"></i> {label}</a></li>')
    return "\n".join(items)


def page(filename: str, title: str, description: str, heading: str, lede: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Wiki Cara Core</title>
  <meta name="description" content="{description}">
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../assets/vendor/bootstrap-icons/bootstrap-icons.min.css">
  <link rel="stylesheet" href="../assets/css/wiki.css">
  <link rel="stylesheet" href="../assets/css/wiki-unified.css">
  <link rel="stylesheet" href="../assets/css/wiki-institutional.css">
  <link rel="icon" href="../assets/favicon.ico" type="image/x-icon">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark wiki-nav">
    <div class="container">
      <a class="navbar-brand" href="../index.html"><i class="bi bi-journal-code"></i> Wiki Cara Core</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarWiki" aria-label="Alternar navegação">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarWiki">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="https://www.caracore.com.br/"><i class="bi bi-house"></i> Site Principal</a></li>
          <li class="nav-item"><a class="nav-link" href="../projeto-hub.html"><i class="bi bi-box-seam"></i> Hub do produto</a></li>
          <li class="nav-item"><a class="nav-link" href="https://hub.caracore.com.br/" target="_blank" rel="noopener"><i class="bi bi-shop"></i> Loja</a></li>
          <li class="nav-item">
            <button class="btn theme-toggle-btn" id="theme-toggle" aria-label="Alternar tema" title="Alternar tema">
              <i class="bi bi-moon-stars-fill"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="wiki-breadcrumb">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><a href="../index.html">Wiki Home</a></li>
          <li class="breadcrumb-item"><a href="../projeto-hub.html">CaraCore Hub</a></li>
          <li class="breadcrumb-item active">{heading}</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="wiki-container">
    <div class="row">
      <div class="col-lg-3 col-md-4">
        <div class="wiki-sidebar">
          <h4><i class="bi bi-list-ul"></i> Manual do Hub</h4>
          <ul class="wiki-menu">
            <li><a href="../projeto-hub.html"><i class="bi bi-box-seam"></i> O que é o produto</a></li>
{nav_html(filename)}
          </ul>
        </div>
      </div>
      <div class="col-lg-9 col-md-8">
        <div class="wiki-content wiki-home">
          <div class="wiki-header">
            <h1><i class="bi bi-box-seam"></i> {heading}</h1>
            <p class="wiki-lede">{lede}</p>
          </div>
{BANNER}
{body}
          <div class="text-center mb-4 d-flex flex-wrap justify-content-center gap-2">
            <a href="../projeto-hub.html" class="btn-wiki"><i class="bi bi-box-seam"></i> Hub do produto</a>
            <a href="https://hub.caracore.com.br/" class="btn-wiki" target="_blank" rel="noopener"><i class="bi bi-shop"></i> Loja</a>
            <a href="https://hub.caracore.com.br/canal-feedback.html" class="btn-wiki" target="_blank" rel="noopener"><i class="bi bi-chat-dots"></i> Canal de feedback</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="wiki-footer">
    <div class="container">
      <p>&copy; 2026 Cara Core Informática - CNPJ: 23.969.028/0001-37</p>
      <p>Manual extraído da oficina <code>caracore-hub</code> — aplicação web 2.1. GA do instalador Windows: 06/04/2027.</p>
    </div>
  </footer>

  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/theme-toggle.js"></script>
  <script src="../assets/js/wiki.js"></script>
</body>
</html>
"""


PAGES: dict[str, tuple[str, str, str, str, str]] = {}

PAGES["index.html"] = (
    "Manual operacional — CaraCore Hub",
    "Como usar a aplicação web do CaraCore Hub na oficina: login, pedidos, estoque, administração e problemas comuns.",
    "Manual operacional",
    "Como a aplicação web da oficina se usa no dia a dia: pedidos, estoque, conferência e administração. Extraído do tutorial interno da oficina.",
    """
          <section class="mb-5">
            <h2>O que este manual cobre</h2>
            <p>O CaraCore Hub junta pedidos de Mercado Livre, Shopee e Temu numa fila só, localiza o volume no estoque e confere a retirada. Os perfis são <strong>ADMIN</strong>, <strong>SUPERVISOR</strong> e <strong>OPERADOR</strong>.</p>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="project-card h-100">
                  <div class="project-body">
                    <h3 class="h5">Começar</h3>
                    <ul class="feature-list">
                      <li><a href="acesso.html">Como a aplicação sobe e como se acessa</a></li>
                      <li><a href="login.html">Login, senha e sessão</a></li>
                      <li><a href="dashboard.html">Dashboard depois do login</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="project-card h-100">
                  <div class="project-body">
                    <h3 class="h5">Operar</h3>
                    <ul class="feature-list">
                      <li><a href="pedidos.html">Lista, detalhe e triagem de pedidos</a></li>
                      <li><a href="estoque.html">Mapa, etiquetas, recebimento e inventário</a></li>
                      <li><a href="casos-de-uso.html">Três fluxos completos</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="project-card h-100">
                  <div class="project-body">
                    <h3 class="h5">Administrar</h3>
                    <ul class="feature-list">
                      <li><a href="admin.html">Usuários, métricas, relatórios e conectores</a></li>
                      <li><a href="dicas.html">Atalhos e alertas</a></li>
                      <li><a href="troubleshooting.html">Problemas comuns</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="project-card h-100">
                  <div class="project-body">
                    <h3 class="h5">Alinhamento</h3>
                    <ul class="feature-list">
                      <li><a href="../projeto-hub.html">O que o produto é (e não é)</a></li>
                      <li>Tia Sócia é pitch, não o nome do produto</li>
                      <li>Não misturar com Área 51 (Python/Flask)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
""",
)

PAGES["acesso.html"] = (
    "Como acessar o CaraCore Hub",
    "A aplicação web da oficina abre no navegador. URL local típica no Tomcat da oficina.",
    "Como acessa",
    "É uma aplicação web no navegador. Na oficina sobe com Docker/Tomcat. No destino público de 2027, as mesmas telas entram no instalador Windows.",
    """
          <section class="mb-5">
            <h2>Tipo de plataforma</h2>
            <p>Na oficina, você abre o navegador, entra na URL, autentica e opera. Os dados ficam no servidor da instalação (PostgreSQL hoje; SQLite no instalador de 2027). Toda ação relevante entra na auditoria.</p>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead><tr><th>Requisito</th><th>O que precisa</th></tr></thead>
                <tbody>
                  <tr><td>Navegador</td><td>Chrome, Firefox, Edge ou Safari recente</td></tr>
                  <tr><td>Credenciais</td><td>Usuário e senha dados pelo ADMIN</td></tr>
                  <tr><td>Permissão</td><td>Perfil ADMIN, SUPERVISOR ou OPERADOR</td></tr>
                  <tr><td>Oficina local</td><td>Docker + Tomcat; URL típica abaixo</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="mb-5">
            <h2>URL da oficina</h2>
            <p>O administrador da instalação informa a URL. Na oficina, o Tomcat costuma servir:</p>
            <pre class="p-3 bg-light border rounded"><code>http://localhost:9090/caracore-hub
http://&lt;ip-da-maquina&gt;:9090/caracore-hub</code></pre>
            <p>Não invente um domínio público de produção: o Hub <strong>não</strong> está em SaaS aberto. A vitrine comercial é <a href="https://hub.caracore.com.br/" target="_blank" rel="noopener">hub.caracore.com.br</a>.</p>
          </section>
          <section class="mb-5">
            <h2>Antes de entrar</h2>
            <ol>
              <li>Confirme a URL com quem administra a instalação</li>
              <li>Confirme usuário e senha (não use senhas de desenvolvimento em produção)</li>
              <li>Se a página não abrir, veja <a href="troubleshooting.html">problemas comuns</a></li>
            </ol>
          </section>
""",
)

PAGES["login.html"] = (
    "Login e sessão — CaraCore Hub",
    "Como entrar, recuperar senha, perfil e logout na aplicação web do Hub.",
    "Login e sessão",
    "A primeira tela pede usuário e senha. Sessão inativa cai; o ADMIN redefine acesso quando preciso.",
    """
          <section class="mb-5">
            <h2>Tela de autenticação</h2>
            <ul class="feature-list">
              <li>Campo de e-mail ou nome de usuário</li>
              <li>Campo de senha</li>
              <li>Botão Entrar</li>
              <li>Link Esqueceu a senha?</li>
            </ul>
            <h3 class="h5 mt-4">Procedimento</h3>
            <ol>
              <li>Digite o usuário</li>
              <li>Digite a senha</li>
              <li>Clique em Entrar</li>
              <li>Aguarde o redirecionamento para o dashboard</li>
            </ol>
          </section>
          <section class="mb-5">
            <h2>Recuperação de senha</h2>
            <ol>
              <li>Clique em Esqueceu a senha?</li>
              <li>Informe o e-mail cadastrado</li>
              <li>Abra o link enviado por e-mail</li>
              <li>Defina a nova senha e entre de novo</li>
            </ol>
            <p>Se o e-mail não chegar, o ADMIN pode resetar a senha em Administração → Usuários.</p>
          </section>
          <section class="mb-5">
            <h2>Sessão, perfil e saída</h2>
            <ul class="feature-list">
              <li>Sessão ativa enquanto você usa o sistema</li>
              <li>Inatividade prolongada encerra a sessão (cerca de 30 minutos)</li>
              <li>Perfil: dados pessoais e permissões do seu papel</li>
              <li>Logout: use Sair no menu superior e confirme</li>
            </ul>
          </section>
""",
)

PAGES["dashboard.html"] = (
    "Dashboard — CaraCore Hub",
    "A sala de controle depois do login: métricas, atalhos, alertas e status dos conectores.",
    "Dashboard",
    "Depois do login, o dashboard mostra o que precisa de ação: pedidos pendentes, estoque, alertas e conectores.",
    """
          <section class="mb-5">
            <h2>O que aparece</h2>
            <div class="row g-4">
              <div class="col-md-6">
                <h3 class="h5">Cards de métricas</h3>
                <ul class="feature-list">
                  <li>Pedidos pendentes</li>
                  <li>Itens em estoque</li>
                  <li>Usuários ativos</li>
                  <li>Alertas críticos</li>
                </ul>
              </div>
              <div class="col-md-6">
                <h3 class="h5">Ações rápidas</h3>
                <ul class="feature-list">
                  <li>Buscar pedido (também por QR)</li>
                  <li>Buscar produto no estoque</li>
                  <li>Gerar etiquetas</li>
                  <li>Ver ocupação e relatórios</li>
                </ul>
              </div>
            </div>
          </section>
          <section class="mb-5">
            <h2>Alertas e conectores</h2>
            <p>Priorize o que o dashboard marca: pedido atrasado, estoque abaixo do mínimo, erro de conector, armazém perto do limite.</p>
            <p>Status dos conectores vivos: <strong>Mercado Livre</strong>, <strong>Shopee</strong> e <strong>Temu</strong>. Não trate Amazon ou WooCommerce como conector pronto.</p>
            <h3 class="h5 mt-4">Como usar</h3>
            <ol>
              <li>Leia as métricas para o panorama do turno</li>
              <li>Trate os alertas primeiro</li>
              <li>Use as ações rápidas em vez de caçar menus</li>
              <li>Confira se os três conectores estão verdes</li>
            </ol>
          </section>
""",
)

PAGES["pedidos.html"] = (
    "Gestão de pedidos — CaraCore Hub",
    "Lista, filtros, detalhe, triagem e alocação de pedidos no Hub.",
    "Pedidos",
    "Localize o pedido, veja os itens e avance o status até a expedição. A origem típica é um marketplace.",
    """
          <section class="mb-5">
            <h2>Lista e busca</h2>
            <p>Menu: <strong>Pedidos → Lista de Pedidos</strong>, ou o atalho no dashboard.</p>
            <ol>
              <li>Digite ID, cliente ou referência (o leitor de QR preenche o campo)</li>
              <li>Filtre por status, data ou marketplace</li>
              <li>Use a paginação quando o volume for grande</li>
            </ol>
            <p>A lista mostra ID, cliente, status, data, valor, origem e um histórico resumido.</p>
          </section>
          <section class="mb-5">
            <h2>Detalhe do pedido</h2>
            <p>Clique no pedido. O painel traz cliente e endereços, itens, linha do tempo, rastreio e notas internas.</p>
            <p>Ações, conforme o perfil: atualizar status (Separando, Pronto, Enviado), imprimir etiqueta, registrar ajuste, reabrir ou cancelar.</p>
          </section>
          <section class="mb-5">
            <h2>Triagem e alocação</h2>
            <ol>
              <li>Filtre por prioridade ou SLA</li>
              <li>Defina responsável ou estação</li>
              <li>Atualize o status operacional</li>
              <li>Registre observação se houver bloqueio</li>
            </ol>
            <p>Fluxo completo de um pedido de marketplace: <a href="casos-de-uso.html">casos de uso</a>.</p>
          </section>
""",
)

PAGES["estoque.html"] = (
    "Controle de estoque — CaraCore Hub",
    "Painel, busca, etiquetas, ocupação, mapa, recebimento, retirada e inventário cíclico.",
    "Estoque",
    "O estoque tem posição (rua, módulo, nível, caixa), etiqueta e conferência. Inventário cíclico compara físico e digital.",
    """
          <section class="mb-5">
            <h2>Painel</h2>
            <p>Menu: <strong>Estoque → Painel</strong>. Estatísticas típicas: total de SKUs, ocupação, itens críticos e movimentações do dia. A busca aceita nome, SKU, código de barras ou fornecedor.</p>
          </section>
          <section class="mb-5">
            <h2>Buscar e detalhar produto</h2>
            <p>Menu: <strong>Estoque → Buscar</strong>. Filtros: categoria, fornecedor, status (em estoque, crítico, descontinuado).</p>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead><tr><th>Campo</th><th>Significado</th></tr></thead>
                <tbody>
                  <tr><td>Posição</td><td>Local no armazém (ex.: C2-15)</td></tr>
                  <tr><td>Total / disponível / reservada</td><td>Físico, livre para venda e comprometido em pedido</td></tr>
                  <tr><td>Mínimo</td><td>Ponto de alerta para repor</td></tr>
                </tbody>
              </table>
            </div>
            <p>No detalhe: movimentar (entrada, saída, transferência), editar, imprimir e gerar QR.</p>
          </section>
          <section class="mb-5">
            <h2>Etiquetas</h2>
            <p>Menu: <strong>Estoque → Etiquetas</strong>. Escolha os produtos, código de barras ou QR, tamanho e quantidade, gere e imprima. A etiqueta traz código, nome, SKU e, se configurado, preço e validade.</p>
          </section>
          <section class="mb-5">
            <h2>Ocupação e mapa</h2>
            <p>Ocupação mostra percentual por setor e recomendações (corredor cheio × corredor ocioso). O mapa destaca a posição do SKU na busca e usa cor para vazio / parcial / cheio. Use isso para picking e para decidir onde guardar entrada nova.</p>
          </section>
          <section class="mb-5">
            <h2>Recebimento, retirada e inventário</h2>
            <ul class="feature-list">
              <li><strong>Recebimento:</strong> nota, volumes, conferência, etiqueta e saldo</li>
              <li><strong>Retirada:</strong> pedido ou requisição interna, checklist e despacho</li>
              <li><strong>Inventário:</strong> contar uma área, ler o código, comparar com o digital, ajustar e fechar o relatório</li>
            </ul>
          </section>
""",
)

PAGES["admin.html"] = (
    "Administração — CaraCore Hub",
    "Usuários RBAC, métricas, relatórios, conectores ML/Shopee/Temu e auditoria LGPD.",
    "Administração",
    "Área do ADMIN (e, em parte, do SUPERVISOR): gente, números, conectores e trilha de auditoria.",
    """
          <section class="mb-5">
            <h2>Usuários e perfis</h2>
            <p>Menu: <strong>Administração → Usuários</strong> (ADMIN). Criar, editar, desativar, resetar senha e ver histórico de acesso.</p>
            <ul class="feature-list">
              <li><strong>ADMIN</strong> — acesso total, gerencia usuários e configurações</li>
              <li><strong>SUPERVISOR</strong> — operação e relatórios; não gerencia usuários</li>
              <li><strong>OPERADOR</strong> — busca, separação e dia a dia; sem relatórios nem usuários</li>
            </ul>
            <p>Novo usuário: nome, e-mail, senha temporária e perfil. Na primeira entrada, o sistema pede troca de senha.</p>
          </section>
          <section class="mb-5">
            <h2>Métricas e relatórios</h2>
            <p>Métricas: volume e tempo de pedido, giro de estoque, ocupação, taxa de erro, produtividade por operador. Gráficos Chart.js e exportação Excel, PDF ou CSV.</p>
            <p>Relatórios: pedidos, estoque, auditoria, financeiro e operacional. Escolha período, filtros (cliente, operador, marketplace) e formato. Agendamento por e-mail existe na oficina quando configurado.</p>
          </section>
          <section class="mb-5">
            <h2>Conectores</h2>
            <p>Menu: <strong>Administração → Integrações</strong>. Conectores vivos: <strong>Mercado Livre</strong> (webhook HMAC e worker), <strong>Shopee</strong> e <strong>Temu</strong>. Não venda Amazon nem WooCommerce como prontos.</p>
            <ol>
              <li>Clique em Conectar no marketplace</li>
              <li>Autorize a conta na plataforma</li>
              <li>Mapeie SKU e status</li>
              <li>Faça um pedido de teste e confira se chega na fila</li>
            </ol>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead><tr><th>Status</th><th>Significado</th></tr></thead>
                <tbody>
                  <tr><td>Conectado</td><td>Ativo</td></tr>
                  <tr><td>Sincronizando</td><td>Operação em andamento</td></tr>
                  <tr><td>Erro</td><td>Falhou — reconecte ou veja eventos</td></tr>
                  <tr><td>Desconectado</td><td>Inativo</td></tr>
                </tbody>
              </table>
            </div>
            <p>WhatsApp (Evolution API) avisa atraso quando o canal está configurado.</p>
          </section>
          <section class="mb-5">
            <h2>Auditoria</h2>
            <p>Menu: <strong>Administração → Auditoria</strong>. Registro de quem fez o quê, quando, em qual registro e o que mudou. Filtre por usuário, data ou tipo (criação, edição, exclusão, login). Exporte para análise externa. Serve para disputa, conformidade LGPD e erro operacional.</p>
          </section>
""",
)

PAGES["casos-de-uso.html"] = (
    "Casos de uso — CaraCore Hub",
    "Três fluxos: receber mercadoria, processar pedido do Mercado Livre e fazer inventário.",
    "Casos de uso",
    "Três rotinas completas da operação. Use como treino de turno, não como promessa de SaaS público.",
    """
          <section class="mb-5">
            <h2>1. Receber mercadoria do fornecedor</h2>
            <ol>
              <li>Login → <strong>Estoque → Recebimento</strong> → Novo recebimento</li>
              <li>Fornecedor, data e número da nota</li>
              <li>Para cada item: SKU, quantidade e posição (ex.: C2-15)</li>
              <li>Gere etiquetas se a posição for nova</li>
              <li>Confirmar recebimento — o saldo sobe e o histórico fica registrado</li>
            </ol>
          </section>
          <section class="mb-5">
            <h2>2. Processar pedido do Mercado Livre</h2>
            <ol>
              <li><strong>Pedidos → Lista</strong> — localize por ID, cliente ou data</li>
              <li>Revise itens, quantidades e observação do cliente</li>
              <li>No mapa, confirme o produto com o leitor e marque como separado</li>
              <li>Embalagem e documentos de entrega</li>
              <li>Imprimir etiqueta de envio e transportadora</li>
              <li>Marcar Enviado e registrar rastreio — o conector atualiza o marketplace quando estiver ativo</li>
            </ol>
            <p>O mesmo raciocínio vale para Shopee e Temu: a fila é uma só; muda a origem.</p>
          </section>
          <section class="mb-5">
            <h2>3. Inventário de uma área</h2>
            <ol>
              <li><strong>Estoque → Inventário</strong> → Novo inventário (área/corredor e data de corte)</li>
              <li>Na posição, leia o código e digite a quantidade física</li>
              <li>O sistema marca correto, faltante ou excesso</li>
              <li>Reconte e investigue movimentação não registrada antes de ajustar</li>
              <li>Finalizar contagem gera o relatório de ajustes</li>
            </ol>
          </section>
""",
)

PAGES["dicas.html"] = (
    "Dicas e atalhos — CaraCore Hub",
    "Atalhos de teclado, busca, operação no chão e alertas que pedem ação.",
    "Dicas",
    "Pouca tecla, menos erro de digitação, alerta tratado no começo do turno.",
    """
          <section class="mb-5">
            <h2>Atalhos</h2>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead><tr><th>Tecla</th><th>Ação</th></tr></thead>
                <tbody>
                  <tr><td><kbd>Ctrl</kbd> + <kbd>F</kbd></td><td>Busca</td></tr>
                  <tr><td><kbd>Ctrl</kbd> + <kbd>P</kbd></td><td>Impressão</td></tr>
                  <tr><td><kbd>Ctrl</kbd> + <kbd>E</kbd></td><td>Exportar (onde existir)</td></tr>
                  <tr><td><kbd>Esc</kbd></td><td>Fecha diálogo</td></tr>
                  <tr><td><kbd>/</kbd></td><td>Navegação (onde existir)</td></tr>
                  <tr><td><kbd>?</kbd></td><td>Ajuda contextual (onde existir)</td></tr>
                </tbody>
              </table>
            </div>
            <p>Busca rápida: <code>#PED001</code> para pedido, <code>@CAMI-001</code> para SKU. Filtros em texto, quando a tela oferecer: <code>status:pronto</code>, <code>marketplace:mercadolivre</code>.</p>
          </section>
          <section class="mb-5">
            <h2>Operação</h2>
            <ul class="feature-list">
              <li>Prefira o leitor de QR à digitação no pico do turno</li>
              <li>Guarde os filtros que você mais usa</li>
              <li>Exporte PDF para o time e CSV/Excel para o contador</li>
              <li>ADMIN: olhe a auditoria quando houver disputa de status</li>
            </ul>
          </section>
          <section class="mb-5">
            <h2>Alertas que pedem ação</h2>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead><tr><th>Alerta</th><th>O que fazer</th></tr></thead>
                <tbody>
                  <tr><td>Estoque crítico</td><td>Repor com o fornecedor</td></tr>
                  <tr><td>Pedido atrasado</td><td>Investigar na triagem</td></tr>
                  <tr><td>Capacidade alta</td><td>Reorganizar corredor</td></tr>
                  <tr><td>Erro de integração</td><td>Reconectar o marketplace</td></tr>
                  <tr><td>Falhas de login</td><td>ADMIN investiga o usuário</td></tr>
                </tbody>
              </table>
            </div>
          </section>
""",
)

PAGES["troubleshooting.html"] = (
    "Problemas comuns — CaraCore Hub",
    "Login, lentidão, leitor, gravação, conector, estoque e relatório — o que tentar antes do suporte.",
    "Problemas comuns",
    "Tente estes passos na oficina antes de abrir chamado. Não copie senha de desenvolvimento para produção.",
    """
          <section class="mb-5">
            <h2>Não entra</h2>
            <ol>
              <li>URL exata da instalação (na oficina: Tomcat na porta 9090)</li>
              <li>Usuário e senha; Caps Lock</li>
              <li>Esqueceu a senha? ou reset pelo ADMIN</li>
              <li>Usuário desativado</li>
            </ol>
          </section>
          <section class="mb-5">
            <h2>Lento ou não grava</h2>
            <ul class="feature-list">
              <li>Feche abas, atualize o navegador, limpe o cache (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Delete</kbd>)</li>
              <li>Sessão expirada: entre de novo</li>
              <li>Sem permissão de edição: peça ao ADMIN</li>
            </ul>
          </section>
          <section class="mb-5">
            <h2>Leitor de QR</h2>
            <ol>
              <li>Cabo, outro código de teste, lente limpa</li>
              <li>Como alternativa, busque o SKU à mão</li>
              <li>Etiqueta danificada: gere de novo em Estoque → Etiquetas</li>
            </ol>
          </section>
          <section class="mb-5">
            <h2>Conector ou estoque dessincronizado</h2>
            <ol>
              <li>Administração → Integrações → Reconectar</li>
              <li>Reautorize na plataforma (ML, Shopee ou Temu)</li>
              <li>Confira mapeamento de SKU e status</li>
              <li>Sincronização manual e relatório de discrepância</li>
            </ol>
          </section>
          <section class="mb-5">
            <h2>Relatório não sai</h2>
            <p>Afrouxe período e filtros, gere um recorte menor, aguarde exportação grande. Se persistir, abra o centro de erros (ADMIN) ou o canal de feedback da loja.</p>
          </section>
          <section class="mb-5">
            <h2>Quando falar com a Cara Core</h2>
            <p>Erro que sobrevive a estes passos, dado perdido ou conector crítico parado. Leve: o que aconteceu, como reproduzir, mensagem de erro, usuário, navegador. Canal: <a href="https://hub.caracore.com.br/canal-feedback.html" target="_blank" rel="noopener">hub.caracore.com.br/canal-feedback.html</a> ou <a href="mailto:suporte@caracore.com.br">suporte@caracore.com.br</a>. Horários de suporte PME: página <a href="https://www.caracore.com.br/suporte-local.html" target="_blank" rel="noopener">suporte local</a> da matriz.</p>
          </section>
""",
)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (title, desc, heading, lede, body) in PAGES.items():
        (OUT / name).write_text(
            page(name, title, desc, heading, lede, body),
            encoding="utf-8",
            newline="\n",
        )
        print(f"wrote {name}")


if __name__ == "__main__":
    main()
