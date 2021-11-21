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
    // @refactor() remove above once below is solidified
    .replace('Shows__People_Cast', 'Cast')
    .replace('Shows__People_Cast_Slugs', 'Cast Slug')

export default getTitle
