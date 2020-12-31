import React, { CSSProperties } from 'react'
// import cx from 'clsx'
// import ReactJSXParser from 'react-jsx-parser'
// import NoSsr from '~components/NoSsr'

import components from '~components/Dynamic/dynamic'
import { textBlock } from '~lib/notion/helpers/renderers'

const listTypes = new Set(['bulleted_list', 'numbered_list'])
const columnTypes = new Set(['column_list'])

const renderNotionContent = (data) => {
  // console.dir(`> renderNotionContent`)
  // console.dir(data)
  let listTagName: any // string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  /**
   * @note Not sure why this is not picking up properly right now.
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  let columnTagName: string | null = null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  let columnLastId: string | null = null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  let columnMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  // console.dir(`> data.content`)
  // console.dir(data.content)
  /**
   * We should go through the `data.content` first to inspect and create a new object with any differences that are required?
   * I mean ... we need to "eject"/"remove"/"delete" the way notion sends column data __after__ everything and not inline. But hey ...
   */
  const skipTheseIds = []
  return (
    <>
      {(data?.content || []).map((block, blockIdx) => {
        const { value } = block
        const { type, properties, id, parent_id } = value
        const isLast = blockIdx === data.content.length - 1
        const isList = listTypes.has(type)
        const isListColumn = columnTypes.has(type)
        // eslint-disable-next-line prefer-const
        let toRender = []
        let toRenderColumn = []

        const isFound = skipTheseIds.includes(id)
        if (isFound) {
          // console.warn(`> Skipping Content for: ${id}`)
          return true
        }

        // const renderHeading = (Type: string | React.ComponentType) => {
        //   toRender.push(
        //     <Heading key={id} id={id}>
        //       <Type key={id}>{textBlock({parentKey: id, pRenderTag: true, text: properties.title)}</Type>
        //     </Heading>
        //   )
        // }

        const renderColumn = (data: any) => {
          // console.warn(`> renderColumn`)
          // console.dir(data)
          const columnData = renderNotionContent({ content: data })
          toRenderColumn.push(<components.Column>{columnData}</components.Column>)
        }

        if (isListColumn) {
          // console.warn(`📐️ isListColumn`)
          columnLastId = `column${id}`

          // const columnID = id
          const columnColumns = value.content
          // const columnColumnsSize = _size(columnColumns)

          // const test = columnColumns?.map((id: string) => ({
          //   id,
          //   table: 'block',
          // }))
          // console.dir(`> test`)
          // console.dir(test)

          columnColumns.map((columnID) => {
            // console.dir(`id:       ${id}`)
            // console.dir(`columnID: ${columnID}`)
            // console.dir(data.content)
            const columnData = data['columns'][id][columnID]

            columnData.map((column) => {
              skipTheseIds.push(column.value.id)
              return true
            })
            // console.warn(`📐️ renderColumn`)
            // console.dir(columnData)
            renderColumn(columnData)
            return true
          })

          toRender.push(
            <components.ColumnContainer content={toRenderColumn} id={id} key={id} />
          )
          toRenderColumn = []
          columnMap = {}
          columnLastId = null
          columnTagName = null
        }
        if (isList) {
          listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
          listLastId = `list${id}`

          listMap[id] = {
            key: id,
            nested: [],
            children: textBlock({
              parentKey: id,
              pTagRender: true,
              text: properties.title,
            }),
          }

          if (listMap[parent_id]) {
            listMap[id].isNested = true
            listMap[parent_id].nested.push(id)
          }
        }

        if (listTagName && (isLast || !isList)) {
          toRender.push(
            React.createElement(
              listTagName,
              { key: listLastId },
              Object.keys(listMap).map((itemId) => {
                if (listMap[itemId].isNested) return null

                const createEl = (item) =>
                  React.createElement(
                    components.li || 'ul',
                    // { key: item.key },
                    null,
                    item.children,
                    item.nested.length > 0
                      ? React.createElement(
                          components.ul || 'ul',
                          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                          // { key: item + 'sub-list' },
                          null,
                          item.nested.map((nestedId) => createEl(listMap[nestedId]))
                        )
                      : null
                  )
                return createEl(listMap[itemId])
              })
            )
          )
          listMap = {}
          listLastId = null
          listTagName = null
        }

        switch (type) {
          case 'collection_view_page': // @note Hrm ... way to dig into DBs from DB?
          case 'column_list':
          case 'column':
          case 'page': // @note There are values that may be "good" to display dynamically
            break
          case 'divider':
            toRender.push(<hr key={id} />)
            break
          case 'text':
            if (properties) {
              toRender.push(
                textBlock({
                  parentKey: id,
                  pTagRender: true,
                  text: properties.title,
                })
              )
            }
            break
          case 'image':
          case 'video':
          case 'embed': {
            const { format = {} } = value
            const {
              block_width,
              block_height,
              display_source,
              block_aspect_ratio,
            } = format
            const baseBlockWidth = 768
            const roundFactor = Math.pow(10, 2)
            // calculate percentages
            const width = block_width
              ? `${
                  Math.round((block_width / baseBlockWidth) * 100 * roundFactor) /
                  roundFactor
                }%`
              : block_height || '100%'

            const isImage = type === 'image'
            // const Comp = isImage ? 'img' : 'video'
            const useWrapper = block_aspect_ratio && !block_height
            const childStyle: CSSProperties = useWrapper
              ? {
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                }
              : {
                  width,
                  border: 'none',
                  height: block_height,
                  display: 'block',
                  maxWidth: '100%',
                }

            let child = null

            if (!isImage && !value.file_ids) {
              // external resource use iframe
              child = (
                <>
                  <iframe
                    style={childStyle}
                    src={display_source}
                    key={!useWrapper ? id : undefined}
                    className={!useWrapper ? 'asset-wrapper' : undefined}
                  />
                </>
              )
            } else {
              // notion resource
              const [caption] = properties?.caption || [null]
              // @todo(images)
              let [source] = properties?.source || [display_source]
              source = source[0]
              // const images = getImages(source)
              const images = source

              // console.dir(`images`)
              // console.dir(images)
              // const original = false
              // @todo(images) how can we inline with NextImage Notion/AWS? :X
              // const isNotionAws = images.original.includes('amazonaws')
              const isNotionAws = images.includes('amazonaws')
              // console.dir(`isNotionAws: ${isNotionAws}`)
              // @todo(images) Do this dynamically
              const imageHeight = 500
              const imageWidth = 500
              child = (
                <React.Fragment key={id}>
                  {/*
                  <Comp
                    alt={caption && caption}
                    autoPlay={!isImage}
                    controls={!isImage}
                    key={!useWrapper ? id : undefined}
                    loop={!isImage}
                    muted={!isImage}
                    src={`/api/na?assetUrl=${encodeURIComponent(
                      display_source
                    )}&blockId=${id}`}
                    style={childStyle}
                    title={caption && caption}
                  /> */}
                  {isNotionAws ? (
                    <React.Fragment />
                  ) : (
                    // <LazyLoadImage
                    //   alt={caption && caption}
                    //   delayTime={0}
                    //   delayMethod="throttle"
                    //   // effect="blur"
                    //   // height="100%"
                    //   placeholderSrc={images.placeholder}
                    //   sizes="(min-width: 900px) 50vw, 25vw"
                    //   src={images.mobile}
                    //   srcSet={
                    //     original
                    //       ? images.original
                    //       : `${images.mobile} 500w, ${images.tablet} 900w, ${images.desktop} 1280w, ${images.original} 2000w`
                    //   }
                    //   style={childStyle}
                    //   threshold={720}
                    //   title={caption && caption}
                    //   useIntersectionObserver={true}
                    //   visibleByDefault={false}
                    //   width="100%"
                    //   // wrapperClassName="gallery-img-wrapper"
                    // />
                    <React.Fragment>
                      <img
                        alt={caption && caption}
                        height={imageHeight}
                        src={images}
                        // style={childStyle}
                        title={caption && caption}
                        width={imageWidth}
                      />
                      {caption && (
                        <div>
                          <small className="block font-sans">
                            {caption && caption}
                          </small>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            }

            toRender.push(
              useWrapper ? (
                <div
                  style={{
                    // paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                    position: 'relative',
                  }}
                  className="asset-wrapper"
                  key={id}
                >
                  {child}
                </div>
              ) : (
                child
              )
            )
            break
          }
          case 'header':
            // renderHeading('h1')
            if (properties.title) {
              toRender.push(
                React.createElement(
                  components.h1,
                  // { key: id },
                  null,
                  properties.title
                )
              )
            }
            break
          case 'sub_header':
            // renderHeading('h2')
            if (properties.title) {
              toRender.push(
                React.createElement(
                  components.h2,
                  // { key: id },
                  null,
                  properties.title
                )
              )
            }
            break
          case 'sub_sub_header':
            // renderHeading('h3')
            if (properties.title) {
              toRender.push(
                React.createElement(
                  components.h3,
                  // { key: id },
                  null,
                  properties.title
                )
              )
            }
            break
          // case 'code': {
          //   if (properties.title) {
          //     const content = properties.title[0][0]
          //     const language = properties.language[0][0]

          //     if (language === 'LiveScript') {
          //       // this requires the DOM for now
          //       toRender.push(
          //         <ReactJSXParser
          //           key={id}
          //           jsx={content}
          //           components={components}
          //           componentsOnly={false}
          //           renderInpost={false}
          //           allowUnknownElements={true}
          //           blacklistedTags={['script', 'style']}
          //         />
          //       )
          //     } else {
          //       toRender.push(
          //         <components.Code key={id} language={language || ''}>
          //           {content}
          //         </components.Code>
          //       )
          //     }
          //   }
          //   break
          // }
          case 'quote': {
            if (properties.title) {
              toRender.push(
                React.createElement(
                  components.blockquote,
                  // { key: id },
                  null,
                  properties.title
                )
              )
            }
            break
          }
          // case 'callout': {
          //   // eslint-disable-next-line no-lone-blocks
          //   {
          //     /* <div className="callout" key={id}>
          //       {value.format?.page_icon && (
          //         <div>{value.format?.page_icon}</div>
          //       )}
          //       <div className="text">

          //       </div>
          //     </div> */
          //   }
          //   toRender.push(
          //     <Alert
          //       icon={value.format?.page_icon}
          //       severity="info"
          //       variant="standard"
          //     >
          //       {textBlock({
          //           parentKey: id,
          //           TagRender: true,
          //           text: properties.title
          //       })}
          //     </Alert>
          //   )
          //   break
          // }
          // // case 'column': {
          // //   toRender.push(<div>column</div>)
          // //   break
          // // }
          // // case 'column_list': {
          // //   toRender.push(<div>column_list</div>)
          // //   break
          // // }
          case 'tweet': {
            if (properties.html) {
              toRender.push(
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: properties.html }}
                    key={id}
                  />
                </>
              )
            }
            break
          }
          default:
            if (process.env.NODE_ENV !== 'production' && !listTypes.has(type)) {
              // console.dir(`> renderNotionContent`) */
              console.warn('unknown type', type)
            }
            break
        }
        return toRender
      })}
    </>
  )
}

export default renderNotionContent
