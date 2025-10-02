import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Em projetos com "type": "module", __dirname não existe por padrão.
// Estas linhas recriam essa funcionalidade.
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  // 1. Mantém seu Alias '@' para facilitar as importações
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // 2. Mantém suas configurações de SCSS
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

  // 3. Usa a correção para o problema de permissão do Workspace
  server: {
    fs: {
      allow: [
        // Permite o acesso à pasta raiz (onde fica a node_modules principal)
        '..',
      ],
    },
  },
});