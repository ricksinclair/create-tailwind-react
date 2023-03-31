#!/bin/bash

if [ -z "$1" ]; then
    echo "No arguments supplied"
    exit 1
fi

npm create vite@latest "$1" -- --template react-ts
cd "$1" || exit

npm install -D tailwindcss postcss autoprefixer sass
npx tailwindcss init -p

echo 'module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,scss,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};' > tailwind.config.js

echo '@import "tailwindcss/base";' > ./src/index.scss
echo '@import "tailwindcss/components";' >> ./src/index.scss
echo '@import "tailwindcss/utilities";' >> ./src/index.scss

echo 'export default defineConfig({
  plugins: [
    react(),
    scss({
      sass: require("sass")
    }),
  ],
});' > vite.config.js

echo "The new tailwind.config.js file has been created with the specified contents."
echo "The new ./src/index.scss file has been created with the specified contents."
echo "The new vite.config.js file has been created with the specified contents."
echo "Start using Tailwind's utility classes to style your content."
