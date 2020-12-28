const tasks = (arr) => arr.join(' && ')

module.exports = {
  hooks: {
    'prepare-commit-msg': tasks([
      'pretty-quick --staged',
      'exec < /dev/tty',
      'git cz --hook || true',
    ]),
  },
}
