import type { IGetPlaiceholderReturn } from 'plaiceholder'

interface IGetPlaiceholderReturnCustom
  extends Omit<IGetPlaiceholderReturn, 'blurhash' | 'css' | 'svg'> {
  blurhash?: string
  id: string
  url: string
}

export type { IGetPlaiceholderReturnCustom }
