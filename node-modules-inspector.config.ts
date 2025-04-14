import { defineConfig } from 'node-modules-inspector'

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludes: ['*eslint*', '*lint-staged*', '*prettier*', '*semantic*'],
    excludeWorkspace: true,
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },

  publint: true,
})
