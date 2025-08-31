import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  eslintPluginPrettierRecommended,

  {
    rules: {
      // 使用插件提供的规则（格式：`插件名/规则名`）
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
        }
      ],
      'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
      'no-unused-vars': [
        'error',
        {
          // 忽略以下划线开头的变量（如 _highlight、_temp 等）
          varsIgnorePattern: '^_',
          // 忽略函数参数中以下划线开头的未使用参数
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
])
