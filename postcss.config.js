module.exports = {
  plugins: [
    'tailwindcss',
    // '@tailwindcss/jit',
    'postcss-nesting',
    'postcss-hover-media-feature',
    'postcss-flexbugs-fixes',
    // // @note(postcss) manual,stage 3
    'postcss-initial',
    'postcss-page-break',
    // 'postcss-custom-properties',
    'postcss-font-variant',
    // 'postcss-gap-properties',
    'postcss-media-minmax',
    'autoprefixer',
    // // @note(postcss) commented out until postcss@8.x suppport
    // 'postcss-preset-env': {
    //   autoprefixer: {
    //     flexbox: 'no-2009',
    //   },
    //   stage: 3,
    //   features: {
    //     'custom-properties': false,
    //   },
    // },
    // // @note(postcss) not needed with tailwind purge most likely
    // '@fullhuman/postcss-purgecss':
    //   process.env.NODE_ENV === 'production'
    //     ? {
    //         // the paths to all template files
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
    //         // function used to extract class names from the templates
    //         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //       }
    //     : false,
  ],
}
