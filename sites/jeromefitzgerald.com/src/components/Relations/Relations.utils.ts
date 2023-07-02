function getRelationTitle(str) {
  const title = str
    .split('.')
    .at(-1)
    .split(/(?=[A-Z])/)
    .join(' ')

  // console.dir(`title: ${title}`)

  return title
}

export { getRelationTitle }
