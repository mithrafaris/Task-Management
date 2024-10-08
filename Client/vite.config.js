import { defineConfig } from 'vite'; // Ensure this import is present
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/API': {
        target: 'http://localhost:3001/',
        secure: false,
        ws: true
      }
    }
  },
  plugins: [react()],
});
