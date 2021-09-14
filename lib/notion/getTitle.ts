const getTitle = (title) =>
  title
    .replace('people', '')
    .replace('DirectorMusical', 'Musical Director')
    .replace('DirectorTechnical', 'Technical Director')
    .replace('eventsLineupShowIds', 'Lineup')

export default getTitle
