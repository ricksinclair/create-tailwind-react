#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PROJECT_NAME_LENGTH 256

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("No arguments supplied\n");
        return 1;
    }

    if (strlen(argv[1]) > MAX_PROJECT_NAME_LENGTH) {
        printf("Project name is too long. Maximum length is %d characters.\n", MAX_PROJECT_NAME_LENGTH);
        return 1;
    }

    char command[1024];

    snprintf(command, sizeof(command), "npm create vite@latest %s -- --template react-ts", argv[1]);
    system(command);

    snprintf(command, sizeof(command), "cd %s && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p", argv[1]);
    system(command);

    // Remove the existing src/index.css file
    snprintf(command, sizeof(command), "rm %s/src/index.css", argv[1]);
    system(command);

    // Create a new src/index.css file with the specified contents
    snprintf(command, sizeof(command), "printf '@tailwind base;\\n@tailwind components;\\n@tailwind utilities;' > %s/src/index.css", argv[1]);
    system(command);

    // Replace the content of tailwind.config.cjs with the provided content
    char tailwind_config_file_path[1024];
    snprintf(tailwind_config_file_path, sizeof(tailwind_config_file_path), "%s/tailwind.config.js", argv[1]);

    FILE *file = fopen(tailwind_config_file_path, "w");

    if (file) {
        fputs("/** @type {import('tailwindcss').Config} */\n", file);
        fputs("module.exports = {\n", file);
        fputs("  content: [\n", file);
        fputs("    \"./index.html\",\n", file);
        fputs("    \"./src/**/*.{js,ts,jsx,tsx}\",\n", file);
        fputs("  ],\n", file);
        fputs("  theme: {\n", file);
        fputs("    extend: {},\n", file);
        fputs("  },\n", file);
        fputs("  plugins: [],\n", file);
        fputs("}\n", file);

        fclose(file);
    } else {
        printf("Failed to open the tailwind.config.cjs file for writing.\n");
        return 1;
    }

    printf("The new tailwind.config.cjs file has been created with the specified contents.\n");
    printf("The new ./src/index.css file has been created with the specified contents.\n");
    printf("Start using Tailwind's utility classes to style your content.\n");

    // Invoke the WebStorm command
    snprintf(command, sizeof(command), "webstorm %s", argv[1]);
    system(command);

    return 0;
}
