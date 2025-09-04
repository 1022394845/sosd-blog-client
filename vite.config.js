import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    visualizer(),
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
          @use "@/styles/glow-btn.scss" as *;
        `
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 手动分割策略
        manualChunks: {
          // 拆分大型第三方依赖
          'vue-chunks': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          'wang-editor': ['@wangeditor/editor', '@wangeditor/editor-for-vue']
        }
      }
    }
  }
})
