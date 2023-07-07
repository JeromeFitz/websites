import type { GetPlaiceholderReturn } from 'plaiceholder'
// import type { IGetBlurhashReturn } from 'plaiceholder/dist/blurhash'
// import type {} from 'blurhash'

interface GetPlaiceholderReturnCustom
  extends Omit<GetPlaiceholderReturn, 'blurhash' | 'css' | 'svg'> {
  // blurhash?: IGetBlurhashReturn
  id: string
  url: string
}

export type { GetPlaiceholderReturnCustom }
