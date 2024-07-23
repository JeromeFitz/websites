interface Data {
  badge: {
    color:
      | 'amber'
      | 'blue'
      | 'bronze'
      | 'brown'
      | 'crimson'
      | 'cyan'
      | 'gold'
      | 'grass'
      | 'gray'
      | 'green'
      | 'indigo'
      | 'iris'
      | 'jade'
      | 'lime'
      | 'mint'
      | 'orange'
      | 'pink'
      | 'plum'
      | 'purple'
      | 'red'
      | 'ruby'
      | 'sky'
      | 'teal'
      | 'tomato'
      | 'violet'
      | 'yellow'
    text: string
  }
  button: { icon: any; text: string }
  content: { desktop: string; mobile: string }
  href: string
  icon: any
}

export type { Data }
