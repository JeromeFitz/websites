const childProcess = require('child_process')
const { writeFile } = require('fs/promises')
const { join } = require('path')

const { Octokit } = require('@octokit/core')
const _size = require('lodash/size')
const prettier = require('prettier')

const octokit = new Octokit({ auth: process.env.GH_TOKEN })

const branch = childProcess
  // @note(git>=2.22)
  // .execSync(`git branch --show-current`)
  .execSync(`git rev-parse --abbrev-ref HEAD`)
  .toString()
  .trim()
const isBranchMain = branch === 'main'

const tag = childProcess
  .execSync(`git fetch --tags -f -q && git describe --tags --abbrev=0`)
  .toString()
  .trim()

function getBranch(branch) {
  if (_size(branch.split('/')) > 1) {
    return branch.split('/')[1]
  }

  return branch
}

async function setupBuildInfo() {
  const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'jeromefitz',
    repo: 'jeromefitzgerald.com',
    page: 1,
    per_page: 20,
  })

  const tags = await octokit.request('GET /repos/{owner}/{repo}/tags', {
    owner: 'jeromefitz',
    repo: 'jeromefitzgerald.com',
  })

  const [version, prerelease] = tag.replace('website-v', '').split('-')
  const [major, minor, patch] = version.split('.')
  const data = {
    branch,
    isBranchMain,
    major,
    minor,
    patch,
    prerelease: !!prerelease ? prerelease : getBranch(branch),
    version,
    //
    tags,
    releases,
  }

  const filePath = join(process.cwd(), './src/config/buildInfo.json')
  const content = prettier.format(JSON.stringify(data), { parser: 'json' })
  await writeFile(filePath, content)
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

module.exports = { withBuildInfo }
