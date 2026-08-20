# Deploying adriangaona.dev to Vercel

Next.js 15 App Router, all 10 routes prerendered static. No env vars, no
backend, no build config needed — Vercel's Next.js preset is correct as-is.
The Vercel **Hobby (free)** plan covers this: private GitHub repos, custom
domains, automatic TLS. A personal portfolio is non-commercial, so it's within
Hobby's terms.

## State when this was written (2026-08-19)

| Thing | State |
|---|---|
| GitHub `jadrianlg16/AdrianGaona` | private, default branch `master`, last push 2026-04-09 |
| Local `feat/alpine-avalanche-experience` | **9 commits ahead of `origin/master`** |
| Vercel account (team `LopezDev`) | zero projects |
| `adriangaona.dev` DNS | Cloudflare nameservers, apex proxied to `104.21.37.40` / `172.67.203.186` |
| `adriangaona.dev` HTTP | **HTTP 525 — SSL handshake failed.** Origin behind Cloudflare is dead. |
| Email on the domain | **live Microsoft 365** — see the warning below |

## Where DNS actually lives: Cloudflare, not GoDaddy

The domain is **registered at GoDaddy**, but its nameservers delegate the zone to
Cloudflare:

```
adriangaona.dev  NS  addilyn.ns.cloudflare.com
adriangaona.dev  NS  peyton.ns.cloudflare.com
```

So GoDaddy handles renewal, WHOIS and transfer locks, while **every DNS record is
served by Cloudflare**. Records added in GoDaddy's DNS panel are ignored — they
are not authoritative for this zone. Make all record changes in the Cloudflare
dashboard.

(The Microsoft 365 mail below was bought through GoDaddy, which is why the SPF
record says `include:secureserver.net` — that's GoDaddy's mail infrastructure.
It does not mean GoDaddy is serving DNS.)

## ⚠️ Do not move nameservers to Vercel

`adriangaona.dev` runs mail on Microsoft 365:

```
MX   adriangaona-dev.mail.protection.outlook.com
TXT  v=spf1 include:secureserver.net -all
TXT  NETORGFT17024204a.onmicrosoft.com
```

`jesus@adriangaona.dev` is a working mailbox — it's the contact address on the
CV and on the site. Pointing the domain's nameservers at Vercel drops every
record Vercel doesn't manage, which kills that mailbox. **Keep Cloudflare as
the DNS host** and change only the web records below.

## 1. Get the code onto GitHub

Vercel builds what's on GitHub. Right now that's a 4-month-old `master` without
the alpine redesign, the HowlX screenshots, the transcript archive, or the
current CV.

```bash
git checkout master
git merge feat/alpine-avalanche-experience
git push origin master
```

Alternatively push the feature branch and set it as the Production Branch in
Vercel (Settings → Git). Merging to `master` is simpler.

## 2. Import the project

1. <https://vercel.com/new> → **Import Git Repository**.
2. Authorize Vercel for the `jadrianlg16` account if prompted; grant access to
   `AdrianGaona` (private repos are fine on Hobby).
3. Framework Preset auto-detects **Next.js**. Leave build command, output
   directory, and install command on their defaults.
4. **Deploy.**

You get a `*.vercel.app` URL. **Verify there before touching DNS** — the
domain is currently broken anyway, so there's no rush and no risk in testing
first. Check:

- the project cards' live demos load (`/demos/chess`, `/demos/financial-sim`,
  `/demos/tasklists` — these rely on the rewrites in `next.config.ts`)
- `/downloads/adrian-gaona-resume.pdf` downloads the current CV

## 3. Add the domain in Vercel

Project → **Settings → Domains** → add `adriangaona.dev`, then
`www.adriangaona.dev`. Vercel shows the exact records to create. Copy them from
that screen — the values below are for recognition only, Vercel rotates them.

| Host | Type | Value |
|---|---|---|
| `@` | A | the IP Vercel shows (historically `76.76.21.21`, newer `216.198.79.1`) |
| `www` | CNAME | `cname.vercel-dns.com` or a region-specific `*.vercel-dns-0NN.com` |

## 4. Cloudflare DNS — the part that actually breaks

In the Cloudflare dashboard → `adriangaona.dev` → **DNS → Records**:

1. **Delete** the existing apex `A` records (`104.21.37.40`, `172.67.203.186`)
   and any `AAAA`, plus the `www` record. These point at the dead origin
   causing the 525.
2. **Add** the records from Vercel's Domains screen.
3. Set the proxy status on both to **DNS only (grey cloud)**, not Proxied
   (orange cloud).
4. **Leave `MX` and the two `TXT` records exactly as they are.**

Grey cloud matters. With the orange cloud on, Cloudflare terminates TLS itself
and re-originates to Vercel — and Cloudflare's default **Flexible** SSL mode
tries plain HTTP to an origin that only speaks HTTPS. That's precisely the
525/redirect-loop failure the domain is showing now. Vercel already provides a
global CDN and free TLS, so the proxy adds nothing here.

If you want to keep the orange cloud anyway, set SSL/TLS → Overview →
**Full (strict)** first, and expect to debug caching and `Always Use HTTPS`
interactions.

Certificate issuance takes a few minutes after DNS resolves. There are no CAA
records on the domain, so nothing blocks Let's Encrypt.

## 5. After it's live

Every push to the production branch redeploys automatically. Pull requests get
preview URLs. To update the résumé, see [`cv/README.md`](cv/README.md).

## Troubleshooting

| Symptom | Cause |
|---|---|
| `525` / `526` | Cloudflare proxy on with Flexible SSL. Grey-cloud the record, or switch to Full (strict). |
| Redirect loop | Same cause, or `Always Use HTTPS` fighting Vercel's own redirect. |
| Domain stuck "Invalid Configuration" | DNS still returns Cloudflare proxy IPs. Confirm with `nslookup adriangaona.dev 8.8.8.8`. |
| `/demos/<id>` 404s | The rewrites in `next.config.ts` didn't apply, or `public/demos/` wasn't committed. |
| Email stops working | An MX or SPF `TXT` record was removed. Restore the three records listed above. |
