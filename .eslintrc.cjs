const path = require('path')
const fullCwd = path.join(__dirname, './')

const nextOverrides = {
  rules: {
    '@next/next/no-html-link-for-pages': ['error', 'src/app'],
    'no-restricted-imports': [
      'error',
      {
        name: 'next/link',
        message: 'Use local <Anchor /> instead',
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
  plugins: ['testing-library'],
  root: true,
  reportUnusedDisableDirectives: true,
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
          config: `${fullCwd}/sites/jeromefitzgerald.com/tailwind.config.js`,
          callees: ['cx', 'tw'],
          /**
           * @todo(eslint-plugin-tailwindcss) submit pr for allowlist
           * @note(radix) dynamic variables need to be identified one-by-one here
           */
          whitelist: [
            '_background',
            '-button',
            '-radix-',
            'bg-radix-',
            'icon-custom',
            'notion-',
            'spotify-button-outline',
            'text-radix-',
            'trap',
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
          config: `${fullCwd}/packages/design-system/tailwind.config.js`,
          callees: ['cx', 'tw'],
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
}
