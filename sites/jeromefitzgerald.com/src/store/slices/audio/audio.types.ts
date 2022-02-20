type ISoundType =
  | 'bite'
  | 'bleep'
  | 'boop'
  | 'disableSound'
  | 'drums909'
  | 'dunDunDun'
  | 'enableSound'
  | 'fanfare'
  | 'glugA'
  | 'glugB'
  | 'glug'
  | 'guitarLoop'
  | 'menuOpen'
  | 'meow'
  | 'pfff'
  | 'plungerImmediate'
  | 'plunger'
  | 'popDown'
  | 'popUpOff'
  | 'popUpOn'
  | 'pop'
  | 'risingPops'
  | 'switchOff'
  | 'switchOn'

type ISounds = {
  [key in ISoundType]: string | undefined
}

interface IAudio {
  audio: boolean
  audioToggle: () => void
  sounds: ISounds
  volume: number
}

export type { IAudio }
