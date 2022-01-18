import isCI from 'is-ci'

if (!isCI) {
  const dotenv = await import('dotenv')
  dotenv.config({ path: './.env' })
}

const isOverride = process.env.GIT_CZ__OVERRIDE_TEST || false

const enabled = isOverride

const _types = {}

const commit = isOverride
  ? {
      after: { branchName: ' ', emoji: '  ', scope: ') ' },
      before: { branchName: '', emoji: '', scope: '(' },
      format: '{emoji}{scope}{branchName}{subject}',
      maxMessageLength: 64,
      minMessageLength: 3,
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
      scopes: [],
    }
  : {}

const branch = {}

const types = isOverride ? _types : {}

const changelog = { branch, commit, enabled, types }

export default changelog
