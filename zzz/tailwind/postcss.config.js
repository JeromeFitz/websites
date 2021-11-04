module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-nested': {},
    'postcss-hover-media-feature': {},
    'postcss-flexbugs-fixes': {},
    'postcss-initial': {},
    'postcss-page-break': {},
    'postcss-custom-properties': {},
    'postcss-font-variant': {},
    'postcss-gap-properties': {},
    'postcss-media-minmax': {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
    // '@fullhuman/postcss-purgecss':
    //   process.env.NODE_ENV === 'production'
    //     ? {
    //         content: [
    //           './pages/**/*.{js,jsx,ts,tsx}',
    //           './components/**/*.{js,jsx,ts,tsx}',
    //         ],
    //         safelist: [
    //           'ngop',
    //           '^bg-error',
    //           '^bg-info',
    //           '^bg-success',
    //           '^bg-warning',
    //         ],
    //         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //       }
    //     : false,
  },
}
