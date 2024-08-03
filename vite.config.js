import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api/status/': {  // 自定义代理请求的开头
        target: 'http://192.168.31.6:8081',  // 填写需要跨域的域名即可
        // target: 'http://localhost:8080',  // 填写需要跨域的域名即可
        changeOrigin: true
      },
      '/api/ai/': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

})
