#!/bin/bash

MAX_PROJECT_NAME_LENGTH=256

if [ "$#" -lt 1 ]; then
    echo "No arguments supplied"
    exit 1
fi

if [ "${#1}" -gt "$MAX_PROJECT_NAME_LENGTH" ]; then
    echo "Project name is too long. Maximum length is $MAX_PROJECT_NAME_LENGTH characters."
    exit 1
fi

npm create vite@latest "$1" -- --template react-ts
cd "$1" && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

# Remove the existing src/index.css file
rm src/index.css

# Create a new src/index.css file with the specified contents
printf '@tailwind base;\n@tailwind components;\n@tailwind utilities;' > src/index.css

# Remove the existing tailwind.config.cjs file
rm tailwind.config.cjs

# Recreate the tailwind.config.cjs file with the provided content
cat > tailwind.config.cjs << EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

echo "The new tailwind.config.cjs file has been created with the specified contents."
echo "The new ./src/index.css file has been created with the specified contents."
echo "Start using Tailwind's utility classes to style your content."

# Invoke the WebStorm command
webstorm "$1"

