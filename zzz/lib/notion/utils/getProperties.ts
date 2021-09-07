import _map from 'lodash/map'
import _merge from 'lodash/merge'

import { fetchCmsAPI } from '~lib/notion'
import getValues from '~lib/notion/utils/getValues'
import getTimestamp from '~utils/getTimestamp'

const nonPreviewTypes = new Set(['editor', 'page', 'collection_view'])

const getProperties = async ({ blocks, routeType, schema }) => {
  if (blocks === undefined) {
    throw new Error(`expandTest: blocks must be provided`)
  }
  if (routeType === undefined) {
    throw new Error(`expandTest: routeType must be provided`)
  }
  if (schema === undefined) {
    throw new Error(`expandTest: schema must be provided`)
  }

  // @remove(_schema) This is not referenced later
  // const _schema = {}
  // await _map(schema, (_s, _sId) => {
  //   _schema[_s.name] = { ..._s, _id: _sId }
  // })

  const properties = {}
  _map(blocks, (block) => {
    // console.dir(`>> block.value.content`)
    // console.dir(block.value.content)
    // console.dir(`>> block.value.properties`)
    // console.dir(block.value.properties)
    block.props = {}
    block.propz = {}
    block.preview = {}
    /**
     * Cycle through Schema
     */
    _map(schema, (_s, _sId) => {
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
            // console.dir(`[x] checkbox|text|title`)
            // console.dir(`>>> schemaKey`)
            // console.dir(schemaKey)
            // console.dir(`>>> property`)
            // console.dir(property)
            propertyValue = property[0][0]
            // console.dir(`>>> propertyValue`)
            // console.dir(propertyValue)
            break
          case 'multi_select':
            // console.dir(`[x] multi_select`)
            propertyValue = property[0][0].split(',').join(' ')
            // console.dir(propertyValue)
            break
          case 'date':
            // console.dir(`[x] date`)
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
            // console.dir(`__ link`)
            // console.dir(property)
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
            // console.dir(`> default (nothing): ${_s.type}`)
            propertyValue = null
            break
        }
        block.propz[_s.name] = propertyValue
      }
    })

    _map(block.value.properties, (property, propertyKey) => {
      const schemaKey = schema[propertyKey]
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
      const getRecordValues = _map(
        block.value.content,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_content, _contentKey) => ({
          table: 'block',
          id: _content,
        })
      )
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
          // console.dir(`~~ getStaticNotion: ${routeType}`)
          // console.dir(`~~ block.props.Slug: ${block.props.Slug}`)
          // nextHref = `/${routeType}/[...catchAll]`
          nextHref = `/[...catchAll]`
          nextAs = `/${routeType}/${block.props.Slug}`

          block.props.NextLink.href = nextHref
          block.props.NextLink.as = nextAs
          block.propz.NextLink.href = nextHref
          block.propz.NextLink.as = nextAs

          break
        case 'podcastEpisodes':
          // console.dir(`~~ getStaticNotion: ${routeType}`)
          // console.dir(`~~ block.props`)
          // console.dir(block.props)
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
    // console.dir(block)
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await Promise.all(_map(properties, (_p: any) => false))
  /**
   * Column Data
   */
  await Promise.all(
    _map(properties, async (_p: any) => {
      const contentResults = await fetchCmsAPI(
        'getRecordValues',
        properties[_p.value.id].contentRequests
      )
      /**
       * Clean Content Data...
       */
      _map(contentResults.results, (_c: any, _cId: any) => {
        // console.dir(`>> clean content data yo...`)
        // console.dir(`>> _c`)
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
      previewBlocks = getValues(contentResults.results)
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
        // console.dir(`_p...`)
        // console.dir(_p)
        await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _map(_p.content, async (_p2: any, _p2Id: any) => {
            // console.dir(`_p2...`)
            // console.dir(_p2)
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
                  // ] = await fetchCmsApi(
                  const contentResults__columns = await fetchCmsAPI(
                    'getRecordValues',
                    contentRequests__columns
                    // properties[_pId]['contentRequests__columns'][
                    //   _p2.value.id
                    // ][columnID]
                  )
                  // console.dir(`> end: contentResults__columns`)

                  // properties[_pId]['contentRequests__columns__children'][
                  //   _p2.value.id
                  // ][columnID] = await {
                  const contentRequests__columns__children = {
                    // requests: await properties[_pId][
                    //   'contentResults__columns'
                    // ][_p2.value.id][columnID].results[0].value.content.map(
                    requests:
                      await contentResults__columns.results[0].value.content.map(
                        (contentId) => ({
                          table: 'block',
                          id: contentId,
                        })
                      ),
                  }

                  const columnResults = await fetchCmsAPI(
                    'getRecordValues',
                    contentRequests__columns__children
                    // properties[_pId]['contentRequests__columns__children'][
                    //   _p2.value.id
                    // ][columnID]
                  )
                  // console.dir(`> end: contentResults__columns__children`)
                  /**
                   * Clean Content Data...
                   */
                  _map(columnResults.results, (_c: any, _cId: any) => {
                    // console.dir(`>> clean content data yo...`)
                    // console.dir(`>> _c`)
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

  return properties
}

export default getProperties
