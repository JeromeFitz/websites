module.exports = {
  extends: [
    '@jeromefitz/eslint-config/react.cjs',
    'plugin:@next/next/core-web-vitals',
    'plugin:@next/next/recommended',
  ],
  root: true,
  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
}
