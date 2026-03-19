// import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { slug as _slug } from 'github-slugger'
import { find as _find, findKey as _findKey, map as _map } from 'lodash-es'

import { getRollupTitle } from '@/components/Credits/Credits.utils'

const ROLLUPS: string[] = [
  'rollupPeopleCastTitle',
  'rollupPeopleCrewTitle',
  'rollupPeopleDirectorTitle',
  'rollupPeopleDirectorMusicalTitle',
  'rollupPeopleDirectorTechnicalTitle',
  'rollupPeopleMusicTitle',
  'rollupPeopleProducerTitle',
  'rollupPeopleWriterTitle',
  'rollupPeopleThanksTitle',
  'rollupPeopleCastPastTitle',
]
const ROLLUPS_CAST: string[] = ['rollupPeopleCastTitle']
const ROLLUPS_CAST_EMERITUS: string[] = ['rollupPeopleCastPastTitle']
const ROLLUPS_CREW: string[] = [
  'rollupPeopleCrewTitle',
  'rollupPeopleDirectorTitle',
  'rollupPeopleDirectorMusicalTitle',
  'rollupPeopleDirectorTechnicalTitle',
  'rollupPeopleMusicTitle',
  'rollupPeopleProducerTitle',
  'rollupPeopleWriterTitle',
]
const ROLLUPS_THANKS: string[] = ['rollupPeopleThanksTitle']

function getCreditsByPerson(PEOPLE: any) {
  const PEOPLE_FINAL: any = []

  _map(PEOPLE, (_crew, relation) => {
    if (!_crew) return null
    _map(_crew, (_person) => {
      const _data = {
        headline: _person,
        id: _slug(_person),
        subline: getRollupTitle(relation),
      }
      const _idExists = _find(PEOPLE_FINAL, { id: _data.id })
      const _keyExists = _findKey(PEOPLE_FINAL, { id: _data.id })

      if (_keyExists) {
        PEOPLE_FINAL[_keyExists] = {
          ...PEOPLE_FINAL[_keyExists],
          subline: `${PEOPLE_FINAL[_keyExists].subline}, ${_data.subline}`,
        }
      } else {
        PEOPLE_FINAL.push(_data)
      }
    })
  })
  PEOPLE_FINAL.sort((a: { id: string }, b: { id: string }) =>
    a.id.localeCompare(b.id),
  )

  return PEOPLE_FINAL
}

export {
  getCreditsByPerson,
  ROLLUPS,
  ROLLUPS_CAST,
  ROLLUPS_CAST_EMERITUS,
  ROLLUPS_CREW,
  ROLLUPS_THANKS,
}
