import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
          '@playground/ecs': path.join(__dirname, '../../packages/ecs/src'),
          '@playground/math': path.join(__dirname, '../../packages/math/src'),
        },
      },
});