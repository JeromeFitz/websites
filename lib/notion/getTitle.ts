const getTitle = (title) =>
  title
    .replace('people', '')
    .replace('rollup', '')
    .replace('CastGuest', 'Guest Performer')
    .replace('CastPast', 'Cast Emeritus')
    .replace('DirectorMusical', 'Musical Director')
    .replace('DirectorTechnical', 'Technical Director')
    .replace('MusicGuest', 'Musical Guest')
    .replace('eventsLineupShowIds', 'Lineup')
    .replace('tags', 'Tag')

export default getTitle
