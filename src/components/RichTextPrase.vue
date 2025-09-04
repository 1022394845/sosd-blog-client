<script setup>
// 富文本内容显示区域
import hljs from 'highlight.js/lib/core'
// 按需导入highlight.js语言包
import plaintext from 'highlight.js/lib/languages/plaintext'
import 'highlight.js/styles/atom-one-dark.css' // 代码块主题样式
import { watch, useTemplateRef, nextTick } from 'vue'

const props = defineProps({
  text: String // 富文本字符串
})

// 支持语言映射表
const languageImports = {
  css: () => import('highlight.js/lib/languages/css'),
  html: () => import('highlight.js/lib/languages/xml'),
  javascript: () => import('highlight.js/lib/languages/javascript'),
  typescript: () => import('highlight.js/lib/languages/typescript'),
  go: () => import('highlight.js/lib/languages/go'),
  php: () => import('highlight.js/lib/languages/php'),
  c: () => import('highlight.js/lib/languages/c'),
  python: () => import('highlight.js/lib/languages/python'),
  java: () => import('highlight.js/lib/languages/java'),
  cpp: () => import('highlight.js/lib/languages/cpp'),
  csharp: () => import('highlight.js/lib/languages/csharp'),
  sql: () => import('highlight.js/lib/languages/sql'),
  markdown: () => import('highlight.js/lib/languages/markdown')
}

// 已加载的语言集合
const loadedLanguages = new Set(['plaintext'])
hljs.registerLanguage('plaintext', plaintext)

// 按需注册指定语言
const registerLanguage = async (language) => {
  if (languageImports[language]) {
    const module = await languageImports[language]()
    hljs.registerLanguage(language, module.default)
    loadedLanguages.add(language)
  }
}

const containerRef = useTemplateRef('containerRef')
const highlight = async () => {
  const codeBlocks = containerRef.value.querySelectorAll('pre code')

  for (const block of codeBlocks) {
    try {
      const language = block.className.replace('language-', '') || 'plaintext'
      if (!loadedLanguages.has(language)) await registerLanguage(language)

      hljs.highlightBlock(block)
    } catch {
      block.classList.add('hljs-error')
    }
  }
}

watch(
  () => props.text,
  (newValue) => {
    if (newValue) nextTick(highlight)
  },
  { immediate: true } // 初始加载时立即执行
)
</script>

<template>
  <div class="rich-text" ref="containerRef" v-dompurify-html="text"></div>
</template>

<style lang="scss">
.rich-text {
  // 还原样式
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  a,
  cite,
  em,
  img,
  strong,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article {
    all: revert;
  }

  h1 {
    font-size: 2em;
  }

  pre {
    margin: 10px 0;

    code {
      font-family: 'Consolas';
    }
  }
}
</style>
