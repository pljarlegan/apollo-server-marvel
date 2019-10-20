/* eslint-disable no-console */
const util = require("util"),
  exec = util.promisify(require("child_process").exec),
  packageConfig = require("../package");

async function build() { // eslint-disable-line func-style
  "use strict";
  const { stdout, stderr } = await exec(`docker build -f node/Dockerfile -t ${packageConfig.docker.owner}/${packageConfig.name}:${packageConfig.version} --no-cache .`);
  if (stderr) {
    console.log(stderr);
    return;
  }
  console.log(stdout);
}
build();
