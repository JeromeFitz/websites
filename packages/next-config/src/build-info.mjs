import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { Octokit } from '@octokit/core'
import stringify from 'fast-json-stable-stringify'
import isCI from 'is-ci'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _pick from 'lodash/pick.js'
import _size from 'lodash/size.js'

// import { format } from 'prettier'

if (!isCI) {
  const dotenv = await import('dotenv')
  dotenv.config({ path: './.env', quiet: true })
}

// const octokit = new Octokit({ auth: process.env.OCTOKIT_TOKEN })
const octokit = new Octokit({})

const branch =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  execSync(`git rev-parse --abbrev-ref HEAD`).toString().trim()

function getBranch(branch) {
  return branch.split('/')[branch.split('/').length - 1]
}

/**
 * @todo(dynamic) owner/repo from package.json
 */
// @todo(complexity) 15
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
async function setupBuildInfo({ buildInfoConfig, pathDirName }) {
  /**
   * @todo(dynamic) determine path for multi-site
   */
  const filePath = join(pathDirName, './src/config/build-info.json')
  const hasBuildInfo = existsSync(filePath)

  let data = {}

  if (hasBuildInfo) {
    const foo = readFileSync(filePath)
    data = JSON.parse(foo)
  } else {
    const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: buildInfoConfig.owner,
      page: 1,
      per_page: 20,
      repo: buildInfoConfig.repo,
    })

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

    data = {
      branch: getBranch(branch),
      branchFull: branch,
      // @note(vercel) weird stuff w/ this `refs/heads/main`
      isBranchMain: branch === 'main' || branch === 'refs/heads/main',
      major,
      minor,
      patch,
      prerelease: !!prerelease ? prerelease : getBranch(branch),
      version,
    }

    // const content = format(stringify(data), { parser: 'json' })
    const content = stringify(data)
    await writeFile(filePath, content)
  }

  const message = [
    '',
    `OVERRIDE_CACHE: ${process.env.OVERRIDE_CACHE ? 'true' : 'false'}`,
    '',
    `build-info.json: ${hasBuildInfo ? 'exists' : 'generated'}`,
    `›  v${data?.version}`,
    `›  ${
      !data?.isBranchMain
        ? !!data?.prerelease
          ? data?.prerelease
          : data?.branch
        : 'main'
    }`,
    '',
  ]
  const debugType = 'info'
  const debugWithNext = !isCI ? debugType : `\x1b[36m${debugType}\x1b[0m`
  message.map((msg) => console.debug('-', debugWithNext, '[ 📦 ] ', msg))
  console.debug()
}

/**
 *
 * @hack next.config
 *
 * hi-jack `rewrites` to use `async` during build process.
 */
function withBuildInfo(nextConfig = {}) {
  const { rewrites } = nextConfig
  nextConfig.rewrites = async (...args) => {
    await setupBuildInfo()
    return rewrites?.(...args) ?? {}
  }

  return nextConfig
}

export { setupBuildInfo, withBuildInfo }
