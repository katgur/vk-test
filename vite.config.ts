import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },
    plugins: [
        react(),
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
    ],
    build: {
        outDir: "build",
    },
});
