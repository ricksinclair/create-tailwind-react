#!/usr/bin/env node
const{exec:exec}=require("child_process"),fs=require("fs"),path=require("path");process.argv.length<3&&(console.log("No arguments supplied"),process.exit(1));const projectName=process.argv[2],projectPath=path.join(process.cwd(),projectName);async function runCommand(e){return new Promise(((t,n)=>{exec(e,((e,s,i)=>{e?n(e):t(s||i)}))}))}(async()=>{try{await runCommand(`npm create vite@latest ${projectName} -- --template react-ts`),await runCommand(`cd ${projectName} && npm install -D tailwindcss postcss autoprefixer  @headlessui/react @heroicons/react`),await runCommand(`cd ${projectName} && npx tailwindcss init -p`);const e=path.join(projectPath,"tailwind.config.js"),t="module.exports = {\n  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],\n  theme: {},\n  plugins: [],\n};\n";fs.writeFileSync(e,t);const n=path.join(projectPath,"src","App.tsx"),s='import React from \'react\';\nimport \'./index.css\';\n\nfunction App() {\n  return (\n     <div className="App min-h-screen h-max flex flex-col items-center justify-center">\n      <div className="bg-white">\n        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">\n          <div className="mx-auto max-w-2xl text-center">\n            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">\n              You are now using TailwindCSS!\n              <br />\n              Let\'s get started.\n            </h2>\n            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 hover:underline hover:text-blue-700">\n              <a href="https://tailwindcss.com/docs/utility-first">\n                {\' \'}\n                View the docs\n              </a>\n            </p>\n            <div className="mt-10 flex items-center justify-center gap-x-6">\n              <button\n                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"\n                data-about="This is a great book on how Tailwind is a design system. Highly recommended."\n                onClick={() =>\n                  window.open(\'https://RefactoringUI.com\', \'_blank\')\n                }\n              >\n                RefactoringUI Book\n              </button>\n              <a\n                href="https://www.youtube.com/watch?v=ZuLn42merAg"\n                className="text-sm font-semibold leading-6 text-gray-900"\n              >\n                Learn more <span aria-hidden="true">→</span>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <small>\n        Not affiliated with TailwindCSS or RefactoringUI. Just spreading the\n        word.\n      </small>\n    </div>\n  );\n}\n\nexport default App;\n';fs.writeFileSync(n,s);const i=path.join(projectPath,"src","App.css");fs.writeFileSync(i,"");const o=path.join(projectPath,"src","index.css"),a="@tailwind base;\n@tailwind components;\n@tailwind utilities;\n";fs.writeFileSync(o,a),console.log("The new tailwind.config.js file has been created with the specified contents."),console.log("The new ./src/index.css file has been created with the specified contents."),console.log("Start using Tailwind's utility classes to style your content."),console.log("run 'npm run dev' to start the development server.")}catch(e){console.error("Error:",e)}})();