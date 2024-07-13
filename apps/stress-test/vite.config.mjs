import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
          '@playground/ecs': path.join(__dirname, '../../packages/ecs/src'),
          '@playground/engine': path.join(__dirname, '../../packages/engine/src'),
          '@playground/math': path.join(__dirname, '../../packages/math/src'),
          '@playground/webgl': path.join(__dirname, '../../packages/webgl/src'),
        },
      },
});