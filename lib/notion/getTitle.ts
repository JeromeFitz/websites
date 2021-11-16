const getTitle = (title) =>
  title
    .replace('people', '')
    .replace('rollup', '')
    .replace('CastGuest', 'Special Guest')
    .replace('CastPast', 'Cast Emeritus')
    .replace('DirectorMusical', 'Musical Director')
    .replace('DirectorTechnical', 'Technical Director')
    .replace('eventsLineupShowIds', 'Lineup')
    .replace('tags', 'Tag')

export default getTitle
