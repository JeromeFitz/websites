#!/usr/bin/env bash

if [[ -d ./.cache ]]; then rm -rf ./.cache; fi
if [[ -d ./.dist ]]; then rm -rf ./.dist; fi
if [[ -d ./.next ]]; then rm -rf ./.next; fi
if [[ -d ./node_modules ]]; then rm -rf ./node_modules; fi
