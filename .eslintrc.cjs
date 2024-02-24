const path = require('node:path')
const fullCwd = path.join(__dirname, './')

const nextOverrides = {
  rules: {
    '@next/next/no-html-link-for-pages': ['off', 'src/app'],
    'no-restricted-imports': [
      'error',
      {
        message: 'Use local <Anchor /> instead',
        name: 'next/link',
      },
    ],
    /**
     * @todo(turbo) may _not_ need this after all
     * we have a check through next.config currently
     */
    'turbo/no-undeclared-env-vars': 0,
  },
}

module.exports = {
  extends: [
    'plugin:storybook/recommended',
    'plugin:storybook/csf-strict',
    '@jeromefitz/eslint-config/react.cjs',
  ],
  ignorePatterns: ['next-env.d.ts'],
  overrides: [
    // ⚙️ packages/storybook-config
    {
      extends: ['@jeromefitz/eslint-config/tailwind.cjs'],
      files: 'packages/storybook-config/**',
      rules: nextOverrides.rules,
    }, // ⚙️ sites/jeromefitzgerald.com
    {
      extends: ['@jeromefitz/eslint-config/tailwind.cjs'],
      files: 'sites/**',
      rules: nextOverrides.rules,
      settings: {
        tailwindcss: {
          callees: ['cx', 'tw'],
          config: `${fullCwd}/sites/jeromefitzgerald.com/tailwind.config.js`,
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
            'notion-',
            'perspective\\-.+:?.+',
            'radix\\-.+:?.+',
            'spotify-button-outline',
            'text-radix\\-.+:?.+',
            // 'data\\-.+:?.+',
            'trap',
            'widget-init',
          ],
        },
      },
    },
    {
      extends: ['@jeromefitz/eslint-config/tailwind.cjs'],
      files: 'packages/design-system/**',
      rules: nextOverrides.rules,
      settings: {
        tailwindcss: {
          callees: ['cx', 'tw'],
          config: `${fullCwd}/packages/design-system/tailwind.config.js`,
          // @todo(eslint-plugin-tailwindcss) submit pr for allowlist
          whitelist: ['icon-custom', 'spotify-button-outline', 'trap'],
        },
      },
    },
    // ⚙️ e2e
    {
      extends: ['plugin:playwright/playwright-test'],
      files: ['**/*.e2e.{js,jsx,ts,tsx}'],
    },
    // ⚙️ jest
    {
      extends: [
        // '@jeromefitz/eslint-config/react.cjs',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
    },
  ],
  plugins: ['testing-library'],
  reportUnusedDisableDirectives: true,
  root: true,
}
