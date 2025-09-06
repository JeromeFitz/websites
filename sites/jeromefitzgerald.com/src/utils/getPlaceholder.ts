'use server'

/**
 * @ref https://github.com/dpnunez/nextjs-image-blur-with-sharp/tree/main
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

import sharp from 'sharp'

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferLocal(filepath: string) {
  const realFilepath = path.join(process.cwd(), 'public', filepath)
  return fs.readFile(realFilepath)
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http')
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src)
}

export async function getPlaceholder(filepath: string) {
  try {
    const originalBuffer = await getFileBuffer(filepath)
    const metadata = await sharp(originalBuffer)
      .metadata()
      .then((metadata) => {
        return { height: metadata.height, width: metadata.width }
      })
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return {
      blurDataURL: bufferToBase64(resizedBuffer) || '',
      src: filepath,
      ...metadata,
    }
  } catch {
    return {
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
      height: 500,
      src: filepath,
      width: 500,
    }
  }
}
