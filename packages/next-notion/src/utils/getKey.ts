import { slug as _slug } from 'github-slugger'

const getKeysByJoin = ({ keyData, keyJoin = '/', keyPrefix }) =>
  `${keyPrefix}/${keyData.join(keyJoin)}`.toLowerCase()

const getKeysBySlugger = ({ keyData, keyPrefix }) =>
  `${keyPrefix}/${_slug(keyData)}`.toLowerCase()

export { getKeysByJoin, getKeysBySlugger }
