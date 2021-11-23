const config = require('@jeromefitz/semantic/src/changelog.config.js')

const changelog = {
  ...config,
  commit: {
    ...config.commit,
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

module.exports = changelog
