# Snow Senior Year SE Koans

A small static study site for the published Fall 2026 reading lists in Advanced Algorithms, Software Practicum, Software Maintenance, and Frontend Development. Each reading opens one sentence at a time with one word missing. Correct answers advance automatically. Enter checks an answer; after five unsuccessful Enter presses on a koan, the missing word appears in the blank with an explanation below it. An optional Expound button then opens a roughly 100-word, self-contained source-context explanation. Restart begins the current reading again. Progress stays in the browser's local storage.

## Coverage

- Advanced Algorithms: the locally available JEA, induction, linear programming, Big O, and data structures readings, plus the public Q# and Microsoft QFT pages. JEA §§12.1–12.3 are included once even though the schedule assigns them again on November 16.
- Software Practicum: every SWEBOK chapter currently listed in the course outline (1–7, 10, 12–14, 16–18).
- Software Maintenance: every WEWLC chapter currently posted as class prep (1–4 and 6–15). Chapter 5 is not on the posted list.
- Frontend Development: the posted TypeScript and React research readings, split into focused topic sets.

The Algorithms schedule also lists “Extra A” and “QC 1–6.” The actual Extra A source and exact O’Reilly book link are not present in the local reading archive. Their koans will be added when those sources are available; this site does not guess their contents. Schedule rows without assigned reading are omitted.

Questions are original paraphrases. Source PDFs, Canvas pages, and personal assignments are not published here. The source field in each data file records the chapter or public page used for review. The public reference pages are [Erickson’s Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/), [Q# in Y Minutes](https://learnxinyminutes.com/qsharp/), [Microsoft’s QFT tutorial](https://learn.microsoft.com/en-us/azure/quantum/tutorial-qdk-qubit-level-program), [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html), and [React Learn](https://react.dev/learn).

## Run locally

From this directory:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Run `node check-content.js` to verify structure, duplicate sentences, and the code-reference ratio.

## Publishing

The workflow in `.github/workflows/pages.yml` validates and publishes the static site on every push to `main`. GitHub Pages can host this public repository on the GitHub Free plan.

The supplied `snowkoans.duckdns.org` name is a DuckDNS subdomain. GitHub Pages requires a **CNAME DNS record** for a custom subdomain, while DuckDNS provides A/AAAA and TXT updates but no CNAME control. The reliable live URL is therefore the repository's `github.io` Pages URL. Do not point the DuckDNS A record at GitHub Pages and claim the custom hostname is configured without a working HTTPS and DNS check.
