const childProcess = require('child_process')
const { writeFile } = require('fs/promises')
const { join } = require('path')

const { Octokit } = require('@octokit/core')
const stringify = require('fast-json-stable-stringify')
const isCI = require('is-ci')
const _filter = require('lodash/filter')
const _orderBy = require('lodash/orderBy')
const _pick = require('lodash/pick')
const _size = require('lodash/size')
const prettier = require('prettier')

// const octokit = new Octokit({ auth: process.env.GH_TOKEN })
const octokit = new Octokit({})

const config = {
  owner: 'jeromefitz',
  repo: 'jeromefitzgerald.com',
}

const branch =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  childProcess
    // @note(git>=2.22)
    // .execSync(`git branch --show-current`)
    .execSync(`git rev-parse --abbrev-ref HEAD`)
    .toString()
    .trim()

function getBranch(branch) {
  return branch.split('/')[branch.split('/').length - 1]
}

/**
 * @todo(dynamic) owner/repo from package.json
 */
async function setupBuildInfo() {
  const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: config.owner,
    repo: config.repo,
    page: 1,
    per_page: 20,
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

  const data = {
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

  /**
   * @todo(dynamic) determine path for multi-site
   */
  const filePath = join(process.cwd(), './src/config/build-info.json')
  const content = prettier.format(stringify(data), { parser: 'json' })
  await writeFile(filePath, content)

  const message = [
    '',
    'build-info.json generated:',
    `›  v${version}`,
    `›  ${!data?.isBranchMain ? (!!prerelease ? prerelease : branch) : 'main'}`,
    '',
  ]
  const prefix = isCI ? '\x1b[0m%s\x1b[0m' : '\x1b[36m%s\x1b[0m'
  message.map((msg) => console.debug(prefix, 'info', ' - [ 📦 ] ', msg))
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

module.exports = { setupBuildInfo, withBuildInfo }
