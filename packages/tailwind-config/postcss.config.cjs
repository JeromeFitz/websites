module.exports = {
  plugins: {
    autoprefixer: {},
    'tailwindcss/nesting': {},
    // eslint-disable-next-line perfectionist/sort-objects
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
