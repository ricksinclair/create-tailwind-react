# 🚀 Create a React-Tailwind Project

This repository provides two convenient scripts to create a new React project using Vite and configure it with Tailwind CSS and TypeScript. Choose the version that suits your
preferences:

1. NPM usage
2. 🌟 C Version (create-tailwind-react.c)
3. 🐚 Shell Script Version (create-tailwind-react.sh)
4. Node.js Version (create-tailwind-react.js).

## Usage

Before running any of the scripts or even the npm version, make sure you have Vite & node.js installed. If you haven't installed Vite yet, run `npm install -g vite` in your terminal.

### 📦 NPM usage

In a terminal run the following:

'''
npx create-tailwind-react <your-project-name>
'''

### 🌟 C Version

1. Compile the C file: `gcc create-tailwind-react.c -o create-tailwind-react`
2. Run the compiled binary with your desired project name: `./create-tailwind-react <your_project_name>`

### 🐚 Shell Script Version

1. Make the script executable: `chmod +x create-tailwind-react.sh`
2. Run the script with your desired project name: `./create-tailwind-react.sh <your_project_name>`

### Node.js Version

1. Install Node.js on your machine if you haven't already.
2. Open a terminal and navigate to the directory where the `create-tailwind-react.js` file is located.
3. Run `node create-tailwind-react.js <your_project_name>` to create a new React project with Vite, install Tailwind CSS and its dependencies, and update the project configuration files.

All versions will create a new React project with Vite, install Tailwind CSS and its dependencies, and update the project configuration files.

After running the script, start using Tailwind's utility classes to style your content! 🎨

💡 Don't forget to check the generated `tailwind.config.js` and `src/index.scss` files.

🎉 Happy coding! 🥳
