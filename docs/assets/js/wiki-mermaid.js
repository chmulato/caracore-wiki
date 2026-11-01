/**
 * Inicialização Mermaid para páginas do wiki Área 51.
 */
(function () {
    function isDark() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function render() {
        if (typeof mermaid === 'undefined') return;
        const nodes = Array.from(document.querySelectorAll('.mermaid'));
        if (!nodes.length) return;

        nodes.forEach(node => {
            if (!node.dataset.src) node.dataset.src = node.textContent;
            node.removeAttribute('data-processed');
            node.textContent = node.dataset.src;
        });

        mermaid.initialize({
            startOnLoad: false,
            theme: isDark() ? 'dark' : 'neutral',
            securityLevel: 'strict',
            sequence: { useMaxWidth: true, wrap: true },
            flowchart: { useMaxWidth: true, htmlLabels: true },
        });

        mermaid.run({ nodes }).catch(() => {});
    }

    document.addEventListener('DOMContentLoaded', render);
    window.addEventListener('themechange', render);
})();
