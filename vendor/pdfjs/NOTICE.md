# PDF.js

Vendored from the Codex bundled `pdfjs-dist` package, version 5.6.205.
Only the browser module, worker, standard fonts, and their licenses are included.
Mozilla and individual contributors; Apache License 2.0 (see LICENSE).
Font-specific license files are retained in standard_fonts/.

Project: https://mozilla.github.io/pdf.js/
Rendering API reference used: https://mozilla.github.io/pdf.js/examples/

The site loads these files locally and does not depend on a CDN.
The two browser modules retain their original contents with `.js` extensions
so basic Windows Python HTTP servers send a JavaScript MIME type.
