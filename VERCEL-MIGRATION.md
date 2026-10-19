# Vercel migration — 19 October 2026

## Deployment

- Team: Eugene's projects (`eugenes-projects-4b286254`, `team_zwd5PvkNQTCWo9IXbc53cO19`).
- Project: `mercado-ventures`, `prj_GHXvwDpfZ2cBzJ5xkQZaFn403fkU`.
- Production deployment: `dpl_28PWgEPGzAeyHy6B9ZMgCFGmVVsy`, READY.
- Public production alias: https://mercado-ventures.vercel.app/.
- Canonical domain: https://mercado.sg/.
- Output: framework Other, `node scripts/build-static.mjs`, directory `dist/`.

The production alias is public. The unique generated deployment URL retains Vercel Authentication; protection was not disabled. Website output contains only 43 required public files. `.env*`, `.vercel/`, audit output and old unused PNG/font sources are excluded from uploads/output as appropriate. No credentials belong in Git.

`vercel.json` replaces the Apache-only hosting rules with canonical host redirects, an index.html redirect, explicit XML/text types and cache/security headers. `.htaccess` is retained only for an older Apache host and is not included in the Vercel output.

## DNS cutover — owner to apply

The domains are attached and ownership-verified on this Vercel project. DNS still pointed at the prior host at preparation. The owner elected to make DNS changes manually. Do not claim completed custom-domain cutover without fresh DNS and HTTPS verification.

For **mercado.sg**, managed at GoDaddy, replace old website records with these exact rank-1 values returned by Vercel:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 8fcaceee61fe4fc7.vercel-dns-017.com |

For **mercadoventures.org**, managed at Hostinger, apply the same entries in its DNS zone, replacing its current website A records and removing its old apex AAAA records. Its www record currently points to Hostinger CDN and should become the CNAME above. This secondary domain and both www hosts are configured to redirect permanently to https://mercado.sg/ while retaining paths and query strings.

Keep both domains' existing nameservers, MX, email-related TXT and other unrelated records. Both domains use Hostinger email. Do not cancel services needed for email.

After DNS changes: confirm Vercel reports correct configuration and HTTPS is issued, check the homepage/Casa Mercado/UX Habitat, inspect www and legacy redirects, verify /index.html normalization and /sitemap.xml HTTP200 XML. Recheck Google Search Console's existing sitemap submission after the canonical live file is reachable. Submission is not indexing.

## Git integration

Source remains in Mercado-ventures/mercado-ventures-website. Automatic GitHub-to-Vercel deployment is **not connected**. Enabling this integration requires the owner's authorization for repository access and webhooks. Do not widen the GitHub installation to unrelated repositories or claim automatic deployment is enabled. The successful production deployment used the existing Vercel CLI session for this exact team/project.

## Evidence

Ignored `outputs/` contains domain configuration, HTTP and browser verification JSON, screenshots and the earlier Hostinger upload ZIP. That ZIP is a fallback static handoff; Vercel deployment uses the source build above.
