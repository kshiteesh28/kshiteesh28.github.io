# Kshiteesh R Bharadwaj — Portfolio

An independent, static Astro + TypeScript portfolio. The editorial layout, conceptual SVG illustrations and browser-only admission-control simulation are custom. Case studies live in Markdown.

## Local development

Use Node 24 or newer.

```sh
npm ci
npm run dev
```

Open the printed localhost address. Production: `npm run check && npm test && npm run build`, then `npm run preview`.

## Content

- Homepage: `src/pages/index.astro`
- Case studies: `src/content/work/*.md`
- Shared design: `src/styles/global.css`
- Simulation model: `src/lib/simulation.ts`
- Resume: `public/resume.pdf` (a copy of the reviewed one-page master)

Edit copy explicitly; there is no runtime connection to career-ops. No credentials, application records or profile configuration belong here. GitHub links are limited to the verified profile and Flow-State repository.

## Deploy to GitHub Pages

Repository: https://github.com/kshiteesh28/kshiteesh28.github.io

Public site: https://kshiteesh28.github.io/

Deployments are manual: editing or pushing source alone does not publish it.

1. Create a separate repository named `kshiteesh28.github.io`.
2. Commit this directory's source and package lock. Exclude `node_modules`, `dist`, `.astro` and `qa`.
3. In repository Settings → Pages, choose **GitHub Actions** as the build source.
4. Open Actions → **Deploy portfolio to GitHub Pages** → **Run workflow**.

The workflow is manual-only to prevent an unapproved push from publishing. It checks types, tests the model, builds static pages and deploys the artifact.

The site defaults to `https://kshiteesh28.github.io` with a root base path. For a different project repository set `BASE_PATH=/repository-name/` at build time. For a custom domain set `SITE_URL=https://your-domain.example`, use a root base path, add a `public/CNAME` file containing the domain, add the domain in GitHub Pages settings and configure the required DNS records. Update `public/robots.txt` for the new domain.

Workflow structure follows the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/), with manual-only deployment and validation before the build. The remote workflow has not been run.

## Claims and public-safe diagrams

`CONTENT_PROVENANCE.md` maps public claims to the user-approved career sources. Employer diagrams illustrate concepts only. Results are identified as reported experience/project outcomes; the simulation's values are labeled illustrative and are not benchmark claims.
