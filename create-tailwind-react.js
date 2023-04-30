const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.log('No arguments supplied');
  process.exit(1);
}

const projectName = process.argv[2];
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
      `cd ${projectName} && npm install -D tailwindcss postcss autoprefixer  @headlessui/react @heroicons/react`
    );
    await runCommand(`cd ${projectName} && npx tailwindcss init -p`);

    // Replace the content of tailwind.config.js
    const tailwindConfigPath = path.join(projectPath, 'tailwind.config.js');
    const tailwindConfigContent = `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {},
  plugins: [],
};
`;

    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

    //Replace the content of src/app.tsx

    const appTsPath = path.join(projectPath, 'src', 'App.tsx');
    const appTsContent = `import React from 'react';
import './index.css';

function App() {
  return (
     <div className="App min-h-screen h-max flex flex-col items-center justify-center">
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              You are now using TailwindCSS!
              <br />
              Let's get started.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 hover:underline hover:text-blue-700">
              <a href="https://www.tailwindcss.com"> View the docs</a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                RefactoringUI Book
              </a>
              <a
                href="https://m.youtube.com/watch?v=ZuLn42merAg"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <small>
        Not affiliated with TailwindCSS or RefactoringUI. Just spreading the
        word.
      </small>
    </div>
  );
}

export default App;
`;

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
    console.log("run 'npm run dev' to start the development server.");
  } catch (error) {
    console.error('Error:', error);
  }
})();
