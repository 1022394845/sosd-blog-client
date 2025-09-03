<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, shallowRef, useTemplateRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElLoading } from 'element-plus'
import { uploadFileAPI } from '@/apis/common'

const editorRef = shallowRef() // 编辑器实例
const mode = 'default' // 编辑器模式
const content = defineModel({ type: String, default: '' }) // 内容 HTML

const containerRef = useTemplateRef('containerRef')

const toolbarConfig = {
  excludeKeys: ['todo', 'group-video', 'fullScreen']
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    // 上传图片
    uploadImage: {
      // 自定义上传
      async customUpload(file, insertFn) {
        const loading = ElLoading.service({
          target: containerRef.value,
          text: '上传中 0%'
        })
        try {
          const data = await uploadFileAPI(file, (percentage) => {
            loading.setText(`上传中 ${percentage}%`)
          })
          insertFn(data, '', data)
          loading.close()
        } catch {
          loading.setText('上传失败')
          setTimeout(() => {
            loading.close()
          }, 1000)
        }
      }
    }
  }
}

// 创建编辑器实例
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div class="rich-text-editor" ref="containerRef">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 400px; overflow-y: auto"
        v-model="content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
