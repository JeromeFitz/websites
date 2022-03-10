import Slugger from 'github-slugger'

const getKeysByJoin = ({ keyData, keyJoin = '/', keyPrefix }) =>
  `${keyPrefix}/${keyData.join(keyJoin)}`.toLowerCase()

const getKeysBySlugger = ({ keyData, keyPrefix }) =>
  `${keyPrefix}/${Slugger.slug(keyData)}`.toLowerCase()

export { getKeysByJoin, getKeysBySlugger }
