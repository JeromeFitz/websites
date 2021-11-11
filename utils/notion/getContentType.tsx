import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import cx from 'clsx'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/Accordion'
import ImageCaption from '~components/Notion/ImageCaption'
import { IMAGE__PLACEHOLDER, WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import {
  Box,
  Flex,
  Heading,
  Paragraph,
  Separator,
  Text,
} from '~styles/system/components'
import { darkTheme, styled, keyframes } from '~styles/system/stitches.config'
import { NotionBlock } from '~utils/notion'
import getContentTypeDetail from '~utils/notion/getContentTypeDetail'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {})

const focusInNonNext = keyframes({
  '0%': {
    filter: 'blur(50px)',
    transform: 'scale(0.5)',
  },
  '50%': {
    filter: 'blur(25px)',
    transform: 'scale(0.75)',
  },
  '100%': {
    filter: 'blur(0)',
    transform: 'scale(1)',
  },
})

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: '$colors$gray12',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px $colors$blackA7`,
  [`.${darkTheme} &`]: {
    boxShadow: `0 2px 10px $colors$whiteA5`,
  },
  '&:hover': { backgroundColor: '$colors$gray7' },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&:disabled': {
    backgroundColor: '$slate3',
    pointerEvents: 'none',
    color: '$slate8',
  },
  '&[data-state="checked"]': {
    backgroundColor: '$colors$gray7',
    pointerEvents: 'none',
    color: '$colors$gray7',
    '&:disabled': {
      backgroundColor: '$slate1',
      pointerEvents: 'none',
      color: '$slate2',
    },
  },
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$colors$gray12',
})
const Label = styled('label', {
  color: '$colors$gray12',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
})

// Exports
const Checkbox = StyledCheckbox
const CheckboxIndicator = StyledIndicator

class ContentTypes {
  constructor(private contentType: string) {}

  getContentType(): string {
    return this.contentType
  }

  callout({ content, id }) {
    if (_size(content) > 0) {
      const {
        icon: { emoji },
      } = content
      return (
        <Box key={id} css={{ py: '$4' }}>
          <Flex
            css={{
              br: '0.75rem',
              bc: '$colors$gray12',
              color: '$colors$gray1',
              m: '$6',
              p: '$6',
              dispaly: 'flex',
              verticalAlign: 'middle',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              lineHeight: '1.5',
              fontSize: '$6',
            }}
          >
            <Text
              as="span"
              css={{ mb: 0, pb: 0, color: 'inherit', fontSize: 'inherit' }}
            >
              {emoji && <Emoji character={emoji} />}
            </Text>
            <Text as="h6" css={{ ml: '$4', color: 'inherit', fontSize: 'inherit' }}>
              {getContentTypeDetail({ content, id })}
            </Text>
          </Flex>
        </Box>
      )
    }
    return null
  }

  column({ content, has_children, id }) {
    if (!has_children) return null
    const nodeContent = _map(content.column.children, (content) =>
      getContentType(content)
    )
    return (
      <Flex
        key={id}
        direction="column"
        css={{ flex: '1 1', my: '$2', '@bp1': { my: '$2', paddingRight: '.75rem' } }}
      >
        {nodeContent}
      </Flex>
    )
  }

  columnList({ content, id }) {
    const nodeContentParent = _map(content.children, (child) =>
      this.column({ content: child, has_children: child.has_children, id: child.id })
    )
    return (
      <Flex
        key={id}
        justify="between"
        css={{
          display: 'flex',
          flexDirection: 'column',
          my: '$3',
          '@bp1': { flexDirection: 'row' },
        }}
      >
        {nodeContentParent}
      </Flex>
    )
  }
  ['column_list']({ content, id }) {
    return this.columnList({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content({ content, id }) {
    return content
  }
  ['checkbox']({ content, id }) {
    return this.content({ content, id })
  }
  ['date']({ content, id }) {
    return this.content({ content, id })
  }
  ['url']({ content, id }) {
    return this.content({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  divider({ content, id }) {
    return (
      // <div className={cx('spacer bg-gray-600 dark:bg-gray-300 my-6')} key={id} />
      <Box css={{ width: '100%', my: '$6' }} key={id}>
        <Separator css={{ margin: '0', width: '100% !important' }} />
      </Box>
    )
  }

  files({ content, id }) {
    return _size(content) > 0 ? (
      <React.Fragment key={id}>content[0].external.url</React.Fragment>
    ) : null
  }

  /**
   * @note h1 = Title (Static Content) Type, increase Notion Headings
   */
  heading_1({ content, id }) {
    return (
      <Heading
        as="h2"
        css={{ fontWeight: '700', mb: '$4' }}
        key={id}
        size="3"
        style={WEBKIT_BACKGROUND__BREAK}
      >
        {getContentTypeDetail({ content, id })}
      </Heading>
    )
  }

  heading_2({ content, id }) {
    return (
      <Heading
        as="h3"
        css={{ mb: '$3' }}
        key={id}
        size="2"
        style={WEBKIT_BACKGROUND__BREAK}
      >
        {getContentTypeDetail({ content, id })}
      </Heading>
    )
  }

  heading_3({ content, id }) {
    return (
      <Heading
        as="h4"
        css={{ mb: '$2' }}
        key={id}
        size="1"
        style={WEBKIT_BACKGROUND__BREAK}
      >
        {getContentTypeDetail({ content, id })}
      </Heading>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image({ content, id, images, item }) {
    const contentHack = item.image
    const imageSrc =
      contentHack?.type === 'external'
        ? contentHack?.external.url
        : contentHack?.file.url
    const slugger = new Slugger()
    const imageSlug = slugger.slug(imageSrc)
    const imageData = !!imageSlug && !!images && images[imageSlug]
    const caption =
      (_size(contentHack?.caption) > 0 && contentHack?.caption[0]?.plain_text) || ''
    // console.dir(`getContentType`)
    // console.dir(`imageSlug: ${imageSlug}`)
    // console.dir(images)
    // console.dir(`imageData`)
    // console.dir(imageData)

    return !!imageData ? (
      <Box
        className="w-2/3 mx-auto"
        css={{
          height: '100%',
          ml: 'auto',
          mr: 'auto',
          overflow: 'hidden',
          width: '66.6667%',
          // maxWidth: '100%',
          // height: 'auto',
        }}
        key={id}
      >
        <NextImage
          alt={caption}
          blurDataURL={imageData.base64}
          key={imageSlug}
          placeholder="blur"
          title={caption}
          {...imageData.img}
        />
        {!!caption && <ImageCaption caption={caption} />}
      </Box>
    ) : (
      <Box
        className="w-2/3 h-full mx-auto overflow-hidden"
        css={{
          height: '100%',
          ml: 'auto',
          mr: 'auto',
          overflow: 'hidden',
          width: '66.6667%',
        }}
        key={id}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={caption}
          className="nonNextNoStaticProps"
          src={contentHack?.external?.url}
          style={{
            animation: `${focusInNonNext} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
            maxWidth: '100%',
            height: 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
          }}
        />
        {!!caption && <ImageCaption caption={caption} />}
      </Box>
    )
  }

  listItem({ content, id }) {
    return (
      <li key={id}>
        <Text
          size="3"
          css={{
            color: '$hiContrast',
            display: 'inline-block',
            lineHeight: '25px',
            mb: '$2',
          }}
        >
          {getContentTypeDetail({ content, id })}
        </Text>
      </li>
    )
  }
  ['bulleted_list_item']({ content, id }) {
    return this.listItem({ content, id })
  }
  ['numbered_list_item']({ content, id }) {
    return this.listItem({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multi_select({ content, id }) {
    return _map(content, (tag) => (
      <li
        className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
        key={tag.id}
      >
        {tag.name}
      </li>
    ))
  }

  paragraph({ content, id }) {
    return (
      <Paragraph key={id} css={{ mb: '$3', lineHeight: '1.5' }} size="1">
        {getContentTypeDetail({ content, id })}
      </Paragraph>
    )
  }

  quote({ content, id }) {
    if (_size(content) > 0) {
      return (
        <Box key={id} css={{ py: '$4' }}>
          <Flex
            css={{
              br: '0.75rem',
              backgroundColor: '$colors$violet9',
              color: 'white',
              m: '$1',
              mb: '$2',
              p: '$3',
              pb: '$4',
              dispaly: 'flex',
              verticalAlign: 'middle',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              lineHeight: '1.5',
              fontSize: '$6',
            }}
          >
            <Text
              as="span"
              css={{
                mb: 0,
                pb: 0,
                color: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
            >
              <Emoji character={`📰️`} />
            </Text>
            <Text
              as="blockquote"
              css={{
                ml: '$4',
                color: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
            >
              {getContentTypeDetail({ content, id })}
            </Text>
          </Flex>
        </Box>
      )
    }
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  relation({ content, id }) {
    return !!content[0] && content
  }

  text({ content, id }) {
    return _size(content) > 0 ? (
      <React.Fragment key={id}>content[0].plain_text</React.Fragment>
    ) : null
  }
  ['rich_text']({ content, id }) {
    return this.text({ content, id })
  }
  ['title']({ content, id }) {
    return this.text({ content, id })
  }

  to_do({ content, id }) {
    return (
      <Flex css={{ alignItems: 'center', my: '$2' }} key={`to_do--${id}`}>
        <Checkbox disabled checked={content.checked} id={id}>
          <CheckboxIndicator>
            <CheckIcon />
          </CheckboxIndicator>
        </Checkbox>
        <Label css={{ paddingLeft: 15 }} htmlFor={id}>
          {content.text[0].plain_text}
        </Label>
      </Flex>

      // <label
      //   className={cx('flex items-center space-x-3')}
      //   key={`${id}--to_do`}
      //   htmlFor={id}
      // >
      //   <input
      //     disabled
      //     type="checkbox"
      //     id={id}
      //     className={cx(
      //       'h-6 w-6',
      //       'form-tick appearance-none border border-gray-300 rounded-md  focus:outline-none',
      //       content.checked && 'checked:bg-blue-600 checked:border-transparent'
      //     )}
      //     checked={content.checked}
      //   />
      //   <span className={cx('text-gray-900 font-medium')}>
      //     {content.text[0].plain_text}
      //   </span>
      // </label>
    )
  }

  toggle({ content, has_children, id }) {
    if (!has_children) return null
    const title = getContentTypeDetail({ content, id })
    const nodeContent = _map(content.children, (content) => getContentType(content))
    return (
      <>
        <Accordion type="single" collapsible key={id}>
          <AccordionItem value={`toggle`}>
            {/* eslint-disable @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <AccordionTrigger>{title}</AccordionTrigger>
            {/* eslint-disable @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <AccordionContent>{nodeContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUnsupportedType = ({ content, id, type }) => {
  console.dir(`@unsupported(notion): ${type}`)
  // console.dir(content)
  return <React.Fragment key={id} />
}

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]
  // console.dir(`item`)
  // console.dir(item)
  // console.dir(`type: ${type}`)

  // @question(constructor) this needs to be reset each time
  const getContentTypes = new ContentTypes('')

  return getContentTypes[type]
    ? getContentTypes[type]({ content, has_children, id, images, item })
    : getUnsupportedType({ content, id, type })
}

export default getContentType
