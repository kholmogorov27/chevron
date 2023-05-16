import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust this limit if needed
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable automatic chunk splitting
      },
    },
  },
});
