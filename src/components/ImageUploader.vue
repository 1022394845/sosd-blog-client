<script setup>
// 单张图片上传器
import { Plus } from '@element-plus/icons-vue'
import { ref, useTemplateRef, watch } from 'vue'
import { genFileId } from 'element-plus'
import { showMsg } from '@/utils/common'
import { uploadFileAPI } from '@/apis/common'

const props = defineProps({
  size: {
    // 图片框大小 默认148px
    type: String,
    default: '148px'
  }
})
const emits = defineEmits(['success'])
const url = defineModel({ type: String })

const fileList = ref([])
const uploadRef = useTemplateRef('uploadRef')

// 初始化回显
let stopWatch = null
stopWatch = watch(
  url,
  (newValue, oldValue) => {
    if (oldValue === undefined && newValue) {
      fileList.value[0] = { url: newValue }
      if (stopWatch) stopWatch()
    }
  },
  {
    immediate: true
  }
)

// 预览图片
const dialogVisible = ref(false)
const previewImageUrl = ref(null)
const handlePreview = (file) => {
  previewImageUrl.value = file.url
  dialogVisible.value = true
}

// 移除图片
const handleRemove = () => {
  if (url.value) url.value = undefined
}

// 覆盖图片
const handleExcced = (files) => {
  if (uploadRef.value) uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}

// 校验上传图片文件是否合法
const validateAvatarFile = (file) => {
  // 校验文件类型
  const type = file.type
  if (!type.startsWith('image/')) {
    showMsg('文件类型不为图片', 'error')
    return false
  }

  // 校验文件大小
  const size = file.size / 1024 / 1024
  if (size > 10) {
    showMsg('文件过大，请控制在10MB以内', 'error')
    return false
  }

  return true
}

// 上传图片
const handleUpload = async (config) => {
  try {
    const data = await uploadFileAPI(config.file, (percent) => {
      // 上传进度回显
      config.onProgress({ percent })
    })
    url.value = data
    config.onSuccess()
    emits('success')
  } catch {
    if (uploadRef.value) uploadRef.value.abort()
    config.onError()
  }
}

/**
 * 开始上传
 * @returns {Boolean} 是否有文件需要上传
 */
const upload = () => {
  if (fileList.value.every((item) => item.status === 'success')) {
    emits('success')
    return false
  } else {
    uploadRef.value.submit()
    return true
  }
}

defineExpose({ upload })
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    ref="uploadRef"
    list-type="picture-card"
    :auto-upload="false"
    accept="image/*"
    :limit="1"
    :on-exceed="(files) => handleExcced(files)"
    :on-preview="(file) => handlePreview(file)"
    :on-remove="handleRemove"
    :before-upload="(file) => validateAvatarFile(file)"
    :http-request="(config) => handleUpload(config)"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <Teleport to="body">
    <!-- 头像预览 -->
    <el-dialog v-model="dialogVisible">
      <img :src="previewImageUrl" alt="头像预览" style="width: 100%" />
    </el-dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
:deep(.el-upload-list) {
  .el-upload-list__item,
  .el-upload {
    width: v-bind('props.size');
    height: v-bind('props.size');
  }

  .el-upload {
    transition: all 0.2s;
  }
}
</style>
