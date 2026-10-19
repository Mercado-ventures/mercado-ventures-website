# Mercado Ventures

Static website for Mercado Ventures Pte. Ltd. Primary hosting: Vercel, project `mercado-ventures` in Eugene's projects. Canonical domain: https://mercado.sg/.

## Build

Run `node scripts/build-static.mjs`. This copies the public HTML, styles, script, crawler files and only their referenced assets to `dist/`; it requires no package installation. Vercel runs this command and publishes `dist/` using `vercel.json`. Environment files, source tooling and deployment notes are not public website assets.

## Deploy

With the official Vercel CLI signed in to the intended team, inspect the linked project before deploying. The expected project is `mercado-ventures`, ID `prj_GHXvwDpfZ2cBzJ5xkQZaFn403fkU`, team `eugenes-projects-4b286254`. Run `vercel deploy --prod --scope eugenes-projects-4b286254 --project mercado-ventures` from this folder. Keep local `.vercel/` and environment files ignored.

Read `VERCEL-MIGRATION.md` for the verified deployment, DNS cutover and Git integration status. GitHub source changes do not automatically deploy while the integration is disconnected.

## Content and design

The portfolio features UX Marine, Boat Sparky, UX Habitat, Neptune Tech and Casa Mercado. Polska Marine is described within the UX Habitat umbrella. Casa Mercado links to https://casamercado.club/ and UX Habitat to https://uxhabitat.com/.

Preserve exact #002FA7 and the approved shield identity. Portfolio images need `height:auto` alongside width/aspect-ratio styling; retain this when changing intrinsic image dimensions. The fish-only social preview, canonical metadata, structured data, robots and sitemap remain part of the site.
