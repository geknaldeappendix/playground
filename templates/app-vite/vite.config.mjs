import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
          '@playground/changeme': path.join(__dirname, '../../packages/changeme/src'),
        },
      },
});