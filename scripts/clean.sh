#!/usr/bin/env bash

if [[ -d ./node_modules ]]; then rm -rf ./node_modules; fi

if [[ -d ./packages/shared/dist ]]; then rm -rf ./packages/shared/dist; fi
if [[ -d ./packages/shared/node_modules ]]; then rm -rf ./packages/shared/node_modules; fi


# if [[ -d ./sites/jeromefitzgerald.com/.cache ]]; then rm -rf ./sites/jeromefitzgerald.com/.cache; fi
if [[ -d ./sites/jeromefitzgerald.com/.next ]]; then rm -rf ./sites/jeromefitzgerald.com/.next; fi
if [[ -d ./sites/jeromefitzgerald.com/node_modules ]]; then rm -rf ./sites/jeromefitzgerald.com/node_modules; fi
