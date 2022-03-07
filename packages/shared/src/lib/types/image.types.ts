import type { IGetPlaiceholderReturn } from 'plaiceholder'
import type { IGetBlurhashReturn } from 'plaiceholder/dist/blurhash'

interface IGetPlaiceholderReturnCustom
  extends Omit<IGetPlaiceholderReturn, 'blurhash' | 'css' | 'svg'> {
  blurhash?: IGetBlurhashReturn
  id: string
  url: string
}

export type { IGetPlaiceholderReturnCustom }
