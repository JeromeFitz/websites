import { defineConfig } from 'node-modules-inspector'

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludes: ['*biome*', '*eslint*', '*lint-staged*', '*prettier*', '*semantic*'],
    excludeWorkspace: true,
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },

  publint: true,
})
