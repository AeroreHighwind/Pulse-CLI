#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");
const { program } = require("commander");
const chalk = require("chalk");
const readline = require("readline");

program
  .command("new [projectName]")
  .description(
    "Generates a new project with the given name, requests name if not provided"
  )
  .action((projectName) => initProject(projectName));

program.parse(process.argv);

function createProjectFolder(projectName) {
  fs.mkdirSync(projectName);
  process.chdir(projectName);
  execSync("npm init -y");
  //install deps
  installDependendies();
  createIndexFile();

  console.log(
    chalk.greenBright(`Project "${projectName}" created successfully!`)
  );
}

function initProject(projectName) {
  welcome();
  if (!projectName) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter project name: ", (name) => {
      rl.close();
      if (!name.trim()) {
        console.error("Project name cannot be empty.");
      } else {
        createProjectFolder(name.trim());
      }
    });
  } else {
    createProjectFolder(projectName);
  }
}

function installDependendies() {
  try {
    console.log(chalk.greenBright("Installing dependencies..."));
    execSync("npm install express");
    execSync("npm install @types/express --save-dev");
    execSync("npm install typescript --save-dev");
    execSync("npm install --save-dev @babel/core");
    execSync("npm install @babel/preset-env --save-dev");
    console.log(chalk.green("Dependencies installed successfully!"));
  } catch (error) {
    console.log(chalk.red("An error ocurred!"));
  }
}

function createIndexFile() {
  const indexContent = `import express from 'express';
  
  const app = express();
  const port = 3000;
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(\`Server is running on http://localhost:\${port}\`);
  });
  `;

  try {
    fs.writeFileSync("index.ts", indexContent);
    console.log(chalk.green("index.ts created successfully!"));
  } catch (error) {
    console.log(chalk.red("An error occurred while creating index.ts!"));
  }
}

function welcome() {
  console.log(
    chalk.blue(
      `☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰`
    )
  );
  console.log(
    chalk.redBright(`
  =********+=.    =**.             ***   -+*          =**********        
  :=++++++#%%+   +%%.             %%# -#%#+           :=+++++++=        
           =%%=  +%%.             %%# #%#                               
           -%%=  +%%.             %%# *%%=......     ...........        
:=========*%%*   +%%.             %%#  =#%%%%%%%%#= +%%%%%%%%%%#        
+%%#######*+:    +%%:       :**:  %#=    .::::::=#%#::::::::::::        
+%%.             .#%#.     :#%#.  =              +%%:                   
+%%.              .*%%#+++#%%*.     -++++++++: -*%%+  :=+++++++=        
=**.                .=+***+=.     :+*********- +*=. .+********** 
`)
  );
  console.log(
    chalk.blue(
      `☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰`
    )
  );
}
