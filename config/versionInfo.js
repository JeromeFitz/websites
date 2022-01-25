#!/usr/bin/env node
/* eslint-disable import/order */
const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env' })
const { Octokit } = require('@octokit/core')

const octokit = new Octokit({ auth: process.env.GH_TOKEN })

async function getReleaseInfo() {
  // ex: website-v8.0.0
  // ex. website-v8.0.0-annihilus.1
  const res = await octokit.request('GET /repos/{owner}/{repo}/tags', {
    owner: 'jeromefitz',
    repo: 'jeromefitzgerald.com',
    per_page: 1,
  })

  // @todo(replace) this needs to be more dynamic or something, heh
  const t = res.data[0].name.replace('website-v', '')
  const [version, prerelease] = t.split('-')
  const [major, minor, patch] = version.split('.')
  const data = { major, minor, patch, prerelease, version }
  return data
}

module.exports.getReleaseInfo = getReleaseInfo
