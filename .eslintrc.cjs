const path = require('path')
const fullCwd = path.join(__dirname, './')

module.exports = {
  extends: ['@jeromefitz/eslint-config/react.cjs'],
  ignorePatterns: ['next-env.d.ts'],
  root: true,
  reportUnusedDisableDirectives: true,
  overrides: [
    // ⚙️ sites/jeromefitzgerald.com
    {
      extends: ['@jeromefitz/eslint-config/tailwind.cjs'],
      files: 'sites/jeromefitzgerald.com/**',
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
      settings: {
        tailwindcss: {
          config: `${fullCwd}/sites/jeromefitzgerald.com/tailwind.config.js`,
          callees: ['cx', 'tw'],
          // @todo(eslint-plugin-tailwindcss) submit pr for allowlist
          whitelist: ['afc', 'afc2', 'icon-custom', 'trap'],
        },
      },
    },
  ],
}
