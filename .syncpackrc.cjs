// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  dependencyTypes: [
    'dev', // devDependencies
    'local', // version
    'overrides', // overrides
    'peer', // peerDependencies
    'pnpmOverrides', // pnpm.overrides
    'prod', // dependencies
    'resolutions', // resolutions
  ],
  indent: '  ',
  lintFormatting: false,
  semverGroups: [
    {
      dependencies: ['semver*'],
      dependencyTypes: ['pnpmOverrides', 'resolutions'],
      isIgnored: true,
      label: 'ignore: semver',
      packages: ['**'],
    },
    {
      dependencies: ['server-only'],
      dependencyTypes: ['peer'],
      isIgnored: true,
      label: 'ignore: server-only',
      packages: ['**'],
    },
    {
      dependencies: ['**'],
      dependencyTypes: ['dev', 'local', 'overrides', 'prod'],
      label: 'types:  !peer',
      packages: ['**'],
      range: '',
    },
    {
      dependencies: ['**'],
      dependencyTypes: ['peer'],
      label: 'types:  peer',
      packages: ['**'],
      range: '^',
    },
  ],
  versionGroups: [
    {
      dependencies: ['@jeromefitz/date-fns-tz'],
      dependencyTypes: ['peer'],
      label: '@todo: @jeromefitz/date-fns-tz',
      packages: ['**'],
    },
    {
      dependencies: ['server-only'],
      dependencyTypes: ['peer'],
      label: '@todo: server-only',
      packages: ['**'],
    },
    {
      dependencies: ['$LOCAL'],
      dependencyTypes: ['dev', 'prod'],
      label: 'workspace protocol when local',
      pinVersion: 'workspace:*',
    },
  ],
}

module.exports = config
