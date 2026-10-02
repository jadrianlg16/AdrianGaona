# Résumé source

`Jesus_Adrian_Lopez_CV.docx` is the editable master. This folder is **not** under
`public/`, so nothing here is served by the site — only the exported PDF is.

## Updating the résumé

1. Edit `Jesus_Adrian_Lopez_CV.docx`.
2. Export to PDF over `public/downloads/adrian-gaona-resume.pdf` (keep that exact
   filename — `components/Contact.tsx` links to it and the URL is public/bookmarkable).
3. Commit both files and push. Vercel redeploys on push; the new PDF is live in ~1 min.

**Export from Google Docs, not Word or LibreOffice.** The `.docx` and the served
PDF both came out of Google Docs (the PDF's producer is the Docs renderer), and
that is the only exporter that fits this file on one page. Opening the same
`.docx` in Word 16 or LibreOffice pushes the "Areas of interest" line onto a
second page (checked 2026-09-05).

**Links.** The GitHub and website links in both files were corrected in place,
without a re-export: the targets are now `https://github.com/jadrianlg16` and
`https://www.adriangaona.dev`, and the page renders exactly as before. If the
Google Doc is the real master, fix the links there too, or the next export will
bring the old ones back. Link the `www` host: `.dev` forces HTTPS, and the bare
domain does not serve the site.

Previous versions live in `archive/`.

## Why this isn't gitignored

Vercel builds from the git repo. A gitignored PDF would not exist in the deployment,
so `/downloads/adrian-gaona-resume.pdf` would 404 and the "Download résumé" button on
the site would break. The PDF has to be committed to ship.
