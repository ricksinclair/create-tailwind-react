# 🚀 Create a React-Tailwind Project

This repository provides two convenient scripts to create a new React project using Vite and configure it with Tailwind CSS and TypeScript. Choose the version that suits your 
preferences:

1. 🌟 C Version (create-tailwind-react.c)
2. 🐚 Shell Script Version (create-tailwind-react.sh)
3. Node.js Version (create-tailwind-react.js)

## Usage

Before running any of the scripts, make sure you have Vite installed. If you haven't installed Vite yet, run `npm install -g vite` in your terminal.

You can use an IDE like Visual Studio Code or WebStorm to edit your new React project. To open your project in an IDE:

### Visual Studio Code

1. Open Visual Studio Code and go to `View -> Command Palette`.
2. Type `install` in the command palette and select `Shell Command: Install 'code' command in PATH`.
3. Restart your terminal.
4. Navigate to your project directory in the terminal.
5. Type `code .` to open the current directory in Visual Studio Code.

### WebStorm

1. Open WebStorm and go to `Tools -> Create Command-line Launcher`.
2. Choose the installation directory for the launcher and click `OK`.
3. Open your terminal and navigate to your project directory.
4. Type `webstorm` in the terminal to launch WebStorm. If you're on Windows, you may need to use `webstorm64` instead.


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

💡 Don't forget to check the generated `tailwind.config.js` and `src/index.css` files.

🎉 Happy coding! 🥳

