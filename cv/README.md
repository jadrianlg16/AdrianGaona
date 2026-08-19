# Résumé source

`Jesus_Adrian_Lopez_CV.docx` is the editable master. This folder is **not** under
`public/`, so nothing here is served by the site — only the exported PDF is.

## Updating the résumé

1. Edit `Jesus_Adrian_Lopez_CV.docx`.
2. Export to PDF over `public/downloads/adrian-gaona-resume.pdf` (keep that exact
   filename — `components/Contact.tsx` links to it and the URL is public/bookmarkable).
3. Commit both files and push. Vercel redeploys on push; the new PDF is live in ~1 min.

Previous versions live in `archive/`.

## Why this isn't gitignored

Vercel builds from the git repo. A gitignored PDF would not exist in the deployment,
so `/downloads/adrian-gaona-resume.pdf` would 404 and the "Download résumé" button on
the site would break. The PDF has to be committed to ship.
