import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import cx from 'clsx'
import { AnimateSharedLayout, motion } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'
import _title from 'title'
import useSound from 'use-sound'

import Avatar from '~components/Avatar'
import links from '~config/navigation'
import { useUI } from '~context/ManagedUIContext'
import isActiveLink from '~utils/isActiveLink'

const Item = ({ link }) => {
  const router = useRouter()
  const { audio } = useUI()
  const [play] = useSound('/static/audio/menu-open.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const linkTitle = _title(link.title)
  const isActive = isActiveLink(link, router)
  return (
    <motion.li
    // layout="position"
    >
      <NextLink href={link.href} key={`nav-link-${link.title}`}>
        <a className="cursor-pointer" onClick={() => play()}>
          <motion.span className={cx(isActive ? 'grayscale-10' : 'grayscale')}>
            <Avatar name={linkTitle} margin={true} />
          </motion.span>

          {linkTitle}
          {isActive && (
            <motion.div
              layoutId="navigation-underline"
              className="border  border-black dark:border-white mt-1.5 ml-5"
              animate={{ scale: 1 }}
              exit={{ scale: 0.75 }}
              initial={{ scale: 0.5 }}
              transition={{ delay: 0, duration: 0.25 }}
            />
          )}
        </a>
      </NextLink>
    </motion.li>
  )
}

const ItemMemo = memo(Item)

const Navigation = () => {
  return (
    <>
      <AnimateSharedLayout>
        <SkipNavLink />
        <nav className={cx()}>
          <ul>
            {links.map((link, linkIndex) => {
              if (!link.active) {
                return null
              }
              return <ItemMemo key={linkIndex} link={link} />
            })}
          </ul>
        </nav>
        <SkipNavContent />
      </AnimateSharedLayout>
    </>
  )
}

export default memo(Navigation)
