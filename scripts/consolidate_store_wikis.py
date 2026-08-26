#!/usr/bin/env python3
"""Consolidate store wikis into wiki.caracore.com.br and leave redirects behind."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(r"D:\onedrive\dev")
WIKI = ROOT / "caracore-wiki" / "docs"
PORTAL = "https://wiki.caracore.com.br"

REDIRECT_TMPL = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Wiki movida para wiki.caracore.com.br</title>
  <meta http-equiv="refresh" content="0; url={target}">
  <link rel="canonical" href="{target}">
  <script>window.location.replace({target_js});</script>
</head>
<body>
  <p>A documentação deste produto vive em <a href="{target}">{portal}</a>.</p>
</body>
</html>
"""


def js_str(url: str) -> str:
    return "'" + url.replace("\\", "\\\\").replace("'", "\\'") + "'"


def write_redirect(path: Path, target: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        REDIRECT_TMPL.format(target=target, target_js=js_str(target), portal=PORTAL),
        encoding="utf-8",
        newline="\n",
    )


def rewrite_copied(text: str, store_origin: str, depth: int = 1) -> str:
    prefix = "../" * depth
    text = text.replace(f'href="{prefix}index.html"', f'href="{store_origin}/"')
    text = text.replace(f'href="{prefix}download.html"', f'href="{store_origin}/download.html"')
    text = text.replace(f'href="{prefix}canal-feedback.html"', f'href="{store_origin}/canal-feedback.html"')
    text = text.replace(f'src="{prefix}assets/', f'src="{store_origin}/assets/')
    text = text.replace(f'href="{prefix}assets/', f'href="{store_origin}/assets/')
    text = text.replace('href="/assets/', f'href="{store_origin}/assets/')
    text = text.replace('src="/assets/', f'src="{store_origin}/assets/')
    text = text.replace("Wiki da loja", "Wiki Cara Core")
    text = text.replace("Wiki da aplicação", "Wiki Cara Core")
    return text


def copy_html_dir(src: Path, dest: Path, store_origin: str, skip_names: set[str] | None = None) -> list[str]:
    skip_names = skip_names or set()
    copied: list[str] = []
    dest.mkdir(parents=True, exist_ok=True)
    for src_file in src.rglob("*.html"):
        rel = src_file.relative_to(src)
        if "assets" in rel.parts or src_file.name in skip_names:
            continue
        dest_file = dest / rel
        dest_file.parent.mkdir(parents=True, exist_ok=True)
        depth = 1 + len(rel.parts) - 1
        text = src_file.read_text(encoding="utf-8")
        dest_file.write_text(rewrite_copied(text, store_origin, depth=max(1, depth)), encoding="utf-8", newline="\n")
        copied.append(str(rel).replace("\\", "/"))
    return copied


def replace_in_store_docs(store_docs: Path, pairs: list[tuple[str, str]]) -> int:
    n = 0
    for html in store_docs.rglob("*.html"):
        if "wiki" in html.parts:
            continue
        raw = html.read_text(encoding="utf-8")
        new = raw
        for old, repl in pairs:
            new = new.replace(old, repl)
        if new != raw:
            html.write_text(new, encoding="utf-8", newline="\n")
            n += 1
    return n


def main() -> None:
    pdv_copied = copy_html_dir(
        ROOT / "caracore-pdv-releases" / "docs" / "wiki",
        WIKI / "pdv",
        "https://pdv.caracore.com.br",
        skip_names={"projeto-pdv.html"},
    )
    print("copied pdv manuals", pdv_copied)

    circuito_copied = copy_html_dir(
        ROOT / "caracore-circuito-releases" / "docs" / "wiki",
        WIKI / "circuito",
        "https://circuito.caracore.com.br",
        skip_names={"index.html", "projeto-python.html"},
    )
    print("copied circuito", circuito_copied)

    area51_copied = copy_html_dir(
        ROOT / "caracore-area51-releases" / "docs" / "wiki",
        WIKI / "area51",
        "https://area51.caracore.com.br",
        skip_names={"index.html", "projeto-area51.html"},
    )
    print("copied area51", area51_copied)

    stores = [
        ("caracore-ink-releases", "https://wiki.caracore.com.br/projeto-ink.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-ink.html",
            "projeto-ink.html": "https://wiki.caracore.com.br/projeto-ink.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-ink.html"),
            ("wiki/projeto-ink.html", "https://wiki.caracore.com.br/projeto-ink.html"),
        ]),
        ("caracore-ete-releases", "https://wiki.caracore.com.br/projeto-minerador.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-minerador.html",
            "projeto-minerador.html": "https://wiki.caracore.com.br/projeto-minerador.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-minerador.html"),
            ("wiki/projeto-minerador.html", "https://wiki.caracore.com.br/projeto-minerador.html"),
        ]),
        ("caracore-oidc-releases", "https://wiki.caracore.com.br/projeto-reino.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-reino.html",
            "projeto-reino.html": "https://wiki.caracore.com.br/projeto-reino.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-reino.html"),
            ("wiki/projeto-reino.html", "https://wiki.caracore.com.br/projeto-reino.html"),
        ]),
        ("caracore-seed-releases", "https://wiki.caracore.com.br/projeto-seed.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-seed.html",
            "projeto-seed.html": "https://wiki.caracore.com.br/projeto-seed.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-seed.html"),
            ("wiki/projeto-seed.html", "https://wiki.caracore.com.br/projeto-seed.html"),
        ]),
        ("caracore-hub-releases", "https://wiki.caracore.com.br/projeto-hub.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-hub.html",
            "projeto-hub.html": "https://wiki.caracore.com.br/projeto-hub.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-hub.html"),
            ("wiki/projeto-hub.html", "https://wiki.caracore.com.br/projeto-hub.html"),
        ]),
        ("caracore-helianto-releases", "https://wiki.caracore.com.br/projeto-helianto.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-helianto.html",
            "projeto-helianto.html": "https://wiki.caracore.com.br/projeto-helianto.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-helianto.html"),
            ("wiki/projeto-helianto.html", "https://wiki.caracore.com.br/projeto-helianto.html"),
        ]),
        ("caracore-ru-releases", "https://wiki.caracore.com.br/projeto-ru.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-ru.html",
            "projeto-ru.html": "https://wiki.caracore.com.br/projeto-ru.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-ru.html"),
            ("wiki/projeto-ru.html", "https://wiki.caracore.com.br/projeto-ru.html"),
        ]),
        ("caracore-cso-releases", "https://wiki.caracore.com.br/projeto-cso.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-cso.html",
            "projeto-cso.html": "https://wiki.caracore.com.br/projeto-cso.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-cso.html"),
            ("wiki/projeto-cso.html", "https://wiki.caracore.com.br/projeto-cso.html"),
        ]),
        ("caracore-pdv-rust-releases", "https://wiki.caracore.com.br/projeto-pdv-rust.html", {
            "index.html": "https://wiki.caracore.com.br/projeto-pdv-rust.html",
            "projeto-pdv.html": "https://wiki.caracore.com.br/projeto-pdv-rust.html",
        }, [
            ("wiki/index.html", "https://wiki.caracore.com.br/projeto-pdv-rust.html"),
            ("wiki/projeto-pdv.html", "https://wiki.caracore.com.br/projeto-pdv-rust.html"),
            ("../wiki/index.html", "https://wiki.caracore.com.br/projeto-pdv-rust.html"),
        ]),
    ]

    for repo, default_target, file_map, nav_pairs in stores:
        wiki_dir = ROOT / repo / "docs" / "wiki"
        if not wiki_dir.exists():
            print("skip missing", wiki_dir)
            continue
        for html in wiki_dir.rglob("*.html"):
            if "assets" in html.parts:
                continue
            rel = html.relative_to(wiki_dir).as_posix()
            target = file_map.get(rel, default_target)
            write_redirect(html, target)
            print("redirect", repo, rel, "->", target)
        docs = ROOT / repo / "docs"
        if docs.exists():
            n = replace_in_store_docs(docs, nav_pairs)
            print("nav updates", repo, n)

    # Circuito extras
    circ_wiki = ROOT / "caracore-circuito-releases" / "docs" / "wiki"
    circ_map = {
        "index.html": "https://wiki.caracore.com.br/projeto-python.html",
        "projeto-python.html": "https://wiki.caracore.com.br/projeto-python.html",
        "faq.html": "https://wiki.caracore.com.br/circuito/faq.html",
        "roteiro-pedagogico.html": "https://wiki.caracore.com.br/circuito/roteiro-pedagogico.html",
        "entregas.html": "https://wiki.caracore.com.br/circuito/entregas.html",
    }
    for html in circ_wiki.rglob("*.html"):
        if "assets" in html.parts:
            continue
        rel = html.relative_to(circ_wiki).as_posix()
        write_redirect(html, circ_map.get(rel, "https://wiki.caracore.com.br/projeto-python.html"))
        print("redirect circuito", rel)
    replace_in_store_docs(ROOT / "caracore-circuito-releases" / "docs", [
        ("wiki/index.html", "https://wiki.caracore.com.br/projeto-python.html"),
        ("wiki/projeto-python.html", "https://wiki.caracore.com.br/projeto-python.html"),
    ])

    # Area51 extras
    a51_wiki = ROOT / "caracore-area51-releases" / "docs" / "wiki"
    for html in a51_wiki.rglob("*.html"):
        if "assets" in html.parts:
            continue
        rel = html.relative_to(a51_wiki).as_posix()
        if rel in ("index.html", "projeto-area51.html"):
            target = "https://wiki.caracore.com.br/projeto-area51.html"
        else:
            target = f"https://wiki.caracore.com.br/area51/{Path(rel).name}"
        write_redirect(html, target)
        print("redirect area51", rel, "->", target)
    replace_in_store_docs(ROOT / "caracore-area51-releases" / "docs", [
        ("wiki/index.html", "https://wiki.caracore.com.br/projeto-area51.html"),
        ("wiki/projeto-area51.html", "https://wiki.caracore.com.br/projeto-area51.html"),
    ])

    # PDV Java
    pdv_wiki = ROOT / "caracore-pdv-releases" / "docs" / "wiki"
    for html in pdv_wiki.rglob("*.html"):
        if "assets" in html.parts:
            continue
        rel = html.relative_to(pdv_wiki).as_posix()
        if rel == "projeto-pdv.html":
            target = "https://wiki.caracore.com.br/projeto-pdv.html"
        else:
            target = f"https://wiki.caracore.com.br/pdv/{rel}"
        write_redirect(html, target)
        print("redirect pdv", rel, "->", target)
    pdv_wiki_html = ROOT / "caracore-pdv-releases" / "docs" / "wiki.html"
    if pdv_wiki_html.exists():
        write_redirect(pdv_wiki_html, "https://wiki.caracore.com.br/projeto-pdv.html")
        print("redirect pdv wiki.html")
    replace_in_store_docs(ROOT / "caracore-pdv-releases" / "docs", [
        ("wiki/index.html", "https://wiki.caracore.com.br/pdv/index.html"),
        ("wiki/projeto-pdv.html", "https://wiki.caracore.com.br/projeto-pdv.html"),
        ("href=\"wiki.html\"", "href=\"https://wiki.caracore.com.br/projeto-pdv.html\""),
    ])

    print("done")


if __name__ == "__main__":
    main()
