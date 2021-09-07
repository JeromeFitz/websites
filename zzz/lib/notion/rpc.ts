import fetch from 'node-fetch'

const isDebug = false

export default async function rpc(fnName: string, body: any) {
  if (!process.env.NOTION_TOKEN) {
    throw new Error('process.env.NOTION_TOKEN is not set in env')
  }
  if (!process.env.NOTION_API_URL) {
    throw new Error('process.env.NOTION_API_URL is not set in env')
  }
  if (!process.env.NOTION_USER_ID) {
    throw new Error('process.env.NOTION_USER_ID is not set in env')
  }
  const url = `${process.env.NOTION_API_URL}/${fnName}`
  const headers = {
    'content-type': 'application/json',
    cookie: `token_v2=${process.env.NOTION_TOKEN}`,
    'x-notion-active-user-header': process.env.NOTION_USER_ID,
  }

  isDebug && console.dir(`> url`)
  isDebug && console.dir(url)
  isDebug && console.dir(`> fnName`)
  isDebug && console.dir(fnName)
  isDebug && console.dir(`> body`)
  isDebug && console.dir(body)
  isDebug && console.dir(`> headers`)
  isDebug && console.dir(headers)

  const data = JSON.stringify(body)
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: data,
  })

  isDebug && console.dir(`> res`)
  isDebug && console.dir(res)

  if (res.ok) {
    // isDebug && console.dir(`res.ok`)
    return await res.json()
  } else {
    // isDebug && console.dir(`!!res.ok`)
    throw new Error(await getError(res))
  }
}

export async function getError(res: any) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`
}

export function getJSONHeaders(res: any) {
  return JSON.stringify(res.headers.raw())
}

export function getBodyOrNull(res: any) {
  try {
    return res.text()
  } catch (err) {
    return null
  }
}

export function values(obj: any) {
  const vals: any = []

  Object.keys(obj).forEach((key) => {
    vals.push(obj[key])
  })
  return vals
}
