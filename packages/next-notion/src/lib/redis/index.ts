import Redis from 'ioredis'

/**
 * @ref https://github.com/luin/ioredis#transparent-key-prefixing
 *
 */
const redis = new Redis(process.env.REDIS_URL, {
  keyPrefix: `${process.env.NEXT_PUBLIC__SITE}/`,
})

export default redis
