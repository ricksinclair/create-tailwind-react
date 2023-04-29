#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.log('No arguments supplied');
  process.exit(1);
}

const [, , ...args] = process.argv;
const projectName = args[0];
const projectPath = path.join(process.cwd(), projectName);

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

(async () => {
  try {
    // Create the project using Vite with the react-ts template
    await runCommand(
      `npm create vite@latest ${projectName} -- --template react-ts`
    );
    // Install dependencies and set up Tailwind CSS
    await runCommand(
      `cd ${projectName} && npm install -D tailwindcss postcss autoprefixer `
    );
    await runCommand(`cd ${projectName} && npx tailwindcss init -p`);

    // Replace the content of tailwind.config.js
    const tailwindConfigPath = path.join(projectPath, 'tailwind.config.js');
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

    // Replace the content of src/index.scss
    const indexCssPath = path.join(projectPath, 'src', 'index.css');
    const indexCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

    fs.writeFileSync(indexCssPath, indexCssContent);

    console.log(
      'The new tailwind.config.js file has been created with the specified contents.'
    );
    console.log(
      'The new ./src/index.css file has been created with the specified contents.'
    );
    console.log(
      "Start using Tailwind's utility classes to style your content."
    );
    console.log("run 'npm run dev' to start the dev server");
  } catch (error) {
    console.error('Error:', error);
  }
})();
