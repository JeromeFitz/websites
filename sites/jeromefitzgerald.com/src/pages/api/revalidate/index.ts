// import { createHmac } from 'crypto'

async function handleRevalidate(req, res) {
  const body: any = await getRawBody(req)
  if (!body) {
    res.status(400).send('Bad request (no body)')
    return
  }

  const jsonBody = JSON.parse(body)

  /**
   * @todo(security) uh, this is not the way to do it haha
   */
  const token = process.env.NEXT_PUBLIC__REVALIDATE_TOKEN
  const signature = req.headers['x-revalidate-signature-256']

  if (token === signature) {
    const path = jsonBody.path
    if (path) {
      // console.dir(`revalidating: ${path}`)
      await res.unstable_revalidate(`${path}`)
    }
    return res.status(200).send({ status: 200, message: 'success' })
  } else {
    return res.status(403).send({ status: 403, message: 'forbidden' })
  }
}

function getRawBody(req) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const bodyChunks = []
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8')
      resolve(rawBody)
    })
    req.on('data', (chunk) => bodyChunks.push(chunk))
  })
}

const config = {
  api: {
    bodyParser: false,
  },
}

export { config }
export default handleRevalidate
