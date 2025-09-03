<script setup>
import { ref, useTemplateRef, watch, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { modifyUserInfoAPI, uploadAvatarAPI } from '@/apis/user'
import { showMsg } from '@/utils/common'

const userStore = useUserStore()

const formRef = useTemplateRef('formRef')
const formData = ref({
  id: undefined,
  username: undefined,
  image: undefined,
  email: undefined,
  gender: undefined
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱号', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱号',
      trigger: 'blur'
    }
  ]
}

const avatarFile = ref([])
const uploadRef = useTemplateRef('uploadRef')

// 预览头像
const dialogVisible = ref(false)
const previewImageUrl = ref(null)
const handlePreview = (file) => {
  previewImageUrl.value = file.url
  dialogVisible.value = true
}

// 移除头像
const handleRemove = () => {
  if (formData.value.image) formData.value.image = undefined
}

// 覆盖头像
const handleExcced = (files) => {
  if (uploadRef.value) uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}

// 用户信息回显
watch(
  () => userStore.getInfoLoading,
  () => {
    if (userStore.getInfoLoading === false) {
      formData.value = { ...userStore.userInfo }
      // 处理回显头像
      if (formData.value.image) {
        if (uploadRef.value) uploadRef.value.clearFiles()
        nextTick(() => {
          avatarFile.value[0] = { url: formData.value.image }
        })
      }
    }
  },
  {
    immediate: true
  }
)

// 校验上传头像文件是否合法
const validateAvatarFile = (file) => {
  // 校验文件类型
  const type = file.type
  if (!type.startsWith('image/')) {
    showMsg('头像文件类型不为图片', 'error')
    return false
  }

  // 校验文件大小
  const size = file.size / 1024 / 1024
  if (size > 10) {
    showMsg('头像文件过大，请控制在10MB以内', 'error')
    return false
  }

  return true
}

// 上传头像
const handleUpload = async (config) => {
  try {
    const data = await uploadAvatarAPI(config.file, (percent) => {
      // 上传进度回显
      config.onProgress({ percent })
    })
    formData.value.image = data
    config.onSuccess()
  } catch {
    if (uploadRef.value) uploadRef.value.abort()
    config.onError()
  }
}

// 提交表单
const loading = ref(false)
const onSubmit = async () => {
  // 校验表单
  try {
    const result = await formRef.value.validate()
    if (!result) throw new Error()
  } catch {
    return showMsg('表单校验未通过', 'error')
  }

  // 上传头像检查
  if (!avatarFile.value.every((item) => item.status === 'success')) {
    uploadRef.value.submit()
    return
  }

  loading.value = true
  await modifyUserInfoAPI(formData.value)
  loading.value = false
  userStore.getUserInfo(formData.value.id) // 重新获取个人信息
}
</script>

<template>
  <div class="page-container" v-loading="loading || userStore.getInfoLoading">
    <el-form
      ref="formRef"
      class="form"
      :model="formData"
      :rules="rules"
      label-width="auto"
      hide-required-asterisk
    >
      <el-form-item label="编号">
        <el-input v-model="formData.id" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formData.gender">
          <el-radio :value="1">男</el-radio>
          <el-radio :value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          v-model:file-list="avatarFile"
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
          :on-success="onSubmit"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button class="submit-btn gradient-1" @click="onSubmit">保存</el-button>

    <!-- 头像预览 -->
    <el-dialog v-model="dialogVisible">
      <img :src="previewImageUrl" alt="头像预览" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  width: min(500px, 95%);
  margin: 20px auto 0;
}

:deep(.el-upload) {
  transition: all 0.2s;
}

.submit-btn {
  font-size: 16px;
}
</style>
