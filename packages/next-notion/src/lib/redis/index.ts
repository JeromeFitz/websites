import Redis from 'ioredis'

/**
 * @todo(multi-site) key-prefixing
 * @ref https://github.com/luin/ioredis#transparent-key-prefixing
 *
 * new Redis(process.env.REDIS_URL, { keyPrefix: `${process.env.NEXT_PUBLIC__SITE}/` })
 */
const redis = new Redis(process.env.REDIS_URL)

export default redis
