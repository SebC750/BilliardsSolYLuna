import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    entry: 'src/main.js',  
    build: {
      outDir: 'out/main',  
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    entry: 'src/preload.js',  
    build: {
      outDir: 'out/preload',  
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      }
    },
    build: {
      outDir: 'dist',  
    },
    plugins: [react()],
  }
})

