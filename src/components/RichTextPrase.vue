<script setup>
// 富文本内容显示区域
import hljs from 'highlight.js' // 代码块高亮
import 'highlight.js/styles/atom-one-dark.css' // 代码块主题样式
import { onMounted } from 'vue'

defineProps({
  text: String // 富文本字符串
})

onMounted(() => {
  hljs.highlightAll()
})
</script>

<template>
  <div class="rich-text" v-dompurify-html="text"></div>
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
