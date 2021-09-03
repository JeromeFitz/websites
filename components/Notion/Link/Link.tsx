import cx from 'clsx'
import NextLink from 'next/link'

import getInfoType from '~utils/notion/getInfoType'

const Link = ({ item, routeType }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType)
  const { icon, properties } = item
  const key = `link-${slug}`
  const emoji = !!icon?.emoji ? `${icon.emoji} ` : ''

  return (
    <NextLink as={as} href={href} key={key}>
      <a
        className={cx(
          'font-semibold',
          'underline underline-offset-md underline-thickness-sm',
          'hover:text-green-500 dark:hover:text-yellow-200',
          'prose'
        )}
      >
        {emoji}
        {` `}
        {properties['Title'].title[0].plain_text}
      </a>
    </NextLink>
  )
}

export default Link
