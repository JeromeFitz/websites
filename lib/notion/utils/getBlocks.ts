import _filter from 'lodash/filter'

const getBlocks = (block) =>
  _filter(block, {
    value: { alive: true, parent_table: 'collection', type: 'page' },
  })

export default getBlocks
