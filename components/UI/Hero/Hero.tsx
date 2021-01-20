import React, { FC } from 'react'
import { MdArrowForward as RightArrow } from 'react-icons/md'
import Link from 'next/link'

import { Container } from '~components/UI'
import styles from './Hero.module.css'

interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <div className="bg-black">
      <Container>
        <div className={styles.root}>
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h2>
          <div className="flex flex-col justify-between">
            {/* <p className="mt-5 text-xl leading-7 text-accent-2 text-white"> */}
            <p className="mt-5 text-xl leading-7 text-white">{description}</p>
            <Link href="/blog">
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                Read it here
                <RightArrow width="20" height="20" className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
