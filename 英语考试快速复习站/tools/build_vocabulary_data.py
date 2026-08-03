"""Build the offline vocabulary dataset used by vocabulary.html.

Sources:
- The repository's 4,000-word Markdown vocabulary bank.
- The official 2021 vocational-college English standard PDF, when available.

The output is JavaScript rather than fetched JSON so the learning page also
works when index.html is opened directly from the filesystem.
"""

from __future__ import annotations

import json
import re
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = SITE_ROOT.parent
MARKDOWN_SOURCE = (
    WORKSPACE_ROOT
    / "英语系统入门计划"
    / "04-词汇与词块"
    / "03-扩展识别词库.md"
)
OFFICIAL_PDF = WORKSPACE_ROOT / "tmp" / "pdfs" / "高职专科英语课程标准2021.pdf"
DATA_DIR = SITE_ROOT / "data"
SOURCE_DIR = SITE_ROOT / "sources"


def parse_repository_vocabulary() -> list[dict[str, object]]:
    text = MARKDOWN_SOURCE.read_text(encoding="utf-8")
    records: list[dict[str, object]] = []
    current_section = ""

    for line in text.splitlines():
        if line.startswith("## "):
            current_section = line
        if "词组" in current_section or not line.startswith("|"):
            continue

        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) not in (4, 6) or cells[0] in {"单词", "---"}:
            continue
        if not re.fullmatch(r"[A-Za-z][A-Za-z /'-]*", cells[0]):
            continue

        record: dict[str, object] = {
            "word": cells[0],
            "phonetic": cells[1],
            "pos": cells[2],
            "meaning": cells[3],
            "example": cells[4] if len(cells) == 6 else "",
            "translation": cells[5] if len(cells) == 6 else "",
            "deep": len(cells) == 6 and bool(cells[4]),
        }
        records.append(record)

    # Keep the first, richer record when the source ever contains a duplicate.
    deduped: dict[str, dict[str, object]] = {}
    for record in records:
        key = str(record["word"]).lower()
        if key not in deduped or (record["deep"] and not deduped[key]["deep"]):
            deduped[key] = record
    return list(deduped.values())


def parse_official_vocabulary() -> list[dict[str, str]]:
    if not OFFICIAL_PDF.exists():
        saved = SOURCE_DIR / "official-vocabulary-2021.json"
        if saved.exists():
            return json.loads(saved.read_text(encoding="utf-8"))
        return []

    import pdfplumber

    records: list[dict[str, str]] = []
    with pdfplumber.open(OFFICIAL_PDF) as pdf:
        # The appendix starts on PDF page 23 (zero-based page index 22).
        for page in pdf.pages[22:]:
            for table in page.extract_tables():
                for row in table:
                    if len(row) < 2:
                        continue
                    marker = (row[0] or "").strip()
                    word = (row[1] or "").replace("\n", " ").strip()
                    is_word = re.fullmatch(r"[A-Za-z][A-Za-z0-9 /'().,&-]*", word)
                    is_letter_heading = len(word) == 1 and word.isupper()
                    if is_word and not is_letter_heading:
                        module = "拓展模块" if marker == "**" else "基础模块" if marker == "*" else "入学词汇"
                        records.append({"word": word, "marker": marker, "module": module})

    deduped: dict[str, dict[str, str]] = {}
    for record in records:
        deduped.setdefault(record["word"].lower(), record)
    return list(deduped.values())


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    vocabulary = parse_repository_vocabulary()
    official = parse_official_vocabulary()
    official_map = {item["word"].lower(): item for item in official}

    for index, record in enumerate(vocabulary, start=1):
        match = official_map.get(str(record["word"]).lower())
        record["id"] = index
        record["official"] = bool(match)
        record["module"] = match["module"] if match else "扩展识别"

    meta = {
        "total": len(vocabulary),
        "deep": sum(bool(item["deep"]) for item in vocabulary),
        "verbs": sum("v." in str(item["pos"]) for item in vocabulary),
        "deepVerbs": sum(
            "v." in str(item["pos"]) and bool(item["deep"])
            for item in vocabulary
        ),
        "officialScope": 3000,
        "officialExtractedEntries": len(official),
        "officialMatches": sum(bool(item["official"]) for item in vocabulary),
    }

    payload = (
        "window.VOCABULARY_META = "
        + json.dumps(meta, ensure_ascii=False, separators=(",", ":"))
        + ";\nwindow.VOCABULARY_DATA = "
        + json.dumps(vocabulary, ensure_ascii=False, separators=(",", ":"))
        + ";\n"
    )
    (DATA_DIR / "vocabulary-data.js").write_text(payload, encoding="utf-8")
    (SOURCE_DIR / "official-vocabulary-2021.json").write_text(
        json.dumps(official, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
