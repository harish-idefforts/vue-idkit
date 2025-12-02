import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueIdKit',
      fileName: 'vue-idkit'
    },
    rollupOptions: {
      external: ['vue', '@heroicons/vue/24/outline', '@heroicons/vue/24/solid'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
