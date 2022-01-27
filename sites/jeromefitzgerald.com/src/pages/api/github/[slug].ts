import { Octokit } from '@octokit/core'
// import Slugger from 'github-slugger'
// import Redis from 'ioredis'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import _pick from 'lodash/pick'
import _size from 'lodash/size'
import ms from 'ms'
import { NextApiResponse } from 'next'

const octokit = new Octokit({ auth: process.env.GH_TOKEN })

// const redis = new Redis(process.env.REDIS_URL)
const keyPrefix = 'github'

// @see(buildInfo.js)
const branch = 'refactor/optimizations'
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

function getBranch(branch) {
  if (_size(branch.split('/')) > 1) {
    return branch.split('/')[1]
  }

  return branch
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

  // const _data = _filter(releases.data, { prerelease: true })
  const ___data = _orderBy(releases.data, ['published_at'], ['desc'])

  const dataBranch = _filter(___data, {
    target_commitish: branch,
  })
  const dataRelease = _filter(___data, { prerelease: false })

  const __data = _size(dataBranch) > 0 ? dataBranch[0] : dataRelease[0]

  const _data = _pick(__data, [
    'body',
    'tag_name',
    'target_commitish',
    'name',
    'prerelease',
    'published_at',
  ])

  const [version, prerelease] = _data.tag_name.replace('website-v', '').split('-')
  const [major, minor, patch] = version.split('.')

  const data = {
    branch: getBranch(branch),
    branchFull: branch,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isBranchMain: branch === 'main',
    major,
    minor,
    patch,
    prerelease: !!prerelease ? prerelease : getBranch(branch),
    version,
  }

  const debug = {
    key,
    latency: Date.now() - start,
    type: cache ? 'cache' : 'api',
  }

  return res.status(200).json({ ...data, debug })
}

export default githubApi
