'use server'

import type { GetPlaiceholderOptions } from 'plaiceholder'

import { getPlaiceholder as _getPlaiceholder } from 'plaiceholder'

export async function getPlaiceholder(filepath: string) {
  try {
    const buffer = await fetch(filepath).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    )

    const options: GetPlaiceholderOptions = {
      brightness: 1,
      lightness: 5,
      saturation: 1,
      size: 18,
    }

    const {
      base64,
      metadata: { height, width },
    } = await _getPlaiceholder(buffer, options)

    return {
      blurDataURL: base64,
      height,
      src: filepath,
      width,
    }
  } catch {
    return {
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
      src: filepath,
    }
  }
}
