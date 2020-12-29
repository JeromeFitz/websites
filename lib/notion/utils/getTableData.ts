import Slugger from 'github-slugger'
import { normalizeSlug } from '~lib/notion/helpers'
import queryCollection from '~lib/notion/utils/queryCollection'
import { values } from '~lib/notion/rpc'

export default async function getTableData(
  collectionBlock: any,
  isPosts = false,
  collectionId = null,
  collectionViewId = null
) {
  const slugger = new Slugger()

  const { value } = collectionBlock
  let table: any = {}

  let col
  if (!collectionId && !collectionViewId) {
    col = await queryCollection({
      collectionId: value.collection_id,
      // collectionViewId: value.view_ids[0], // @hack First one is default
      collectionViewId: value.view_ids[1], // @hack Second one is published
    })
  } else {
    col = await queryCollection({
      collectionId,
      collectionViewId,
    })
  }

  const entries = values(col.recordMap.block).filter((block: any) => {
    return block.value && block.value.parent_id === value.collection_id
  })

  const colId = Object.keys(col.recordMap.collection)[0]
  const schema = col.recordMap.collection[colId].value.schema
  const schemaKeys = Object.keys(schema)

  // console.dir(`> schemaKeys`)
  // console.dir(schemaKeys)

  for (const entry of entries) {
    const props = entry.value && entry.value.properties
    const row: any = {}

    if (!props) continue
    if (entry.value.content) {
      row.id = entry.value.id
    }

    schemaKeys.forEach((key) => {
      // @note might be undefined
      let val = props[key] && props[key][0][0]

      // console.dir(`> val`)
      // console.dir(val)

      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0]
        // console.dir(`> type: ${type}`)

        switch (type[0]) {
          /**
           * @type link
           */
          case 'a': {
            val = type[1]
            break
          }
          /**
           * @type user
           */
          case 'u': {
            val = props[key]
              .filter((arr: any[]) => arr.length > 1)
              .map((arr: any[]) => arr[1][0][1])
            break
          }
          /**
           * @type // page (block)
           */
          case 'p': {
            // const page = col.recordMap.block[type[1]]
            // row.id = page.value.id
            // val = page.value.properties.title[0][0]

            val = props[key]
              .filter((arr: any[]) => arr.length > 1)
              .map((arr: any[]) => arr[1][0][1])

            break
          }
          /**
           * @type date
           * start_date: 2019-06-18
           * start_time: 07:00
           * time_zone: Europe/Berlin, America/Los_Angeles
           */
          case 'd': {
            if (!type[1].start_date) {
              break
            }
            // initial with provided date
            const providedDate = new Date(
              type[1].start_date + ' ' + (type[1].start_time || '')
            ).getTime()

            // calculate offset from provided time zone
            const timezoneOffset =
              new Date(
                new Date().toLocaleString('en-US', {
                  timeZone: type[1].time_zone,
                })
              ).getTime() - new Date().getTime()

            // initialize subtracting time zone offset
            val = new Date(providedDate - timezoneOffset).getTime()
            break
          }
          /**
           * @type unknown
           * catch-all to see which ones we need to account for
           */
          default:
            console.error('unknown type', type[0], type)
            break
        }
      }

      if (typeof val === 'string') {
        val = val.trim()
      }
      row[schema[key].name] = val || null
    })

    /**
     * @description
     * if `slug` does not exist, attempt to auto-generate from `Title`
     */
    row.Slug = normalizeSlug(row.Slug || slugger.slug(row.Title || ''))

    /**
     * @todo Make determiniation on which to use. At one point `slug` made sense but with IDs being used everywhere in the relationships probably better to keep `slug` as cosmetic only.
     */
    // const key = row.Slug
    const key = row.id
    if (isPosts && !key) continue

    // @todo(published)
    if (row.id && row?.Published === 'Yes') {
      if (key) {
        table[key] = row
      } else {
        console.dir(`getTableData => else on row.id/key`)
        if (!Array.isArray(table)) table = []
        table.push(row)
      }
    }
  }

  return table
}
