/**
 * Inicialização Mermaid para páginas do wiki Área 51.
 */
document.addEventListener("DOMContentLoaded", function () {
    if (typeof mermaid === "undefined") return;
    mermaid.initialize({
        startOnLoad: true,
        theme: "neutral",
        securityLevel: "strict",
        sequence: { useMaxWidth: true, wrap: true },
        flowchart: { useMaxWidth: true, htmlLabels: true },
    });
});
