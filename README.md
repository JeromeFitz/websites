# jeromefitzgerald.com

- 👱🏻️ **Website**: [`jeromefitzgerald.com`](https://jeromefitzgerald.com)
- 🧑🏼‍💻️ **Code**: [`./sites/jeromefitzgerald.com`](https://github.com/JeromeFitz/websites/tree/main/sites/jeromefitzgerald.com)
- 📦️ **Packages**: [`@jeromefitz/packages`](https://github.com/JeromeFitz/packages)
  - 🔧 Configuration
    - `@jeromefitz/lighthouse-config` \*
    - `@jeromefitz/next-config` \*
    - `@jeromefitz/playwright-config` \*
    - `@jeromefitz/prettier-config`
    - `@jeromefitz/storybook-config` \*
    - `@jeromefitz/tailwind-config` \*
    - `@jeromefitz/tsconfig`
  - ⚡ Release Management
    - `ccommit`
    - `@jeromefitz/release-notes-generator`
    - `@jeromefitz/semantic`
  - 🖼️ Design System, Notion, etc.
    - `@jeromefitz/design-system`
    - `@jeromefitz/notion`
    - `@jeromefitz/utils`
    - `next-notion` \*

`*` Local to this monorepo

You may be here for the Notion CMS with Next, you can find more information in the following README:

- [`./sites/jeromefitzgerald.com`](https://github.com/JeromeFitz/websites/tree/main/sites/jeromefitzgerald.com)
  - `@jeromefitz/notion`
  - `next-notion`

## Overview

- **Analytics**: [Fathom](https://usefathom.com/ref/GKTEFP), Vercel
  - Note: Referral Link
- **Content**: Notion ([`@jeromefitz/notion`](https://github.com/JeromeFitz/packages))
- **Database**: Notion (CMS), Upstash (Redis)
- **Design System**: Radix UI ([`@jeromefitz/design-system`](https://github.com/JeromeFitz/packages))
- **Framework**: Next
- **Hosting**: Vercel
- **Styling**: Tailwind
- ℹ️ **Colophon**: [https://jeromefitzgerald.com/colophon](https://jeromefitzgerald.com/colophon)

## Monorepo Setup

- 📦 [`pnpm workspaces`](https://pnpm.io/pnpm-workspace_yaml)
- :octocat: [`GitHub Actions`](https://github.com/features/actions) for CI/CD (w/ `deploy-to-vercel-action`)
- 🔺️ [`turborepo`](https://github.com/vercel/turborepo) for monorepo management
- 🤖️ [`Renovate`](https://github.com/renovatebot/renovate) for Patch + Minor Package Management
  - Roadmap [`mend`]
- 🤖️ [`Kodiak`](https://kodiakhq.com) to “Automate (our) GitHub Pull Requests”
- 🤖️ Automatic [`Semantic Versioning`](https://semver.org) w/ [`Conventional Commits`](https://www.conventionalcommits.org) for release management ([`ccommit`](https://github.com/JeromeFitz/packages)|[`@jeromefitz/semantic`](https://github.com/JeromeFitz/packages))

## Contributing

If you would like to opt-out of the `git hooks` please look at `.env.example`.

Normally, these would be opt-in and may change to that in the future.
