// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <-- corrigido
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/base/variables" as *;
          @use "@/styles/base/mixins" as *;
          @use "@/styles/base/utilities" as *;
        `,
      },
    },
  },
});
