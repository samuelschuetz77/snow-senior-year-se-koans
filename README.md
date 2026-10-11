# Snow Senior Year SE Koans

A small static study site for the published Fall 2026 reading lists in Advanced Algorithms, Software Practicum, Software Maintenance, and Frontend Development, plus supplemental textbooks. Each reading opens one sentence at a time with one blank. Correct word answers advance automatically; currency answers use Enter to submit. After five unsuccessful Enter presses, the answer appears in the blank with an explanation below it. An optional Expound button shows further explanation after the answer reveal. All koans have individually authored expounds that explain the answer through connected reasoning, examples, and relevant distinctions. Expounds never append automatically selected earlier koans or use a generated fallback. Restart begins the current reading again. Progress stays in the browser's local storage.

Reading sets normally have 20–30 questions; the five Corporate Finance sets have 35 each. Programming sets include code, while finance sets use PDF documents and currency calculations. Run `node check-content.js` for the current collection totals. Brief explanations stay under 40 words, and Expound is available only after the five-Enter reveal.

Frontend Development also links to **Code-centric koans**: ten progressive React sets with 20 koans each. Every prompt shows a snippet first, averaging 8.5 lines and never exceeding 15. Each set revisits four examples from five angles, including two blanks inside code; the remaining blanks appear in statements below the code. Code answers preserve case and punctuation so identifiers and operators must be valid. The sequence covers JSX, props, state, immutable collections, forms, Effects, custom Hooks and async work, reducers and context, memoization, and concurrent rendering. These are original practice exercises grounded in the React documentation, not assigned reading dates.

Question wording follows [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md): blanks are authored in the sentences themselves, with meaningful verbs and other concepts appearing in varied positions.

Other Koans is available from the home page, organized by textbook and then chapter. Jay Wengrow's *A Common-Sense Guide to Data Structures and Algorithms in Python, Volume 1* has nine sets covering Chapters 12–20, with 20 original koans per chapter (180 total). Coverage includes dynamic programming, recursive sorting, linked lists, search trees, heaps, tries, graphs, space complexity, and optimization. Volume 2 has all 13 numbered chapters with 20 original koans each (260 total), from mergesort and benchmarking through randomized trees, external-memory algorithms, hashing, bit vectors, and Bloom filters. Each set includes a Python example, hints, and authored Expounds. These are supplemental readings without assigned due dates or supplied assignments; they cover core methods and boundary cases, without claiming coverage of unseen assignment problems.

## Coverage

**Other Koans → Corporate Finance** contains 35 koans for each of Berk and DeMarzo's chapters 1–5 (175 total). Each chapter contains six currency problems (17.1%), progressing from component calculations to combined applications near the end. Five original two-page PDFs provide financial statements, governance diagrams, market quotes, timelines, a yield curve, and loan worksheets. **Show PDF exhibit** opens the relevant page beside the question (below it on narrow screens). It can be hidden, opened in another tab, or read as accessible text. Currency blanks accept dollar signs and thousands separators; press Enter to submit a complete amount rounded to cents. Word blanks continue to advance automatically. A chapter URL with `&exhibit=open` opens with its worksheet visible.

The goal for every class is assignment readiness: understanding the koans should prepare a student to start the assigned problems without reading the chapter first and perform well. See [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md), [FRAMEWORK.md](FRAMEWORK.md), and the finance [coverage audit](FINANCE_COVERAGE.md). Finance uses document exercises instead of mandatory programming snippets.

- Advanced Algorithms: the locally available JEA, induction, linear programming, Big O, and data structures readings, plus the public Q# and Microsoft QFT pages. JEA §§12.1–12.3 are included once even though the schedule assigns them again on November 16.
- Software Practicum: every SWEBOK chapter currently listed in the course outline (1–7, 10, 12–14, 16–18).
- Software Maintenance: every WEWLC chapter currently posted as class prep (1–4 and 6–15). Chapter 5 is not on the posted list.
- Frontend Development: the posted TypeScript and React research readings, split into focused topic sets, plus a Sep 30 set from class discussion on when to use `.ts` versus `.tsx`.

The Algorithms schedule also lists “Extra A” and “QC 1–6.” The actual Extra A source and exact O’Reilly book link are not present in the local reading archive. Their koans will be added when those sources are available; this site does not guess their contents. Schedule rows without assigned reading are omitted.

Questions are original paraphrases. Source PDFs, Canvas pages, and personal assignments are not published here. The source field in each data file records the chapter or public page used for review. The public reference pages are [Erickson’s Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/), [Q# in Y Minutes](https://learnxinyminutes.com/qsharp/), [Microsoft’s QFT tutorial](https://learn.microsoft.com/en-us/azure/quantum/tutorial-qdk-qubit-level-program), [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html), and [React Learn](https://react.dev/learn).

## Run locally

All 440 Common-Sense Guide koans (Volume 1 chapters 12–20 and all 13 Volume 2 chapters) include illustrated beginner Expounds. After five unsuccessful Enter presses, select Expound for terminology, a diagram, a worked example, the current koan's explanation, pitfalls, and a self-check. The 28 explicitly assigned concept lessons live in `data/textbook-lessons.js`; full explanations scroll without shrinking the text. Run `node check-lessons.js` to verify coverage and diagram integrity.

From this directory:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Run `node check-content.js` to verify question counts, explanations, unique authored expounds, duplicate sentences, and the code-question ratio in every set.

## Publishing

Run `node check-finance.js` to verify all 30 currency answers independently, statement reconciliations, chapter progression, PDF assets, and strict currency parsing. Rebuild the finance PDFs and their text equivalents with `python scripts/build-finance-exhibits.py` (requires ReportLab). The full textbook stays local in `additional textbooks/` and is ignored by Git; original public exhibits live in `exhibits/corporate-finance/`.

The workflow packages an explicit allowlist into `_site`: the player, data, and original exhibits. Source textbooks and authoring materials are excluded from the published site.

The workflow in `.github/workflows/pages.yml` validates and publishes the static site on every push to `main`. GitHub Pages can host this public repository on the GitHub Free plan.

The supplied `snowkoans.duckdns.org` name is a DuckDNS subdomain. GitHub Pages requires a **CNAME DNS record** for a custom subdomain, while DuckDNS provides A/AAAA and TXT updates but no CNAME control. The reliable live URL is therefore the repository's `github.io` Pages URL. Do not point the DuckDNS A record at GitHub Pages and claim the custom hostname is configured without a working HTTPS and DNS check.
