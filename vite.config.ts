import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xiaoxiong/',  // 仓库名称
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp3|wav|ogg|flac)$/i.test(assetInfo.name)) {
            extType = 'music'
          } else if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
            extType = 'images'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        }
      }
    },
    assetsInlineLimit: 0,
    minify: 'esbuild',
    sourcemap: false,
    emptyOutDir: true
  }
}) 