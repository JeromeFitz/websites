/* eslint-disable perfectionist/sort-objects */
/** @type {import('postcss-load-config').Config} */
const configPostcss = {
  plugins: {
    /**
     * @note(next) documentation shows that autoprefixer should be last
     * ==========> it should not in this application
     * ==========> do not move this
     */
    autoprefixer: {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            /**
             * @note(postcss) issue with calc from *.module.css
             *
             * Expecting end of input, "ADD", "SUB", "MUL", "DIV", got unexpected "RPAREN"
             */
            preset: [
              'default',
              {
                calc: false,
              },
            ],
          },
        }
      : {}),
  },
}

export default configPostcss
