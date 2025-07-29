import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/baby-care-tracker/' : '/',
    plugins: [react()],
    build: {
      outDir: 'dist'
    }
  };
});
