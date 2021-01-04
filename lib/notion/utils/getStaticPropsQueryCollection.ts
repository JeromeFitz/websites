import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _merge from 'lodash/merge'
import path from 'path'
import getTimestamp from '~utils/getTimestamp'
import { readFile, writeFileSyncRecursive } from '~lib/notion/helpers/fs-helpers'
import rpc, { values } from '~lib/notion/rpc'
import generateQueryCollection from '~lib/notion/utils/generateQueryCollection'
import getRouteTypeSeo from '~lib/notion/utils/getRouteTypeSeo'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDebug = false

/**
 * @todo Make this a `process.env.CACHE` variable YIKES DOES NOT WORK LIVE
 */
// const useCache = process.env.NODE_ENV === 'production'
const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const nonPreviewTypes = new Set(['editor', 'page', 'collection_view'])
// const getBlocks = async (data) =>
//   await rpc('getRecordValues', {
//     requests: data?.map((id: string) => ({
//       id,
//       table: 'block',
//     })),
//   })

const getStaticPropsQueryCollection = async ({
  indexId,
  collectionId,
  collectionViewId,
  id,
  itemDate,
  preview,
  routeType,
  slug,
  url,
}) => {
  isDebug && console.dir(` ~~~ getStaticPropsQueryCollection ~~~`)
  let cacheData
  /**
   * @ref https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
   */
  const cacheFile = path.join(
    process.cwd(),
    '.cache',
    `${url === '/' ? 'index' : url}.json`
  )
  isDebug && console.dir(`> cacheFile: ${cacheFile}`)

  if (useCache) {
    try {
      cacheData = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      isDebug && console.dir(`> cacheFile: not found`)
      /* not fatal */
    }
  }

  if (!cacheData) {
    const getQueryCollection = generateQueryCollection({
      collectionId,
      collectionViewId,
      indexId,
      itemDate,
      preview,
      routeType,
      slug,
    })
    let routeTypeSeo: any = null
    if (!slug) {
      routeTypeSeo = await getRouteTypeSeo(routeType)
    }

    // isDebug && console.dir(`> getQueryCollection`)
    // isDebug && console.dir(getQueryCollection)
    // isDebug && console.dir(collectionId)
    // isDebug && console.dir(collectionViewId)

    const data = await rpc('queryCollection', getQueryCollection.payload)
    // isDebug && console.dir(`> data`)
    // isDebug && console.dir(data)

    /**
     * old
     */
    // const tableBlock = await values(data.recordMap.block).find(
    //   (block: any) => block.value.type === 'collection_view_page' // full-page
    //   // (block: any) => block.value.type === 'collection_view_block' // inline
    //   // NEXT_PUBLIC__NT__VENUES === notionIndex
    //   //   ? (block: any) => block.value.type === 'collection_view'
    //   //   : (block: any) => block.value.type === 'collection_view_page'
    // )
    // isDebug && console.dir(`> tableBlock`)
    // isDebug && console.dir(tableBlock)

    // const blocks = await getBlocks(data.recordMap.block)
    const blocks = await _filter(data.recordMap.block, {
      value: { alive: true, parent_table: 'collection', type: 'page' },
    })
    // const blocksDeux = values(data.recordMap.block).find(
    //   (block: any) =>
    //     block.value.alive === true &&
    //     block.value.parent_table === 'collection' &&
    //     block.value.type === 'page'
    // )
    // isDebug && console.dir(`> blocks`)
    // isDebug && console.dir(blocks)
    // // isDebug && console.dir(`> blocksDeux`)
    // // isDebug && console.dir(blocksDeux)
    // // isDebug && console.dir(blocks[0])

    // const notionData = await getTableData(
    //   tableBlock,
    //   true,
    //   collectionId,
    //   collectionViewId
    // )
    // isDebug && console.dir(`> notionData`)
    // isDebug && console.dir(notionData)
    // isDebug && console.dir(`___`)
    // isDebug && console.dir(getQueryCollection)
    // isDebug && console.dir(getQueryCollection.schema)
    const schema = {}
    await _map(getQueryCollection.schema, (_s, _sId) => {
      schema[_s.name] = { ..._s, _id: _sId }
    })

    const properties = {}
    await _map(blocks, async (block) => {
      // isDebug && console.dir(`>> block.value.content`)
      // isDebug && console.dir(block.value.content)
      // isDebug && console.dir(`>> block.value.properties`)
      // isDebug && console.dir(block.value.properties)
      block.props = {}
      block.propz = {}
      block.preview = {}
      /**
       * Cycle through Schema
       */
      await _map(getQueryCollection.schema, (_s, _sId) => {
        // block.propz[_s.name] = block.value.properties[_sId] || null
        // await _map(block.value.properties, async (_p, _pId) => {
        //   block.propz[_s.name] = _p
        // })
        block.propz[_s.name] = null
        if (block.value.properties[_sId]) {
          const property = block.value.properties[_sId]
          let propertyValue: any
          block.propz.NextLink = {}

          switch (_s?.type) {
            case 'checkbox':
            case 'text':
            case 'title':
              // isDebug && console.dir(`[x] checkbox|text|title`)
              // isDebug && console.dir(`>>> schemaKey`)
              // isDebug && console.dir(schemaKey)
              // isDebug && console.dir(`>>> property`)
              // isDebug && console.dir(property)
              propertyValue = property[0][0]
              // isDebug && console.dir(`>>> propertyValue`)
              // isDebug && console.dir(propertyValue)
              break
            case 'multi_select':
              // isDebug && console.dir(`[x] multi_select`)
              propertyValue = property[0][0].split(',').join(' ')
              // isDebug && console.dir(propertyValue)
              break
            case 'date':
              // isDebug && console.dir(`[x] date`)
              propertyValue = property[0][1][0][1]
              if (!propertyValue.start_date || !propertyValue.time_zone) {
                break
              }
              // @todo(time_zone) Notion uses their own time zones, need to map
              propertyValue.time_zone = 'America/New_York'
              // initial with provided date
              const providedDate = new Date(
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                propertyValue.start_date + ' ' + (propertyValue.start_time || '')
              ).getTime()

              // calculate offset from provided time zone
              const timezoneOffset =
                new Date(
                  new Date().toLocaleString('en-US', {
                    timeZone: propertyValue.time_zone,
                  })
                ).getTime() - new Date().getTime()

              // initialize subtracting time zone offset
              propertyValue = new Date(providedDate - timezoneOffset).getTime()
              propertyValue = _merge(
                { time_zone: property[0][1][0][1].time_zone },
                getTimestamp(propertyValue)
              )
              break
            case 'file':
              propertyValue = property[0][0]
              break
            case 'link':
              // isDebug && console.dir(`__ link`)
              // isDebug && console.dir(property)
              propertyValue = property[0][1]
              break
            /**
             * @type // page (block)
             */
            case 'relation': {
              // const page = col.recordMap.block[type[1]]
              // row.id = page.value.id
              // val = page.value.properties.title[0][0]
              propertyValue = property
                .filter((arr: any[]) => arr.length > 1)
                .map((arr: any[]) => arr[1][0][1])

              break
            }
            case 'number':
              propertyValue = parseFloat(property[0][0])
              break
            default:
              // isDebug && console.dir(`> default (nothing): ${_s.type}`)
              propertyValue = null
              break
          }
          block.propz[_s.name] = propertyValue
        }
      })

      await _map(block.value.properties, async (property, propertyKey) => {
        const schemaKey = getQueryCollection.schema[propertyKey]
        let propertyValue: any
        block.props.NextLink = {}
        switch (schemaKey?.type) {
          case 'checkbox':
          case 'text':
          case 'title':
            propertyValue = property[0][0]
            break
          case 'multi_select':
            propertyValue = property[0][0].split(',').join(' ')
            break
          case 'date':
            propertyValue = property[0][1][0][1]
            break
          case 'file':
            propertyValue = property[0][0]
            break
          default:
            propertyValue = null
            break
        }
        block.props[propertyValue && schemaKey.name] = propertyValue
        const getRecordValues = await _map(block.value.content, (_content: any) => ({
          table: 'block',
          id: _content,
        }))
        block.contentRequests = {
          requests: getRecordValues,
        }

        /**
         * events only right now...
         */
        let nextAs, nextHref
        switch (routeType) {
          case 'blog':
          case 'events':
            // nextHref = `/${routeType}/[...catchAll]`
            nextHref = `/[...catchAll]`
            nextAs =
              block?.props?.Date &&
              `/${routeType}/${block.props.Date.start_date.split('-').join('/')}/${
                block.props.Slug
              }`

            block.props.NextLink.href = nextHref
            block.props.NextLink.as = nextAs
            block.propz.NextLink.href = nextHref
            block.propz.NextLink.as = nextAs

            break
          case 'podcasts':
            // isDebug && console.dir(`~~ getStaticNotion: ${routeType}`)
            // isDebug && console.dir(`~~ block.props.Slug: ${block.props.Slug}`)
            // nextHref = `/${routeType}/[...catchAll]`
            nextHref = `/[...catchAll]`
            nextAs = `/${routeType}/${block.props.Slug}`

            block.props.NextLink.href = nextHref
            block.props.NextLink.as = nextAs
            block.propz.NextLink.href = nextHref
            block.propz.NextLink.as = nextAs

            break
          case 'podcastEpisodes':
            // isDebug && console.dir(`~~ getStaticNotion: ${routeType}`)
            // isDebug && console.dir(`~~ block.props`)
            // isDebug && console.dir(block.props)
            // nextHref = `/${routeType}/[...catchAll]`
            nextHref = `/[...catchAll]`
            nextAs = `/podcasts/${block.props.Tags}/${block.props.Slug}`

            block.props.NextLink.href = nextHref
            block.props.NextLink.as = nextAs
            block.propz.NextLink.href = nextHref
            block.propz.NextLink.as = nextAs

            break
          case 'shows':
          default:
            // nextHref = `/${routeType}/[slug]`
            nextHref = `/[...catchAll]`
            nextAs = block?.props?.Slug && `/${routeType}/${block.props.Slug}`

            block.props.NextLink.href = nextHref
            block.props.NextLink.as = nextAs
            block.propz.NextLink.href = nextHref
            block.propz.NextLink.as = nextAs
            break
        }
      })
      /**
       * @hack Move everything...
       */
      // isDebug && console.dir(block)
      properties[block.value.id] = block
      // properties[block.value.id] = _merge(
      //   block.propz,
      //   { id: block.value.id },
      //   { contentRequests: block.contentRequests }
      // )
    })

    /**
     * @hack My world is crumbling. Why does this work with a fake Promise ...
     */
    await Promise.all(await _map(properties, () => false))
    /**
     * Column Data
     */
    await Promise.all(
      await _map(properties, async (_p: any) => {
        const contentResults = await rpc(
          'getRecordValues',
          properties[_p.value.id].contentRequests
        )
        /**
         * Clean Content Data...
         */
        await _map(contentResults.results, (_c: any, _cId: any) => {
          // isDebug && console.dir(`>> clean content data yo...`)
          // isDebug && console.dir(`>> _c`)
          delete contentResults.results[_cId].role
          // delete contentResults.results[_cId].value.id
          delete contentResults.results[_cId].value.version
          // delete contentResults.results[_cId].value.type
          // delete contentResults.results[_cId].value.properties
          delete contentResults.results[_cId].value.created_time
          delete contentResults.results[_cId].value.last_edited_time
          delete contentResults.results[_cId].value.parent_id
          delete contentResults.results[_cId].value.parent_table
          delete contentResults.results[_cId].value.alive
          delete contentResults.results[_cId].value.copied_from
          delete contentResults.results[_cId].value.created_by_table
          delete contentResults.results[_cId].value.created_by_id
          delete contentResults.results[_cId].value.last_edited_by_table
          delete contentResults.results[_cId].value.last_edited_by_id
        })
        properties[_p.value.id] = { ..._p.propz }
        properties[_p.value.id]['id'] = _p.value.id
        properties[_p.value.id]['content'] = contentResults.results
        properties[_p.value.id]['routeType'] = routeType
        /**
         * Preview
         */
        let previewBlocks
        let previewDivider = 0
        previewBlocks = values(contentResults.results)
        for (let i = 0; i < previewBlocks.length; i++) {
          if (previewBlocks[i].value.type === 'divider') {
            previewDivider = i
            break
          }
        }
        previewBlocks = previewBlocks
          .splice(0, previewDivider)
          .filter(
            ({ value: { type, properties } }: any) =>
              !nonPreviewTypes.has(type) && properties
          )
          .map((block: any) => block.value.properties.title)

        properties[_p.value.id]['preview'] = previewBlocks

        return true
      })
    )

    await Promise.all(
      await Promise.all(
        _map(properties, async (_p: any, _pId) => {
          properties[_pId]['columns'] = {}
          // isDebug && console.dir(`_p...`)
          // isDebug && console.dir(_p)
          await Promise.all(
            _map(_p.content, async (_p2: any) => {
              // isDebug && console.dir(`_p2...`)
              // isDebug && console.dir(_p2)
              if (_p2.value.type === 'column_list') {
                // properties[_pId]['contentRequests__columns'] = {}
                // properties[_pId]['contentRequests__columns'][_p2.value.id] = {}
                // properties[_pId]['contentResults__columns'] = {}
                // properties[_pId]['contentResults__columns'][_p2.value.id] = {}
                // //
                // properties[_pId]['contentRequests__columns__children'] = {}
                // properties[_pId]['contentRequests__columns__children'][
                //   _p2.value.id
                // ] = {}
                // properties[_pId]['contentResults__columns__children'] = {}
                // properties[_pId]['contentResults__columns__children'][
                //   _p2.value.id
                // ] = {}

                properties[_pId]['columns'][_p2.value.id] = {}

                await Promise.all(
                  _p2.value.content.map(async (columnID) => {
                    // properties[_pId]['contentRequests__columns'][_p2.value.id][
                    //   columnID
                    // ] = await {
                    const contentRequests__columns = {
                      requests: [
                        {
                          table: 'block',
                          id: columnID,
                        },
                      ],
                    }
                    // properties[_pId]['contentResults__columns'][_p2.value.id][
                    //   columnID
                    // ] = await rpc(
                    const contentResults__columns = await rpc(
                      'getRecordValues',
                      contentRequests__columns
                      // properties[_pId]['contentRequests__columns'][
                      //   _p2.value.id
                      // ][columnID]
                    )
                    // isDebug && console.dir(`> end: contentResults__columns`)

                    // properties[_pId]['contentRequests__columns__children'][
                    //   _p2.value.id
                    // ][columnID] = await {
                    const contentRequests__columns__children = {
                      // requests: await properties[_pId][
                      //   'contentResults__columns'
                      // ][_p2.value.id][columnID].results[0].value.content.map(
                      requests: await contentResults__columns.results[0].value.content.map(
                        (contentId) => ({
                          table: 'block',
                          id: contentId,
                        })
                      ),
                    }

                    const columnResults = await rpc(
                      'getRecordValues',
                      contentRequests__columns__children
                      // properties[_pId]['contentRequests__columns__children'][
                      //   _p2.value.id
                      // ][columnID]
                    )
                    // isDebug && console.dir(`> end: contentResults__columns__children`)
                    /**
                     * Clean Content Data...
                     */
                    await _map(columnResults.results, (_c: any, _cId: any) => {
                      // isDebug && console.dir(`>> clean content data yo...`)
                      // isDebug && console.dir(`>> _c`)
                      delete columnResults.results[_cId].role
                      // delete columnResults.results[_cId].value.id
                      delete columnResults.results[_cId].value.version
                      // delete columnResults.results[_cId].value.type
                      // delete columnResults.results[_cId].value.properties
                      delete columnResults.results[_cId].value.created_time
                      delete columnResults.results[_cId].value.last_edited_time
                      delete columnResults.results[_cId].value.parent_id
                      delete columnResults.results[_cId].value.parent_table
                      delete columnResults.results[_cId].value.alive
                      delete columnResults.results[_cId].value.copied_from
                      delete columnResults.results[_cId].value.created_by_table
                      delete columnResults.results[_cId].value.created_by_id
                      delete columnResults.results[_cId].value.last_edited_by_table
                      delete columnResults.results[_cId].value.last_edited_by_id

                      return true
                    })
                    // properties[_pId]['contentResults__columns__children'][
                    //   _p2.value.id
                    // ][columnID] = columnResults.results
                    properties[_pId]['columns'][_p2.value.id][columnID] =
                      columnResults.results
                  })
                )
              }
            })
          )
        })
      )
    )

    /**
     * 404: Check
     * @todo Can we get this __earlier__ so we can avoid all of the above
     */
    let findVariables: any, foundItem: any
    if (slug) {
      findVariables = { Slug: slug }
      foundItem = _find(properties, findVariables)
    }

    // @todo(published)
    if (properties === {} && foundItem?.Published !== 'Yes' && !preview) {
      console.warn(`Failed to find:`)
      console.warn(`> routeType: ${routeType}`)
      console.warn(`> id:        ${id}`)
      console.warn(`> slug:      ${slug}`)
      return {
        props: {
          data: null, // @hack
          id: null, // @hack
          itemDate: null, // @hack
          episode: null, // @hack
          preview: preview || false,
          redirect: routeType === 'pages' ? '/' : `/${routeType}`,
          // redirect: `/${routeType}`,
          routeType,
          routeTypeSeo: routeTypeSeo ? routeTypeSeo : null,
          slug,
          foo: 'bar',
        },
        revalidate: 5, // [slug]
        // revalidate: 10, // index
      }
    }
    /**
     * Cache
     */
    isDebug && console.dir(`> routeTypeSeo, passProps`)
    isDebug && console.dir(routeTypeSeo)

    const passProps = {
      data: properties,
      episode: null,
      id: foundItem ? foundItem.id : null,
      itemDate,
      preview: preview || false,
      routeType: routeType === 'podcastEpisodes' ? 'podcasts' : routeType,
      routeTypeSeo: routeTypeSeo ? routeTypeSeo : null,
      slug,
      foo: 'baz',
    }
    cacheData = passProps

    if (useCache) {
      isDebug && console.dir(`> writeFileSyncRecursive: ${cacheFile}`)
      writeFileSyncRecursive(cacheFile, JSON.stringify(cacheData), 'utf8')
    }
  } else {
    // isDebug && console.dir(`_____ SKIP THE NOTION API CALLS ______`)
  }
  /**
   * Return
   */
  return {
    props: cacheData,
    revalidate: 10,
  }
}

export default getStaticPropsQueryCollection
