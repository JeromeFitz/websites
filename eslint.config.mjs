import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getCompat, RULES } from '@jeromefitz/eslint-config/_lib.js'
import { configBase } from '@jeromefitz/eslint-config/base.js'
// import { configE2E } from '@jeromefitz/eslint-config/e2e.js'
// import { configJest } from '@jeromefitz/eslint-config/jest.js'
import { configNext } from '@jeromefitz/eslint-config/next.js'
import { configReact } from '@jeromefitz/eslint-config/react.js'
import { configTailwind } from '@jeromefitz/eslint-config/tailwind.js'
import { configTypescript } from '@jeromefitz/eslint-config/typescript.js'

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from 'eslint-plugin-storybook'
import { defineConfig } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fullCwd = path.join(__dirname, './')

const compat = getCompat(__dirname)

/** @type {import('typescript-eslint').Config} */
const config = defineConfig([
  ...configBase,
  ...configTypescript,
  ...configReact,
  ...configNext,
  ...configTailwind,
  // @todo(eslint) do not move to eslint@9 just yet
  // ...configE2E,
  // ...configJest,
  {
    ignores: [
      // folders
      '.cache/*',
      '.lighthouseci/*',
      '.next/*',
      '.swc/*',
      '.vercel/*',
      'coverage/*',
      'e2e-report/*',
      'e2e-results/*',
      'node_modules/*',
      'storybook-static/*',
      'zzz/*',
      '**/zzz/*',
      // public
      'public/scripts/**',
      'next-env.d.ts',
      // next-pwa
      'public/fallback-*.js',
      'public/sw.js',
      'public/workbox-*.js',
      // ts
      'jest.config.ts',
      // transition
      'todo/**',
    ],
  },
  // ⚙️ packages/**
  {
    // files: [`${fullCwd}packages/**/*.ts?(x)`],
    files: ['packages/**'],
    settings: {
      tailwindcss: {
        callees: ['cx', 'tw'],
        config: `${fullCwd}/packages/design-system/tailwind.config.ts`,
        // @todo(eslint-plugin-tailwindcss) submit pr for allowlist
        whitelist: ['icon-custom', 'notion-', 'trap'],
      },
    },
  },
  // ⚙️ sites/**
  {
    // ...eslintTailwind[0],
    // files: [`${fullCwd}sites/**/*.ts?(x)`],
    files: [`sites/**/*.ts?(x)`],
    settings: {
      tailwindcss: {
        callees: ['cx', 'tw'],
        config: `${fullCwd}sites/jeromefitzgerald.com/tailwind.config.ts`,
        /**
         * @todo(eslint-plugin-tailwindcss) submit pr for allowlist
         * @note(radix) dynamic variables need to be identified one-by-one here
         */
        whitelist: [
          '_background',
          '-button',
          '-radix-',
          'afc',
          'a-no-focus',
          'animate-sweep',
          'bg-radix\\-.+:?.+',
          'bg-muted',
          'duration-125',
          'duration-250',
          'icon-custom',
          // 'notion-',
          'perspective\\-.+:?.+',
          'radix\\-.+:?.+',
          'text-radix\\-.+:?.+',
          // 'data\\-.+:?.+',
          'trap',
          'widget-init',
        ],
      },
    },
  },
  // ⚙️ e2e
  {
    ...compat.extends('plugin:playwright/playwright-test')[0],
    files: ['**/*.e2e.{js,jsx,ts,tsx}'],
  },
  // { ...compat.extends('plugin:storybook/recommended')[0], files: [`**/*.ts?(x)`] },
  // { ...compat.extends('plugin:storybook/csf-strict')[0], files: [`**/*.ts?(x)`] },
  // ⚙️ packages/storybook-config
  // {},
  /**
   * @note(eslint) custom next for monorepo
   */
  {
    files: [`**/*.ts?(x)`],
    rules: {
      '@next/next/no-html-link-for-pages': [RULES.OFF, 'src/app'],
      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     message: 'Use local <Anchor /> instead',
      //     name: 'next/link',
      //   },
      // ],
      'perfectionist/sort-modules': RULES.OFF,
      /**
       * @todo(turbo) may _not_ need this after all
       * we have a check through next.config currently
       */
      'turbo/no-undeclared-env-vars': 0,
    },
  },
  /**
   * @hack(next) @todo(eslint)
   * ref: https://github.com/t3-oss/create-t3-turbo/issues/984
   * ref: https://github.com/jsx-eslint/eslint-plugin-react/issues/3699
   *
   * Some rules are not ready for eslint@9
   *
   */
  {
    files: [`**/*.ts?(x)`],
    rules: {
      '@next/next/no-duplicate-head': RULES.OFF,
      '@next/next/no-page-custom-font': RULES.OFF,
      // @note(typescript) interface cannot do unions as well as types
      '@typescript-eslint/consistent-type-definitions': RULES.OFF,
      // @note(typescript) i am doing something wrong with unions
      '@typescript-eslint/no-redundant-type-constituents': RULES.OFF,
      // search: // @todo(eslint) react-hooks/exhaustive-deps
      'react-hooks/exhaustive-deps': RULES.OFF,
      // search: // @todo(eslint) storybook/no-title-property-in-meta
      'storybook/no-title-property-in-meta': RULES.OFF,
      // 'testing-library/**': RULES.OFF,
    },
  },
])

// console.dir(`> config`)
// console.dir(config)

export default config
