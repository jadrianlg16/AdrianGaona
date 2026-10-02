# Deploying adriangaona.dev

The site is a Next.js 15 app with every route prerendered, deployed on Vercel's
Hobby plan through the Vercel GitHub integration. It needs no environment
variables and no build settings beyond Vercel's Next.js preset.

## Current state (checked 2026-10-01)

| Thing | State |
|---|---|
| GitHub `jadrianlg16/AdrianGaona` | Public. Default branch `master`. |
| Production | Every push to `master` deploys to production. Other branches get preview deployments, which sit behind Vercel's login. |
| Vercel project | On the personal Vercel account, not on a team. A team dashboard shows no projects. |
| `https://www.adriangaona.dev` | **Works.** 200, served by Vercel through Cloudflare's proxy. |
| `https://adriangaona.dev` (no `www`) | **Broken: HTTP 525.** See [Fixing the bare domain](#fixing-the-bare-domain). |
| DNS | Cloudflare (nameservers `addilyn` / `peyton.ns.cloudflare.com`). The domain is registered at GoDaddy. |
| Email on the domain | **Live Microsoft 365 mailbox.** See the warning below. |

Every absolute URL the site emits (canonical, Open Graph, sitemap, robots.txt,
JSON-LD) uses `https://www.adriangaona.dev`, from `src/app/lib/site.ts`, so the
broken bare domain affects only people who type it.

## Shipping a change

Merging into `master` and pushing **is a production deploy**, live in about a
minute:

```bash
git checkout master
git merge <branch>
git push origin master
```

To look at a change first, push the branch instead and open its preview URL
from the Vercel dashboard or the commit's status on GitHub.

Before pushing, run the same checks CI runs:

```bash
npm ci && npm run lint && npm run typecheck && npm test && npm run build
```

To update the résumé, see [`cv/README.md`](cv/README.md).

## Where DNS lives: Cloudflare, not GoDaddy

GoDaddy is the registrar (renewal, WHOIS, transfer lock), but the nameservers
delegate the zone to Cloudflare:

```text
adriangaona.dev  NS  addilyn.ns.cloudflare.com
adriangaona.dev  NS  peyton.ns.cloudflare.com
```

Every DNS record is served by Cloudflare. Records added in GoDaddy's DNS panel
are ignored, so make all changes in the Cloudflare dashboard.

## Do not move the nameservers to Vercel

The domain runs mail on Microsoft 365:

```text
MX   adriangaona-dev.mail.protection.outlook.com
TXT  v=spf1 include:secureserver.net -all
TXT  NETORGFT17024204a.onmicrosoft.com
```

`jesus@adriangaona.dev` is a working mailbox and the contact address on the site
and the résumé. Pointing the nameservers at Vercel drops every record Vercel does
not manage, which kills that mailbox. Keep Cloudflare as the DNS host and change
only web records. (The SPF record names `secureserver.net` because the Microsoft
365 plan was bought through GoDaddy; it does not mean GoDaddy serves DNS.)

## Fixing the bare domain

What is known (2026-10-01):

- Cloudflare's apex record still points at a GoDaddy parking host. Over plain
  HTTP the apex returns GoDaddy's `/lander` redirect page. That host has no
  certificate for the domain, so Cloudflare's HTTPS connection to it fails and
  visitors get a 525. Browsers always use HTTPS for `.dev`, so the plain HTTP
  page is never what anyone sees.
- Vercel already redirects the apex. Asked directly
  (`curl -skI --resolve adriangaona.dev:443:76.76.21.21 https://adriangaona.dev/`),
  Vercel's edge answers `308` to `https://www.adriangaona.dev/`. It presents the
  `www` certificate, not one for the apex, because DNS does not point at it yet.

So the fix is one record in Cloudflare:

1. In Vercel, open the project → **Settings → Domains** → `adriangaona.dev` and
   copy the record it asks for. The values are project-specific and change over
   time, so copy them from that screen, not from this file or a blog post.
2. In Cloudflare → `adriangaona.dev` → **DNS → Records**, replace the apex
   (`@`) record with that one. A name cannot hold a CNAME next to A or AAAA
   records, so delete the apex A and AAAA records first. Cloudflare allows a
   CNAME at the apex through CNAME flattening.
3. Leave the `MX` and both `TXT` records exactly as they are.
4. Give the apex the same proxy status as `www`. `www` is proxied (orange cloud)
   and reaches Vercel without a redirect loop, so the zone's SSL mode is not
   Flexible and already works with Vercel. DNS only (grey cloud) works as well.
5. Wait for Vercel to show the domain as valid and issue the certificate (a few
   minutes after DNS resolves; there are no CAA records to block it), then check:

   ```bash
   curl -sI https://adriangaona.dev/    # expect 308 → https://www.adriangaona.dev/
   ```

## Serving the site from another domain

Set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) in the Vercel
project's environment variables, or pass it to Docker with
`--build-arg NEXT_PUBLIC_SITE_URL=…`. It is read at build time, so redeploy after
changing it. Without it, the site uses `https://www.adriangaona.dev`.

## Recreating the Vercel project

Only needed if the project is ever deleted:

1. <https://vercel.com/new> → **Import Git Repository** → `jadrianlg16/AdrianGaona`.
2. Leave the Next.js preset's build, output and install settings on their
   defaults, and deploy.
3. Check the `*.vercel.app` URL before touching DNS: the home page, a demo such
   as `/demos/chess/` (these rely on the rewrites in `next.config.ts`), and
   `/downloads/adrian-gaona-resume.pdf`.
4. Add `www.adriangaona.dev` and `adriangaona.dev` under **Settings → Domains**,
   set the apex to redirect to `www`, and create the records it shows in
   Cloudflare as described above.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `525` on a hostname | Cloudflare cannot complete TLS with the origin the record points at. Check the record targets Vercel. |
| `526` | The zone's SSL mode is Full (strict) and the origin certificate is not valid yet. Wait for Vercel to issue it, or switch the record to DNS only. |
| Redirect loop | The zone's SSL mode is Flexible, so Cloudflare talks HTTP to Vercel and Vercel redirects back to HTTPS. Use Full or Full (strict). |
| Domain stuck on "Invalid Configuration" in Vercel | The record does not match the domain card yet. Compare it with `nslookup adriangaona.dev 1.1.1.1`. |
| `/demos/<id>` returns 404 | The rewrites in `next.config.ts` did not apply, or `public/demos/` was not committed. |
| Email stops working | An `MX` or `TXT` record was removed. Restore the three records listed above. |
