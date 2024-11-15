import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const port = parseInt(process.env.PORT || '3000');

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port
  },
  preview: {
    host: '0.0.0.0',
    port
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
