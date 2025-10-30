import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSvgr from 'vite-plugin-svgr'


export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vitePluginSvgr(), react(), tailwindcss()],

    base: env.VITE_BASE_PUBLIC_PATH || '/',
    
    /* server: {
      host: '0.0.0.0', 
      port: 5173,
    } */
  }
})