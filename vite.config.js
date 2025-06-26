import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
  server: {
    fs: {
      allow: [
        // permite que o Vite sirva arquivos da pasta FontAwesome
        path.resolve(__dirname, 'node_modules/@fortawesome')
      ],
    },
  },
});
