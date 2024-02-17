import { cx } from '@jeromefitz/ds/utils/cx'

import {
  AccordionContent,
  AccordionDemo,
  AccordionItem,
  AccordionTrigger,
} from './Header.Accordion'

const menus = [{ id: 'menu', title: 'Menu', url: '' }]

const links = [
  { id: 'homepage', title: 'Homepage', url: '/' },
  { id: 'events', title: 'Events', url: '/events' },
  { id: 'shows', title: 'Shows', url: '/shows' },
  { id: 'music', title: 'Music', url: '/music' },
  { id: 'books', title: 'Books', url: '/books' },
  { id: 'colophon', title: 'Colophon', url: '/colophon' },
  { id: 'about', title: 'About', url: '/about' },
  { id: 'contact', title: 'Contact', url: '/contact' },
]

function Header() {
  return (
    <header className="fixed top-0 z-50 w-screen">
      <div className="">
        <AccordionDemo>
          {menus.map((menu) => {
            const { id, title } = menu
            const key = `header-link-${id}`
            return (
              // @note(types) Property 'value' does not exist on type
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <AccordionItem key={key} value={id}>
                <AccordionTrigger>
                  <div className="flex w-full flex-row items-center justify-start px-2">
                    <div className="flex w-6/12 min-w-0 grow-0 items-center  text-left leading-tight md:w-9/12 lg:w-6/12">
                      <span className="text-lg font-bold">Jerome Fitzgerald</span>
                    </div>
                    <div className="w-6/12 px-2 text-right leading-tight md:w-3/12 lg:w-4/12 lg:text-left">
                      <span>{title}</span>
                    </div>
                    <div className="hidden lg:ml-auto lg:mr-2 lg:flex lg:w-['calc(50%-2rem)'] lg:grow-0 lg:cursor-pointer lg:flex-row lg:overflow-hidden">
                      IMG
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row flex-wrap">
                    <div className="mb-2 w-full pb-2 md:mb-4 md:pb-4">
                      <ul
                        className={cx(
                          'text-3xl font-black tracking-tighter',
                          'w-full',
                        )}
                      >
                        {links.map((link) => {
                          const { id, title } = link
                          const key = `header-link-item-${id}`
                          return (
                            <li
                              className={cx(
                                'my-2 py-2',
                                'w-full',
                                'odd:bg-[var(--slate-5)] even:bg-[var(--accent-5)]',
                              )}
                              key={key}
                            >
                              {title}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className="mr-1 w-full justify-end text-right lg:mr-4">
                      <span>Button</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </AccordionDemo>
      </div>
    </header>
  )
}

export { Header }
