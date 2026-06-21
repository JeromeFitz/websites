import path from "node:path";

import isCI from "is-in-ci";
!isCI && require("dotenv").config({ path: "./.env", quiet: true });

const buildInfoConfig = {
  owner: "jeromefitz",
  repo: "jeromefitzgerald.com",
};

const serverComponentsExternalPackages: never[] = [];
const transpilePackages: never[] = [];

module.exports = require("@jeromefitz/next-config")({
  basePath: "",
  buildInfoConfig,
  pathDirName: path.join(__dirname),
  serverComponentsExternalPackages,
  transpilePackages,
});
