import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSvgr from 'vite-plugin-svgr'


export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vitePluginSvgr(), react(), tailwindcss()],

    base: env.VITE_BASE_PUBLIC_PATH || '/',
    
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      // Local development only: keep the API and its session cookie same-origin.
      // No changes to the remote server or its CORS configuration are needed.
      proxy: env.VITE_API_PROXY_TARGET ? {
        '/api': {
          target: env.VITE_API_PROXY_TARGET,
          changeOrigin: true,
          cookieDomainRewrite: '',
          timeout: 240_000,
          proxyTimeout: 240_000,
        },
      } : undefined,
    },
  }
})
