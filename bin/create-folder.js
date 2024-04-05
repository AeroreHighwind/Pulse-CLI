const fs = require("fs");
const chalk = require("chalk");
const { execSync } = require("child_process");
const installDependendies = require("./install-deps");
const createIndexFile = require("./create-index");
const addCustomCommands = require("./add-custom-commands");

function createProjectFolder(projectName) {
  fs.mkdirSync(projectName);
  process.chdir(projectName);
  execSync("npm init -y");
  //install deps
  installDependendies();
  createIndexFile();
  addCustomCommands();
  console.log(
    chalk.greenBright(`Project "${projectName}" created successfully!`)
  );
}
module.exports = createProjectFolder;
