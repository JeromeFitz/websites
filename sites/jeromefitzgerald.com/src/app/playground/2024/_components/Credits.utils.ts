function getRelationTitle(str) {
  const title = str
    .split('.')
    .at(-1)
    .split(/(?=[A-Z])/)
    .join(' ')

  return title
}

export { getRelationTitle }
