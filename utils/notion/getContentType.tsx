import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
// import { ChevronUpIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import React from 'react'

import ImageCaption from '~components/Notion/ImageCaption'
// import Quote from '~components/Notion/Quote'
import { IMAGE__PLACEHOLDER, WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import { NotionBlock } from '~utils/notion'
import getContentTypeDetail from '~utils/notion/getContentTypeDetail'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {})

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]
  const slugger = new Slugger()

  // console.dir(`item`)
  // console.dir(item)
  // // console.dir(`type: ${type}`)

  switch (type) {
    /**
     * @note h1 = Title (Static Content) Type, increase Notion Headings
     */
    case 'heading_1':
      // console.dir(`heading_1`)
      // console.dir(content)
      return (
        <h2 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h2>
      )
    case 'heading_2':
      return (
        <h3 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h3>
      )
    case 'heading_3':
      return (
        <h4 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h4>
      )
    case 'paragraph':
      return <p key={id}>{getContentTypeDetail(content)}</p>
    case 'bulleted_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'numbered_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'image':
      const imageSlug = slugger.slug(content?.external?.url)
      const imageData = !!imageSlug && !!images && images[imageSlug]
      const caption = _size(content?.caption) > 0 && content?.caption[0]?.plain_text
      // console.dir(`getContentType`)
      // console.dir(`imageSlug: ${imageSlug}`)
      // console.dir(images)
      // console.dir(`imageData`)
      // console.dir(imageData)

      return !!imageData ? (
        <div className="w-2/3 mx-auto" key={id}>
          <NextImage
            alt={!!caption ? caption : ''}
            blurDataURL={imageData.base64}
            key={imageSlug}
            placeholder="blur"
            title={!!caption ? caption : ''}
            {...imageData.img}
          />
          {!!caption && <ImageCaption caption={caption} />}
        </div>
      ) : (
        <div className="w-2/3 h-full mx-auto overflow-hidden" key={id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={!!caption ? caption : ''}
            className="nonNextNoStaticProps"
            src={content?.external?.url}
            style={{
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%',
              backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
            }}
          />
          {!!caption && <ImageCaption caption={caption} />}
        </div>
      )
    case 'text':
    case 'title':
    case 'rich_text':
      // @todo(notion)
      return _size(content) > 0 ? content[0].plain_text : ''
    case 'files':
      // @todo(notion)
      return _size(content) > 0 ? content[0].external.url : ''
    case 'url':
      // @todo(notion)
      return content
    case 'date':
      // @todo(notion)
      return content
    case 'checkbox':
      // @todo(notion)
      return content
    case 'multi_select':
      // @todo(notion)
      return _map(content, (tag) => (
        <li
          className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
          key={tag.id}
        >
          {tag.name}
        </li>
      ))
    case 'relation':
      return !!content[0] && content
    case 'quote':
      if (_size(content) > 0) {
        return (
          <div key={id} className={cx('py-4')}>
            <div
              className={cx(
                'rounded-xl bg-secondary text-primary m-8 p-8 flex',
                'align-middle justify-start items-start',
                'text-2xl leading-normal'
              )}
            >
              <span className={cx('mb-0 pb-0')}>
                <Emoji character={`📰️`} />
              </span>
              <blockquote className={cx('ml-4')}>
                {getContentTypeDetail(content)}
              </blockquote>
            </div>
          </div>
        )
      }
      return null
    case 'callout':
      if (_size(content) > 0) {
        const {
          icon: { emoji },
        } = content
        return (
          <div
            key={id}
            className={cx(
              'rounded-xl bg-secondary text-primary m-8 p-8 flex',
              'align-middle justify-start items-start',
              'text-2xl leading-normal'
            )}
          >
            <span className={cx('mb-0 pb-0')}>
              {emoji && <Emoji character={emoji} />}
            </span>
            <h6 className={cx('ml-4')}>{getContentTypeDetail(content)}</h6>
          </div>
        )
      }
      return null
    case 'toggle':
      if (!has_children) return null
      // console.dir(content)
      // if (_size(content) > 0) {
      // console.dir(`!!`)
      const nodeContent = _map(content.children, (content) =>
        getContentType(content)
      )
      console.dir(`nodeContent`)
      console.dir(nodeContent)
      // }
      // return null
      return (
        <div className="w-full px-4 pt-16" key={id}>
          <div className="w-full max-w-md p-2 mx-auto bg-info-lighter rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex flex-row">
                    {getContentTypeDetail(content)}
                    {` `}Open: {open ? 'yes' : 'no'}
                    {open ? (
                      <ChevronUpIcon className={cx('text-green-400 w-5 h-5')} />
                    ) : (
                      <ChevronDownIcon className={cx('text-green-400 w-5 h-5')} />
                    )}
                  </Disclosure.Button>

                  {/*
          Use the Transition + open render prop argument to add transitions.
        */}
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    {/*
            Don't forget to add `static` to your Disclosure.Panel!
          */}
                    <Disclosure.Panel
                      className="px-4 pt-4 pb-2 text-sm text-gray-500"
                      static
                    >
                      {nodeContent}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )
    default:
      console.dir(`@unsupported(notion): ${type}`)
      break
  }
}

export default getContentType
