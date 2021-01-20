// Remove trailing and leading slash, usually included in nodes
const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')

export default getSlug
