import { createHmac } from 'node:crypto'
import { ParsedUrlQuery } from 'querystring'

import { GetStaticProps } from 'next'

interface IParams extends ParsedUrlQuery {
  id: string
}

type PageProps = {
  id: string
  token: string
}

export const getStaticProps: GetStaticProps = (context) => {
  const { id } = context.params as IParams
  const hmac = createHmac('sha256', process.env.OG_API_KEY || '')
  hmac.update(JSON.stringify({ id: id }))
  const token = hmac.digest('hex')

  return {
    props: {
      id: id,
      token,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'a' } },
      { params: { id: 'b' } },
      { params: { id: 'c' } },
    ],
    fallback: false,
  }
}

export default function Page({ id, token }: PageProps) {
  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>Only /a, /b, /c with correct tokens are accessible:</p>
      <a
        href={`/api/v1/og?id=${id}&foo=bar&token=${token}`}
        target="_blank"
        rel="noreferrer"
      >
        <code>
          /api/v1/og?id={id}&token={token}
        </code>
      </a>
    </div>
  )
}
