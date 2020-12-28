const websites = ['jerandky.com', 'jeromefitzgerald.com', 'vercel.app']
let websiteAllow = ''
websites.map((website) => (websiteAllow += `*.${website} ${website} `))
/**
 * default-src
 * connect-src
 * form-action
 * font-src
 * img-src
 * media-src
 * object-src
 * script-src
 * style-src
 */

const googleConnect = `https://www.google-analytics.com`
const googleDefault =
  '*.doubleclick.net *.google.com *.google-analytics.com *.googleapis.com *.googletagmanager.com *.gstatic.com'
const googleImage = 'https://*.google-analytics.com https://*.googletagmanager.com'

const cspLocal = `font-src 'self' data:; default-src 'self'; img-src 'self' data: ${googleImage} ${websiteAllow}; script-src 'unsafe-eval' 'self' ${googleDefault} ${websiteAllow}`

const csp = `default-src 'self' 'unsafe-inline' 'unsafe-eval' ${googleDefault}; upgrade-insecure-requests; base-uri 'self'; connect-src 'self' 'unsafe-inline' 'unsafe-eval' ${googleConnect} ${websiteAllow}; form-action 'self'; font-src 'self' data:; frame-ancestors ${websiteAllow}; frame-src 'self' ; img-src 'self' blob: data: ${googleImage} ${websiteAllow}; media-src 'self' data:  ${websiteAllow}; object-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: ${googleDefault} ${websiteAllow}; style-src 'self' 'unsafe-inline' 'unsafe-eval' ${websiteAllow}`

export { cspLocal }
export default csp
