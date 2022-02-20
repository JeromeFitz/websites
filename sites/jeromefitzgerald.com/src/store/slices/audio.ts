/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetState, SetState } from 'zustand'

import { StoreState } from '../useStore'

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

// const soundBank = {
//   bite: 'bite',
//   bleep: 'bleep',
//   boop: 'boop',
//   disableSound: 'disable-sound',
//   drums909: '909-drums',
//   dunDunDun: 'dun-dun-dun',
//   enableSound: 'enable-sound',
//   fanfare: 'fanfare',
//   glugA: 'glug-a',
//   glugB: 'glug-b',
//   glug: 'glug',
//   guitarLoop: 'guitar-loop',
//   menuOpen: 'menu-open',
//   meow: 'meow',
//   pfff: 'pfff',
//   plungerImmediate: 'plunger-immediate',
//   plunger: 'plunger',
//   popDown: 'pop-down',
//   popUpOff: 'pop-up-off',
//   popUpOn: 'pop-up-on',
//   pop: 'pop',
//   risingPops: 'rising-pops',
//   switchOff: 'switch-off',
//   switchOn: 'switch-on',
// }

const initState: Omit<IAudio, 'audioToggle'> = {
  audio: false,
  // @hack(types) literally cannot take this.
  // sounds: Object.fromEntries(
  //   Object.keys(soundBank).map((sound) => [
  //     sound,
  //     `/static/audio/${soundBank[sound]}.mp3`,
  //   ])
  // ),
  sounds: {
    bite: '/static/audio/bite.mp3',
    bleep: '/static/audio/bleep.mp3',
    boop: '/static/audio/boop.mp3',
    disableSound: '/static/audio/disable-sound.mp3',
    drums909: '/static/audio/909-drums.mp3',
    dunDunDun: '/static/audio/dun-dun-dun.mp3',
    enableSound: '/static/audio/enable-sound.mp3',
    fanfare: '/static/audio/fanfare.mp3',
    glug: '/static/audio/glug.mp3',
    glugA: '/static/audio/glug-a.mp3',
    glugB: '/static/audio/glug-b.mp3',
    guitarLoop: '/static/audio/guitar-loop.mp3',
    menuOpen: '/static/audio/menu-open.mp3',
    meow: '/static/audio/meow.mp3',
    pfff: '/static/audio/pfff.mp3',
    plunger: '/static/audio/plunger.mp3',
    plungerImmediate: '/static/audio/plunger-immediate.mp3',
    pop: '/static/audio/pop.mp3',
    popDown: '/static/audio/pop-down.mp3',
    popUpOff: '/static/audio/pop-up-off.mp3',
    popUpOn: '/static/audio/pop-up-on.mp3',
    risingPops: '/static/audio/rising-pops.mp3',
    switchOff: '/static/audio/switch-off.mp3',
    switchOn: '/static/audio/switch-on.mp3',
  },
  volume: 0.75,
}

const Audio = (set: SetState<StoreState>, get: GetState<StoreState>) => {
  const { audio, sounds, volume } = initState
  return {
    audio,
    audioToggle: () => {
      set((prev) => ({ audio: !prev.audio }))
    },
    sounds,
    volume,
  }
}

export type { IAudio }
export default Audio
