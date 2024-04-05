const { exec } = require("child_process");
const chalk = require("chalk");

// Function to install dependencies with a loading spinner
function installDependencies() {
  console.log(chalk.greenBright("Installing dependencies..."));

  // Define spinner characters
  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let index = 0;

  // Start spinner
  const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${spinner[index]} Installing...`);
    index = (index + 1) % spinner.length;
  }, 100);

  // Install each dependency asynchronously
  const installProcess = exec(
    "npm install express @types/express typescript @babel/core @babel/preset-env",
    (error, stdout, stderr) => {
      clearInterval(spinnerInterval);
      if (error) {
        console.error(
          chalk.red("An error occurred while installing dependencies!")
        );
        console.error(stderr);
      } else {
        console.log("\nDependencies installed successfully!");
      }
    }
  );

  // Log output of npm install
  installProcess.stdout.on("data", (data) => {
    process.stdout.write(data);
  });
}

module.exports = installDependencies;
