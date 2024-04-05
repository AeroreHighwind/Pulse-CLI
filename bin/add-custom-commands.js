const fs = require("fs");
const chalk = require("chalk");

function addCustomCommands() {
  const packageJsonPath = "./package.json";
  try {
    const packageJson = require(packageJsonPath);
    packageJson.scripts = {
      ...packageJson.scripts,
      start: "node index.js",
      dev: "nodemon index.js",
      // Add more custom commands here if needed
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(chalk.green("Custom commands added to package.json!"));
  } catch (error) {
    console.log(chalk.red("An error occurred while adding custom commands!"));
  }
}

module.exports = addCustomCommands;
