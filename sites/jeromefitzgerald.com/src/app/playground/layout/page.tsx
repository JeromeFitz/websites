'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useEffect } from 'react'

import { FourOhFour } from '~app/_errors/404'
import { Columns, Module, TopBar } from '~app/_temp/modules'

const isDev = process.env.NODE_ENV === 'development'
const headlineTitle = 'My Dinner with André: The Musical'
// const headlineTitleAria = headlineTitle.replace(/ /gi, '_')

export default function Page() {
  /**
   * @hack This whole thing is a hack... but...
   * To get the proper sizing/clientRect need to be 0,0
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return (
    <div className={cx('w-full min-w-full')}>
      <TopBar />
      <div className={cx('block grow', 'h-screen w-full')} id="layout">
        <div className={cx('w-full')} id="layout--modules">
          <Module
            options={{
              headline: headlineTitle,
              id: 0,
              top: true,
            }}
          />
        </div>
        <div id="layout--footer"></div>
      </div>
      <Columns />
      <div className={cx('block grow', 'h-screen')}>
        <div className={cx('')}>
          <Module options={{ headline: 'ID: 1', id: 1, top: false }} />
        </div>
      </div>
      <div className={cx('h-screen')}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto eius
        voluptas obcaecati nam! Eaque velit aut dolore! Eius fugiat magni
        perspiciatis quasi sunt eaque delectus, in blanditiis? Nesciunt nihil tempora
        recusandae molestiae fugiat blanditiis fugit est consequuntur et, id aliquid
        perferendis similique a, itaque voluptatibus beatae totam dolore explicabo
        pariatur reiciendis. Molestias incidunt mollitia doloremque exercitationem
        consequuntur eligendi distinctio, dolor ab aliquam fuga nostrum illum
        suscipit inventore tenetur facere et atque dignissimos aspernatur? Ullam
        animi nulla, quam maxime repellat ipsum aliquid enim nihil corrupti eos
        ducimus quo ipsam rem? Molestias vero explicabo eum enim officiis ut
        veritatis corrupti ipsum quod!
      </div>
      <div className={cx('block grow', 'h-screen')}>
        <div className={cx('')}>
          <Module options={{ headline: 'ID: 2', id: 2, top: false }} />
        </div>
      </div>
      <div className={cx('block grow', 'h-screen')}>
        <div className={cx('')}>
          <Module options={{ headline: 'ID: 3', id: 3, top: false }} />
        </div>
      </div>
    </div>
  )
}
