import cx from 'clsx'
// import { motion } from 'framer-motion'
import NextLink from 'next/link'

import Emoji from '~components/Notion/Emoji'
import getInfoType from '~utils/notion/getInfoType'

const Link = ({ item, routeType }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType)
  const { icon, data: properties } = item
  const { seoDescription, title } = properties
  const key = `link-${slug}`
  const emoji = !!icon?.emoji ? icon.emoji : ''

  console.dir(`properties`)
  console.dir(properties)

  return (
    <>
      <NextLink as={as} href={href} key={key}>
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'text-black dark:text-white',
            'hover:text-green-500 dark:hover:text-yellow-200',
            'prose'
          )}
        >
          {emoji && <Emoji character={emoji} />}
          {title}
        </a>
      </NextLink>
      {!!seoDescription && <p className={cx('prose pb-2')}>{seoDescription}</p>}
    </>
  )
}

export default Link
