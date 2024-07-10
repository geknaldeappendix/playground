import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
          '@playground/math': path.join(__dirname, '../../packages/math/src'),
        },
      },
});