import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Bloco de código para recriar a funcionalidade __dirname em projetos ES Module
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Plugin principal para React
  plugins: [react()],

  // Configuração de alias para importações mais fáceis (ex: @/components)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // Configuração para SASS (SCSS)
  css: {
    preprocessorOptions: {
      scss: {
        // Esta linha injeta automaticamente suas variáveis SASS em todos os
        // arquivos .scss e .module.scss do projeto.
        additionalData: `
          @use "@/styles/base/_variables.scss" as *;
          @use "@/styles/base/_mixins.scss" as *;
        `,
      },
    },
  },
});