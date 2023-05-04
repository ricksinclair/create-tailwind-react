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

function App() {
  return (
    <div className="App min-h-screen h-max flex flex-col items-center justify-center">
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="flex flex-col mx-auto max-w-2xl text-center align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-28 w-100 flex-no-shrink align-middle pr-36"
              viewBox="0 0 60 60"
            >
              <defs>
                <linearGradient
                  x1="7.294"
                  y1=".881"
                  y2="59.119"
                  id="A"
                  x2="42.237"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2383ae" offset="0%" />
                  <stop stopColor="#6dd7b9" offset="100%" />
                </linearGradient>
              </defs>
              <g fillRule="evenodd">
                <path
                  d="M16.03 26.506c1.164-4.66 4.077-6.99 8.736-6.99 6.99 0 7.862 5.24 11.356 6.115 2.33.583 4.368-.29 6.115-2.62C41.073 27.67 38.16 30 33.502 30c-6.99 0-7.862-5.24-11.356-6.115-2.33-.583-4.368.29-6.115 2.62zM7.294 36.99C8.46 32.33 11.37 30 16.03 30c6.99 0 7.862 5.24 11.356 6.115 2.33.583 4.368-.29 6.115-2.62-1.164 4.66-4.077 6.99-8.736 6.99-6.99 0-7.862-5.24-11.356-6.115-2.33-.583-4.368.29-6.115 2.62z"
                  fill="url(#A)"
                  transform="translate(1.333)"
                />
                <path
                  d="M49.93 27.578h-2.287v-1.37h6.17v1.37h-2.286v6.214H49.93zm6.87 5.513a2.91 2.91 0 0 1-.74.605c-.272.156-.625.234-1.058.234a2.56 2.56 0 0 1-.707-.096c-.224-.064-.42-.163-.586-.297s-.3-.305-.398-.515-.15-.458-.15-.75c0-.382.085-.694.256-.935a1.73 1.73 0 0 1 .67-.563c.276-.135.586-.23.93-.287a8.44 8.44 0 0 1 1.049-.106l.712-.032v-.276c0-.34-.093-.574-.282-.7s-.41-.19-.664-.19c-.59 0-.926.223-1.01.67l-1.36-.127c.098-.58.354-1 .765-1.26s.965-.388 1.66-.388c.425 0 .787.05 1.085.154s.538.25.718.44a1.71 1.71 0 0 1 .394.696c.082.272.122.58.122.92v3.505H56.8v-.7zm-.032-1.774l-.66.032c-.312.013-.564.046-.755.096s-.34.112-.44.186-.173.16-.207.26-.053.21-.053.33c0 .184.064.33.19.435s.305.16.53.16c.384 0 .696-.088.936-.266.135-.1.246-.226.33-.377s.127-.342.127-.568v-.287zm2.646-3.07h1.49v5.544h-1.49zm-.02-2.04h1.53v1.338h-1.53zm2.784 0h1.49v7.584h-1.49zm2.157 2.04h1.616l.777 3.675L67.79 28.3h1.298l1 3.633.777-3.675h1.553l-1.617 5.544h-1.447l-.99-3.654-1 3.654H65.95l-1.616-5.544zm8.76 0h1.49v5.544h-1.49zm-.02-2.04h1.53v1.338h-1.53zm2.774 2.04h1.447v.765c.22-.325.48-.563.78-.712s.615-.223.94-.223c.632 0 1.1.165 1.405.494s.458.848.458 1.556v3.664H79.39V30.33c0-.4-.074-.655-.224-.797s-.347-.212-.595-.212c-.19 0-.356.03-.495.085s-.268.138-.388.244c-.1.1-.183.218-.25.356a1.03 1.03 0 0 0-.1.451v3.335h-1.5v-5.544zm10.08 4.812a2 2 0 0 1-1.723.903c-.78 0-1.36-.262-1.745-.786s-.574-1.25-.574-2.177a3.99 3.99 0 0 1 .166-1.184c.11-.358.267-.666.473-.924a2.12 2.12 0 0 1 .755-.6c.3-.14.635-.212 1.01-.212.276 0 .55.05.823.15s.53.3.772.574v-2.592h1.49v7.584H85.93v-.733zm-.032-2.103c0-.354-.03-.637-.1-.85s-.158-.385-.292-.52c-.128-.127-.268-.2-.42-.25a1.78 1.78 0 0 0-.451-.058 1.14 1.14 0 0 0-.463.096c-.146.064-.272.163-.383.297s-.197.312-.26.53-.096.48-.096.786c0 .332.03.61.1.834s.143.404.25.542.23.237.372.297.295.1.458.1c.354 0 .645-.103.872-.308a1.3 1.3 0 0 0 .313-.515c.066-.202.1-.462.1-.78v-.19zm11.642.212c-.036.404-.13.777-.282 1.12a2.76 2.76 0 0 1-.627.892 2.79 2.79 0 0 1-.979.589c-.386.14-.834.212-1.345.212-.574 0-1.08-.096-1.516-.287a2.98 2.98 0 0 1-1.095-.807c-.295-.347-.516-.767-.665-1.26s-.223-1.036-.223-1.63c0-.616.08-1.168.244-1.657s.398-.906.702-1.253.674-.613 1.106-.797.923-.276 1.47-.276c.482 0 .903.06 1.26.18s.66.294.905.52.44.5.59.818a4.32 4.32 0 0 1 .329 1.073l-1.575.202c-.078-.446-.23-.797-.45-1.052s-.578-.382-1.06-.382c-.61 0-1.073.228-1.387.685s-.475 1.102-.475 1.938c0 .843.17 1.5.506 1.944a1.6 1.6 0 0 0 1.356.68c.49 0 .85-.126 1.08-.377s.373-.61.43-1.078zm2.317.15c.035.467.186.807.45 1.02s.657.32 1.175.32c.248 0 .458-.027.628-.08s.308-.124.415-.212a.75.75 0 0 0 .228-.313 1.08 1.08 0 0 0 .069-.393c0-.2-.073-.385-.222-.558s-.422-.3-.82-.377l-.99-.18c-.4-.07-.734-.163-1.032-.276s-.548-.26-.75-.44-.356-.402-.462-.664-.16-.574-.16-.935a2.03 2.03 0 0 1 .218-.956 1.96 1.96 0 0 1 .606-.69c.26-.184.57-.324.93-.42s.76-.143 1.192-.143c.553 0 1.014.064 1.383.19s.667.295.894.505.395.45.505.728.183.563.22.86l-1.5.19c-.078-.418-.228-.72-.45-.903s-.562-.276-1.016-.276c-.27 0-.49.023-.665.07s-.314.106-.42.18a.62.62 0 0 0-.224.26c-.042.1-.064.202-.064.308 0 .283.08.496.24.637s.43.252.813.33l1.042.202c.823.163 1.426.427 1.81.79s.574.9.574 1.577c0 .332-.062.64-.186.92a2.06 2.06 0 0 1-.554.733 2.6 2.6 0 0 1-.919.489c-.368.117-.8.175-1.298.175-1.036 0-1.828-.22-2.377-.664s-.846-1.1-.9-2.002h1.606zm6.9 0c.035.467.186.807.45 1.02s.66.32 1.175.32c.25 0 .458-.027.63-.08s.308-.124.415-.212a.75.75 0 0 0 .228-.313 1.08 1.08 0 0 0 .069-.393.84.84 0 0 0-.223-.558c-.15-.173-.422-.3-.82-.377l-.99-.18c-.4-.07-.734-.163-1.032-.276s-.548-.26-.75-.44-.356-.402-.463-.664-.16-.574-.16-.935a2.03 2.03 0 0 1 .218-.956c.146-.276.348-.507.606-.7s.57-.324.93-.42.76-.143 1.192-.143c.553 0 1.014.064 1.383.19s.666.295.894.505.396.45.505.728.183.563.22.86l-1.5.19c-.078-.418-.228-.72-.45-.903s-.562-.276-1.016-.276c-.27 0-.49.023-.665.07s-.314.106-.42.18a.62.62 0 0 0-.224.26c-.043.1-.064.202-.064.308 0 .283.08.496.24.637s.43.252.814.33L109 29.3c.823.163 1.426.427 1.81.79s.574.9.574 1.577a2.24 2.24 0 0 1-.186.919 2.05 2.05 0 0 1-.554.733c-.244.21-.55.372-.92.49s-.8.175-1.297.175c-1.036 0-1.828-.22-2.378-.664s-.846-1.1-.888-2.002z"
                  fill="#24292e"
                />
              </g>
            </svg>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              You are now using TailwindCSS!
              <br />
              Let's get started.
            </h2>
            <h4 className="text-gray-400">
              To get started, remove the contents of this file (
              <span className="text-gray-500">App.tsx</span>) and add your own
              content.
            </h4>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 hover:underline hover:text-blue-700">
              <a
                href="https://tailwindcss.com/docs/utility-first"
                className="hover:text-gray-500 visited:text-gray-700"
              >
                {' '}
                View the docs
              </a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                data-about="This is a great book on how Tailwind is a design system. Highly recommended."
                onClick={() =>
                  window.open('https://RefactoringUI.com', '_blank')
                }
              >
                RefactoringUI Book
              </button>
              <a
                href="https://www.youtube.com/watch?v=ZuLn42merAg"
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
    fs.writeFileSync(appTsPath, appTsContent);

    //Make app.css blonk
    const appCssPath = path.join(projectPath, 'src', 'App.css');
    fs.writeFileSync(appCssPath, '');

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
    console.log(
      "run 'npm run dev' to start the development server.\n Happy Hacking! 💡"
    );
  } catch (error) {
    console.error('Error:', error);
  }
})();
