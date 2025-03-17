'use client'
import { MagnifyingGlassIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Kbd } from '@radix-ui/themes/dist/esm/components/kbd.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { Command, useCommandState } from 'cmdk'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import { slug as _slug } from 'github-slugger'
import _findIndex from 'lodash/findIndex.js'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation.js'
import { useEffect, useMemo, useRef, useState } from 'react'

import { menus } from '@/data/menu'
import { useStore as _useStore, useShallow } from '@/store/index'

import { Logo } from './Icons'

import styles from './Cmdk.module.css'

const SKIP = 'skip'

function getIconViaParentChild(parent, child) {
  return child ? child : parent
}

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      cmdkInput: store.cmdkInput,
      cmdkInputSet: store.cmdkInputSet,
      cmdkPages: store.cmdkPages,
      cmdkPagesSet: store.cmdkPagesSet,
      cmdkPagesSetRemove: store.cmdkPagesSetRemove,
      isCmdkInnerOpen: store.isCmdkInnerOpen,
      isCmdkInnerOpenSet: store.isCmdkInnerOpenSet,
      isCmdkOpen: store.isCmdkOpen,
      isCmdkOpenSet: store.isCmdkOpenSet,
    })),
  )
}

function Cmdk() {
  const { theme } = useTheme()
  const [value, setValue] = useState('linear')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  const general = useMemo(() => menus[_findIndex(menus, { group: 'general' })], [])
  const IconGeneral = general.icon

  /**
   * @note(cmdk)
   * Toggle the menu when ⌘K is pressed
   */
  const {
    cmdkInput,
    cmdkInputSet,
    cmdkPages,
    cmdkPagesSet,
    cmdkPagesSetRemove,
    isCmdkInnerOpen,
    isCmdkOpen,
    isCmdkOpenSet,
  } = useStore()
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // isCmdkOpenSet((isCmdkOpen) => !isCmdkOpen)
        isCmdkOpenSet()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
    // @todo(eslint) react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const page = cmdkPages[cmdkPages?.length - 1]
  const setPage = (page) => {
    inputRef?.current?.focus()
    cmdkPagesSet(page)
  }

  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'pages' })],
    [],
  )

  return (
    <>
      <Box
        aria-hidden={true}
        className={cx(
          'fixed top-0 left-0 z-50 size-full duration-250',
          'transition-all',
          'pointer-events-none',
          isCmdkOpen && isCmdkInnerOpen
            ? 'bg-grayA-2 backdrop-blur-xs'
            : 'bg-transparent',
        )}
      />
      <Command.Dialog
        className={cx(
          'data-[state=closed]:opacity-0',
          styles['cmdk-wrapper'],
          // styles['cmdk-dialog-in'],
          // styles['cmdk-dialog-out'],
          getDark(theme),
          styles['cmdk-shine'],
          styles['cmdk-border'],
        )}
        contentClassName={cx(
          styles['cmdk-dialog'],
          // styles['cmdk-dialog-in'],
          // styles['cmdk-dialog-out'],
          getDark(theme),
        )}
        filter={(value, search, keywords) => {
          const extendValue = value + ' ' + keywords?.join(' ')
          if (extendValue.includes(search)) return 1
          return 0
        }}
        label="Command Menu"
        onKeyDown={(e) => {
          if (
            (e.key === 'Escape' && cmdkPages.length !== 0) ||
            (e.key === 'Backspace' && !cmdkInput)
          ) {
            e.preventDefault()
            cmdkPagesSetRemove()
          }
          if (e.key === 'Escape' && cmdkPages.length === 0) {
            e.preventDefault()
            isCmdkOpenSet()
          }
        }}
        onOpenChange={isCmdkOpenSet}
        onValueChange={(v) => {
          // console.dir(`v: ${v}`)
          setValue(v)
        }}
        open={isCmdkOpen}
        overlayClassName={cx()}
        value={value}
      >
        <CMDKWrapper>
          <Box
            className="data-[state=open]:opacity-black/50 data-[state=closed]:opacity-black/0 transition-black/50 duration-250"
            data-state={isCmdkInnerOpen ? 'open' : 'closed'}
            id="cmdk-wrapper"
          >
            <Box
              className={cx(
                styles['cmdk-top-shine'],
                getDark(theme),
                styles['cmdk-show-top-shine'],
              )}
              cmdk-top-shine=""
            />
            <Command.Input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className={cx(styles['cmdk-input'], getDark(theme))}
              onValueChange={cmdkInputSet}
              placeholder="Search website..."
              ref={inputRef}
              value={cmdkInput}
            />
            <hr
              className={cx(
                styles['cmdk-loader'],
                getDark(theme),
                styles['cmdk-loading'],
              )}
              cmdk-loader=""
            />
            <Command.List
              className={cx(styles['cmdk-list'], getDark(theme))}
              ref={listRef}
            >
              <Command.Empty className={cx(styles['cmdk-empty'], getDark(theme))}>
                No results found.
              </Command.Empty>
              {!page && (
                <>
                  <Command.Group
                    className={cx(
                      'capitalize',
                      styles['cmdk-group'],
                      getDark(theme),
                    )}
                    heading={'pages'}
                  >
                    {items.map((item) => {
                      const {
                        href,
                        icon: __icon,
                        id,
                        isActive,
                        isActiveMobileOverride,
                        title,
                      } = item
                      if (!isActive && !isActiveMobileOverride) return null
                      const Icon = getIconViaParentChild(_icon, __icon)
                      const props = {
                        ...item,
                        // shortcut: !!item.shortcut ? item.shortcut : '',
                        value: href,
                      }
                      return (
                        <Item key={`pages--${id}`} {...props}>
                          <Logo>
                            <Icon />
                          </Logo>
                          {title}
                        </Item>
                      )
                    })}
                  </Command.Group>
                  <Command.Group
                    className={cx(
                      'capitalize',
                      styles['cmdk-group'],
                      getDark(theme),
                    )}
                    heading={`search`}
                    key={`search`}
                  >
                    <Item
                      id={`upcoming-events`}
                      onSelect={() => setPage('upcoming-events')}
                      shortcut="U E"
                      value={`${SKIP}-1`}
                    >
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Upcoming Events…
                    </Item>
                    <ItemsUpcomingEvents isSubItem />
                    <Item
                      id={`shows`}
                      onSelect={() => setPage('shows')}
                      value={`${SKIP}-2`}
                    >
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Shows…
                    </Item>
                    <ItemsShows isSubItem />
                    <Item
                      id={`podcasts`}
                      onSelect={() => setPage('podcasts')}
                      value={`${SKIP}-3`}
                    >
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Podcasts…
                    </Item>
                    <ItemsPodcasts isSubItem />
                  </Command.Group>
                  <Command.Group
                    className={cx(
                      'capitalize',
                      styles['cmdk-group'],
                      getDark(theme),
                    )}
                    heading={general.group}
                    key={general.group}
                  >
                    <Item
                      id={`theme`}
                      onSelect={() => {
                        setPage(general.group)
                      }}
                      value={`${SKIP}-4`}
                    >
                      <Logo>
                        <IconGeneral />
                      </Logo>
                      {general.title}
                    </Item>
                    <ItemsTheme isSubItem />
                  </Command.Group>
                </>
              )}
              {page === 'upcoming-events' && <ItemsUpcomingEvents />}
              {page === 'shows' && <ItemsShows />}
              {page === 'podcasts' && <ItemsPodcasts />}
              {page === general.group && <ItemsTheme />}
            </Command.List>

            <Box
              className={cx(styles['cmdk-footer'], getDark(theme))}
              cmdk-footer=""
            >
              {/* <HamburgerMenuIcon /> */}
              <Box className="flex flex-row items-center justify-start gap-2 align-middle">
                <Box className="inline-flex gap-2">
                  <Kbd>
                    <Text as="span" size="2">
                      ⌘
                    </Text>
                  </Kbd>
                  <Kbd>
                    <Text as="span" size="1">
                      K
                    </Text>
                  </Kbd>
                </Box>
                <span className={styles['cmdk-open-trigger']}>Close</span>
              </Box>
              <button
                className={cx(
                  'fixed right-0 mr-2',
                  styles['cmdk-open-trigger'],
                  getDark(theme),
                )}
                cmdk-open-trigger=""
              >
                Return to Select
                <Kbd>
                  <Text as="span" size="2">
                    ↵
                  </Text>
                </Kbd>
              </button>
            </Box>
          </Box>
        </CMDKWrapper>
      </Command.Dialog>
    </>
  )
}

function CMDKWrapper(props: MotionProps & { children: ReactNode }) {
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.125 }}
        {...props}
      />
    </AnimatePresence>
  )
}

function getDark(theme) {
  return theme === 'dark' ? styles['dark'] : ''
}

// @todo(complexity) 12
// eslint-disable-next-line complexity
function Item({
  children,
  closeCmdK = true,
  href = '/',
  id,
  keywords = [],
  onClick = () => {},
  onSelect = () => {},
  shortcut = undefined,
  value = SKIP,
}: {
  children: ReactNode
  closeCmdK?: boolean
  href?: string
  id: string
  keywords?: string[]
  onClick?: () => void
  onSelect?: () => void
  shortcut?: string
  value?: string
}) {
  const router = useRouter()
  const { theme } = useTheme()
  const { isCmdkOpenSet } = useStore()
  const [isClick, isClickSet] = useState(false)

  const shouldSkip = !value.includes(SKIP)

  const _onSelect = shouldSkip
    ? () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !!onClick && onClick()
        if (closeCmdK) {
          router.push(href)
          isClickSet(true)
          isCmdkOpenSet()
        }
        // console.dir(`s: ${value}`)
      }
    : onSelect

  // @note(cmdk) _do not_ pass undefined as that passes entire node
  let _value = shouldSkip ? `xyz--${id}` : id
  _value = shortcut ? `${_value}:${shortcut}` : _value

  return (
    <Command.Item
      className={cx(styles['cmdk-item'], getDark(theme))}
      data-active={isClick ? 'true' : 'false'}
      id={`cmdk-${id}`}
      keywords={keywords}
      onMouseDown={() => {
        isClickSet(true)
      }}
      onMouseUp={() => {
        isClickSet(false)
      }}
      onSelect={_onSelect}
      value={_value}
    >
      {children}
      {/* {!!shortcut && (
        <div
        className={cx(styles['cmdk-meta'],styles['dark])}
          cmdk-meta=""
          cmdk-raycast-submenu-shortcuts=""
          className="flex flex-row gap-1"
        >
          {shortcut.split(' ').map((key) => {
            return <Kbd key={key}>{key}</Kbd>
          })}
        </div>
      )} */}
    </Command.Item>
  )
}

function ItemsPodcasts({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'podcasts' })],
    [],
  )

  return (
    <>
      {items.map(
        ({
          href,
          icon: __icon,
          id,
          isActive,
          isActiveMobileOverride,
          keywords,
          title,
        }) => {
          if (!isActive && !isActiveMobileOverride) return null
          const Icon = getIconViaParentChild(_icon, __icon)
          const props = { href, id, keywords, title, value: title }
          return (
            <ItemComponent key={_slug(title)} {...props}>
              <Logo>
                <Icon />
              </Logo>
              {title}
            </ItemComponent>
          )
        },
      )}
    </>
  )
}
function ItemsShows({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'shows' })],
    [],
  )

  return (
    <>
      {items.map(
        ({
          href,
          icon: __icon,
          id,
          isActive,
          isActiveMobileOverride,
          keywords,
          title,
        }) => {
          if (!isActive && !isActiveMobileOverride) return null
          const Icon = getIconViaParentChild(_icon, __icon)
          const props = { href, id, keywords, title, value: title }
          return (
            <ItemComponent key={_slug(title)} {...props}>
              <Logo>
                <Icon />
              </Logo>
              {title}
            </ItemComponent>
          )
        },
      )}
    </>
  )
}
function ItemsTheme({ isSubItem = false }) {
  const { setTheme } = useTheme()
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'general' })],
    [],
  )

  return (
    <>
      {items.map(
        ({
          href,
          icon: __icon,
          id,
          isActive,
          isActiveMobileOverride,
          keywords,
          title,
        }) => {
          if (!isActive && !isActiveMobileOverride) return null
          const Icon = getIconViaParentChild(_icon, __icon)
          const props = {
            closeCmdK: false,
            href,
            id,
            keywords,
            // @todo(cmdk) strip `/`
            onClick: () => setTheme(href),
            title,
            value: title,
          }
          return (
            <ItemComponent key={_slug(title)} {...props}>
              <Logo>
                <Icon />
              </Logo>
              {title}
            </ItemComponent>
          )
        },
      )}
    </>
  )
}
function ItemsUpcomingEvents({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'events' })],
    [],
  )
  return (
    <>
      {items.map(
        ({
          href,
          icon: __icon,
          id,
          isActive,
          isActiveMobileOverride,
          keywords,
          title,
        }) => {
          if (!isActive && !isActiveMobileOverride) return null
          const Icon = getIconViaParentChild(_icon, __icon)
          const props = { href, id, keywords, title, value: title }
          return (
            <ItemComponent key={_slug(title)} {...props}>
              <Logo>
                <Icon />
              </Logo>
              {title}
            </ItemComponent>
          )
        },
      )}
    </>
  )
}
function SubItem({
  children,
  closeCmdK = true,
  href = '/',
  id,
  keywords = [],
  onClick = () => {},
  onSelect = () => {},
  shortcut = undefined,
  value,
}: {
  children: ReactNode
  closeCmdK?: boolean
  href?: string
  id: string
  keywords?: string[]
  onClick?: () => void
  onSelect?: () => void
  shortcut?: string
  value?: string
}) {
  const search = useCommandState((state) => state.search)
  if (!search) return null
  const props = {
    closeCmdK,
    href,
    id,
    keywords,
    onClick,
    onSelect,
    shortcut,
    value,
  }
  return <Item {...props}>{children}</Item>
}

export { Cmdk }
