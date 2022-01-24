const childProcess = require('child_process')

const isCI = require('is-ci')

const latestCommitHash = childProcess
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()

const latestCommitSubject = childProcess
  .execSync(`git log --format=%B -n 1 ${latestCommitHash} | cat -`)
  .toString()
  .trim()

const branchCurrent = childProcess
  // @note(git>=2.22)
  // .execSync(`git branch --show-current`)
  .execSync(`git rev-parse --abbrev-ref HEAD`)
  .toString()
  .trim()

const isBranchMain = branchCurrent === 'main'
// const shouldThisBuild =
//   isBranchMain ||
//   // @todo(ci) eventTypeCron override even if no [b|build]
//   latestCommitSubject.includes('[build]') ||
//   latestCommitSubject.includes('[b]')

const gitRemote = isCI ? 'upstream' : 'origin'
const debuggingGit = childProcess.execSync(`git remote -v`).toString().trim()

const tag = childProcess
  .execSync(`git fetch ${gitRemote} --tags -f -q && git describe --tags --abbrev=0`)
  .toString()
  .trim()

const getReleaseInfo = (tag) => {
  // ex: website-v8.0.0
  // ex. website-v8.0.0-annihilus.1
  // @todo(replace) this needs to be more dynamic or something, heh
  const t = tag.replace('website-v', '')
  const [version, prerelease] = t.split('-')
  const [major, minor, patch] = version.split('.')
  return { major, minor, patch, prerelease, version }
}

module.exports.branchCurrent = branchCurrent
module.exports.isBranchMain = isBranchMain
module.exports.getReleaseInfo = getReleaseInfo
module.exports.debuggingGit = debuggingGit
module.exports.tag = tag
