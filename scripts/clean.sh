#!/usr/bin/env bash

if [[ -d ./node_modules ]]; then rm -rf ./node_modules; fi

if [[ -d ./packages/lighthouse-config/node_modules ]]; then rm -rf ./packages/lighthouse-config/node_modules; fi
if [[ -d ./packages/next-config/node_modules ]]; then rm -rf ./packages/next-config/node_modules; fi
if [[ -d ./packages/playwright-config/node_modules ]]; then rm -rf ./packages/playwright-config/node_modules; fi
if [[ -d ./packages/prettier-config/node_modules ]]; then rm -rf ./packages/prettier-config/node_modules; fi
if [[ -d ./packages/storybook-config/node_modules ]]; then rm -rf ./packages/storybook-config/node_modules; fi
if [[ -d ./packages/tailwind-config/node_modules ]]; then rm -rf ./packages/tailwind-config/node_modules; fi

if [[ -d ./packages/design-system/dist ]]; then rm -rf ./packages/design-system/dist; fi
if [[ -d ./packages/design-system/node_modules ]]; then rm -rf ./packages/design-system/node_modules; fi
if [[ -d ./packages/next-notion/dist ]]; then rm -rf ./packages/next-notion/dist; fi
if [[ -d ./packages/next-notion/node_modules ]]; then rm -rf ./packages/next-notion/node_modules; fi
if [[ -d ./packages/shared/dist ]]; then rm -rf ./packages/shared/dist; fi
if [[ -d ./packages/shared/node_modules ]]; then rm -rf ./packages/shared/node_modules; fi

# if [[ -d ./sites/jeromefitzgerald.com/.cache ]]; then rm -rf ./sites/jeromefitzgerald.com/.cache; fi
if [[ -d ./sites/jeromefitzgerald.com/.next ]]; then rm -rf ./sites/jeromefitzgerald.com/.next; fi
if [[ -d ./sites/jeromefitzgerald.com/node_modules ]]; then rm -rf ./sites/jeromefitzgerald.com/node_modules; fi

# if [[ -d ./sites/jerandky.com/.cache ]]; then rm -rf ./sites/jerandky.com/.cache; fi
if [[ -d ./sites/jerandky.com/.next ]]; then rm -rf ./sites/jerandky.com/.next; fi
if [[ -d ./sites/jerandky.com/node_modules ]]; then rm -rf ./sites/jerandky.com/node_modules; fi
