const fs = require("fs");
const chalk = require("chalk");

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

module.exports = createIndexFile;
