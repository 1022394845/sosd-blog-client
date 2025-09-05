import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 打包优化
import { visualizer } from 'rollup-plugin-visualizer'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    visualizer(),
    importToCDN({
      modules: [
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: [
            'https://unpkg.com/vue@3.5.18/dist/vue.global.prod.js',
            'https://unpkg.com/element-plus@2.11.1/dist/index.full.js'
          ],
          css: 'https://unpkg.com/element-plus@2.11.1/dist/index.css'
        },
        {
          name: '@element-plus/icons-vue',
          var: 'ElementPlusIconsVue',
          path: 'https://unpkg.com/@element-plus/icons-vue@2.3.2/dist/index.iife.min.js'
        },
        {
          name: '@wangeditor/editor',
          var: 'wangEditor',
          path: 'https://unpkg.com/@wangeditor/editor@5.1.23/dist/index.js',
          css: 'https://unpkg.com/@wangeditor/editor@5.1.23/dist/css/style.css'
        }
      ]
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
          'vue-chunks': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
