function getRelationTitle(str?: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title = str
    .split('.')
    .at(-1)
    .split(/(?=[A-Z])/)
    .join(' ')

  return title
}

function getRollupTitle(str: string) {
  const title = str
    .replace('rollupPeople', '')
    .replace('rollupShows', '')
    .replace('Title', '')
    .replace('PrimaryCast', 'Cast')
    .replace('CastPast', 'Cast Emeritus')
    .replace('DirectorMusical', 'Musical Director')
    .replace('DirectorTechnical', 'Technical Director')

  return title
}

export { getRelationTitle, getRollupTitle }
