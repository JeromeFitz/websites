import packageJson from '../package.json'

describe('📦️ Dependencies', () => {
  // ref: https://gist.github.com/jhorsman/62eeea161a13b80e39f5249281e17c39
  const semverRegex =
    /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/

  it('📌️ (deps)', () => {
    Object.values(packageJson.dependencies).forEach((version) => {
      expect(version).toMatch(semverRegex)
    })
  })

  it('📌️ (deps-dev)', () => {
    Object.values(packageJson.devDependencies).forEach((version) => {
      expect(version).toMatch(semverRegex)
    })
  })
})
