#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("No arguments supplied\n");
        return 1;
    }

    char command[1024];

    snprintf(command, sizeof(command), "npm create vite@latest %s -- --template react-ts", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && npm install -D tailwindcss postcss autoprefixer sass", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && npx tailwindcss init -p", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && echo 'module.exports = {\\n  content: [\\n    \"./src/**/*.{js,jsx,ts,tsx,scss,css}\"\\n  ],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n};' > tailwind.config.js", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && echo '@import \"tailwindcss/base\";\\n@import \"tailwindcss/components\";\\n@import \"tailwindcss/utilities\";' > ./src/index.scss", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && echo 'export default defineConfig({\\n  plugins: [\\n    react(),\\n    scss({\\n      sass: require(\'sass\')\\n    }),\\n  ],\\n});' > vite.config.js", argv[1]);
    system(command);

    printf("The new tailwind.config.js file has been created with the specified contents.\n");
    printf("The new ./src/index.scss file has been created with the specified contents.\n");
    printf("The new vite.config.js file has been created with the specified contents.\n");
    printf("Start using Tailwind's utility classes to style your content.\n");
    printf("Run 'npm run dev' to start the development server.\n");

    return 0;
}
