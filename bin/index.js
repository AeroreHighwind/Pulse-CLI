// index.js

const yargs = require("yargs");
const chalk = require("chalk");

// Define your commands using yargs
yargs
  .command(
    "new [name]",
    "Create a new project",
    (yargs) => {
      return yargs.positional("name", {
        describe: "Project name",
        type: "string",
      });
    },
    (argv) => {
      if (!argv.name) {
        // If project name is not provided, prompt the user interactively
        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        readline.question("Enter project name: ", (name) => {
          console.log(chalk.green("Creating a new project with name:", name));
          readline.close();
        });
      } else {
        console.log("Creating a new project with name:", argv.name);
      }
    }
  )
  .command("generate <type>", "Generate something", (argv) => {
    console.log("Generating something of type:", argv.type);
  })
  .help().argv; // Enable the --help option for all commands // Parse the arguments
