#!/usr/bin/env node

const fs = require("fs");
const { program } = require("commander");
const chalk = require("chalk");
const readline = require("readline");
//functions
const createProjectFolder = require("./create-folder");

program
  .command("new [projectName]")
  .description(
    "Generates a new project with the given name, requests name if not provided"
  )
  .action((projectName) => initProject(projectName));

program.parse(process.argv);

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
