import config, { commit as _commit } from '@jeromefitz/semantic/changelog.config.js'

const changelog = {
  ...config,
  commit: {
    ..._commit,
    questions: [
      'branchFlag',
      'commitBreakingFlag',
      'commitBreaking',
      // 'commitScopes',
      'commitTypes',
      'commitSubject',
      'commitBodyFlag',
      'commitBody',
    ],
  },
}

export default changelog
