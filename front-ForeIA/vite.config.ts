import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSvgr from 'vite-plugin-svgr'


export default defineConfig({
  plugins: [vitePluginSvgr(), react(), tailwindcss()],
  /* server: {
    
    host: '0.0.0.0', 
    port: 5173,
  } */
})
