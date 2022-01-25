import { Octokit } from '@octokit/core'
// import Slugger from 'github-slugger'
// import Redis from 'ioredis'
import ms from 'ms'
import { NextApiResponse } from 'next'

const octokit = new Octokit({ auth: process.env.GH_TOKEN })

// const redis = new Redis(process.env.REDIS_URL)
const keyPrefix = 'github'

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => time / 1000 ?? 0
const EVICTION_POLICY = getTimeInSeconds(ms('1d'))

const SLUG__VALIDATION = ['releases']
const dataEmpty = { data: {}, debug: { type: 'api', latency: 0 } }

const getKey = ({ slug }) => {
  return {
    key: `${keyPrefix}/${slug}`,
    evictionPolicy: EVICTION_POLICY,
  }
}

const githubApi = async (req: any, res: NextApiResponse) => {
  const {
    query: { page, per_page, slug },
  } = req

  /**
   * @validation
   */
  if (!SLUG__VALIDATION.includes(slug))
    return res?.status(200).json({ ...dataEmpty })

  /**
   * @cache
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { key, evictionPolicy } = getKey({ slug })

  const start = Date.now()
  const cache = null

  // const _res: any = await octokit.request('GET /repos/{owner}/{repo}/tags', {
  //   owner: 'jeromefitz',
  //   repo: 'jeromefitzgerald.com',
  //   per_page: 1,
  // })

  // // @todo(replace) this needs to be more dynamic or something, heh
  // const t = _res.data[0].name.replace('website-v', '')
  // const [version, prerelease] = t.split('-')
  // const [major, minor, patch] = version.split('.')
  // const data = { major, minor, patch, prerelease, version }

  // const release: any = await octokit.request(
  //   'GET /repos/{owner}/{repo}/releases/latest',
  //   {
  //     owner: 'jeromefitz',
  //     repo: 'jeromefitzgerald.com',
  //     // per_page: 1,
  //   }
  // )

  const releases: any = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'jeromefitz',
    repo: 'jeromefitzgerald.com',
    page,
    per_page,
  })

  // const tags: any = await octokit.request('GET /repos/{owner}/{repo}/tags', {
  //   owner: 'jeromefitz',
  //   repo: 'jeromefitzgerald.com',
  // })

  const debug = {
    key,
    latency: Date.now() - start,
    type: cache ? 'cache' : 'api',
  }

  const result = {
    // data,
    debug,
    // release,
    releases,
    // tags,
  }

  return res.status(200).json({ ...result.releases, debug: result.debug })
}

export default githubApi
