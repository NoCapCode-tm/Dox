import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // IMPORTANT: Change "your-repo-name" to the exact name of your GitHub repository!
  // For example, if your repository is https://github.com/NoCapCode/dox
  // this should be: base: "/dox/",
  base: "/", 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
})