# jeromefitzgerald.com

- 👱🏻️ **Website**: [`jeromefitzgerald.com`](https://jeromefitzgerald.com)
- 🧑🏼‍💻️ **Code**: [`./sites/jeromefitzgerald.com`](https://github.com/JeromeFitz/websites/tree/main/sites/jeromefitzgerald.com)
- 📦️ **Packages**: [`@jeromefitz/packages`](https://github.com/JeromeFitz/packages)
  - 🔧 Configuration
    - `@jeromefitz/eslint-config`
    - `@jeromefitz/lint-staged`
    - `@jeromefitz/prettier-config`
    - `@jeromefitz/tsconfig`
  - ⚡ Release Management
    - `@jeromefitz/git-cz`
    - `@jeromefitz/release-notes-generator`
    - `@jeromefitz/semantic`
  - 🖼️ Design System, Notion, etc.
    - `@jeromefitz/design-system`
    - `@jeromefitz/notion`
    - `@jeromefitz/spotify`
    - `@jeromefitz/utils`

You may be here for the implementation with `@jeromefitz/notion`, you can find more information in the following README:

- [`./sites/jeromefitzgerald.com`](https://github.com/JeromeFitz/websites/tree/main/sites/jeromefitzgerald.com)

## Overview

- **Content**: Notion ([`@jeromefitz/notion`](https://github.com/JeromeFitz/packages))
- **Database**: Notion (CMS), Upstash (Redis)
- **Design System**: Radix UI ([`@jeromefitz/design-system`](https://github.com/JeromeFitz/packages))
- **Framework**: Next
- **Hosting**: Vercel
- **Styling**: Stitches
- ℹ️ **Colophon**: [https://jeromefitzgerald.com/colophon](https://jeromefitzgerald.com/colophon)

## Monorepo Setup

- 📦 [`pnpm workspaces`](https://pnpm.io/pnpm-workspace_yaml)
- :octocat: [`GitHub Actions`](https://github.com/features/actions) for CI/CD (w/ `deploy-to-vercel-action`)
- 🔺️ [`turborepo`](https://github.com/vercel/turborepo) for monorepo management
- 🤖️ [`Renovate`](https://github.com/renovatebot/renovate) for Patch + Minor Package Management
- 🤖️ [`Kodiak`](https://kodiakhq.com) to “Automate (our) GitHub Pull Requests”
- 🤖️ Automatic [`Semantic Versioning`](https://semver.org) w/ [`Conventional Commits`](https://www.conventionalcommits.org) for release management ([`@jeromefitz/git-cz`](https://github.com/JeromeFitz/packages)|[`@jeromefitz/semantic`](https://github.com/JeromeFitz/packages))
