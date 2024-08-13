import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':
      {
        target:"https://crowdfunding-31jm.onrender.com",
        secure:false,
      }
    }
  },
  plugins: [react()],
})
