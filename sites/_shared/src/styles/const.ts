/**
 * @todo(shared)
 * - localized const should be individually based.
 * - they will override global (or merge with?)
 */
const Gradients = {
  light: {
    active: `linear-gradient(
      225deg,
      hsl(223deg 68% 6%) 0%,
      hsl(230deg 74% 13%) 8%,
      hsl(237deg 79% 21%) 17%,
      hsl(244deg 83% 28%) 25%,
      hsl(252deg 89% 35%) 33%,
      hsl(259deg 94% 43%) 42%,
      hsl(266deg 100% 50%) 50%,
      hsl(267deg 88% 50%) 58%,
      hsl(267deg 76% 50%) 67%,
      hsl(268deg 64% 50%) 75%,
      hsl(269deg 51% 50%) 83%,
      hsl(270deg 39% 50%) 92%,
      hsl(270deg 27% 51%) 100%
    )`,
    hover: {},
  },
  dark: {
    active: `linear-gradient(
      45deg,
      hsl(223deg 68% 6%) 0%,
      hsl(230deg 74% 13%) 8%,
      hsl(237deg 79% 21%) 17%,
      hsl(244deg 83% 28%) 25%,
      hsl(252deg 89% 35%) 33%,
      hsl(259deg 94% 43%) 42%,
      hsl(266deg 100% 50%) 50%,
      hsl(266deg 88% 57%) 58%,
      hsl(267deg 76% 65%) 67%,
      hsl(268deg 63% 72%) 75%,
      hsl(268deg 50% 79%) 83%,
      hsl(270deg 38% 87%) 92%,
      hsl(270deg 27% 94%) 100%
    )`,
    hover: {},
  },
}
const Shadows = {
  0: 'none',
  1: `
       0.5px 1px 1px hsl(var(--shadow-color) / 0.333)
     `,
  2: `
       1px 2px 2px hsl(var(--shadow-color) / 0.333),
       2px 4px 4px hsl(var(--shadow-color) / 0.333),
       3px 6px 6px hsl(var(--shadow-color) / 0.333)
     `,
  3: `
       1px 2px 2px hsl(var(--shadow-color) / 0.2),
       2px 4px 4px hsl(var(--shadow-color) / 0.2),
       4px 8px 8px hsl(var(--shadow-color) / 0.2),
       8px 16px 16px hsl(var(--shadow-color) / 0.2),
       16px 32px 32px hsl(var(--shadow-color) / 0.2)
     `,
}

export { Gradients, Shadows }
