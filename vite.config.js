import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  const isDemo = command === 'serve' || mode === 'demo'

  if (isDemo) {
    return {
      plugins: [vue()],
      root: resolve(__dirname, 'demo'),
      server: {
        port: 5173
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
          '@idefforts/vue-idkit': resolve(__dirname, 'src')
        }
      }
    }
  }

  // Library build (default)
  return {
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
  }
})
