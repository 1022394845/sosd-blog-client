<script setup>
import { ref, useTemplateRef, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { modifyUserInfoAPI } from '@/apis/user'
import { showMsg } from '@/utils/common'
import ImageUploader from '@/components/ImageUploader.vue'

const userStore = useUserStore()

const uploadRef = useTemplateRef('uploadRef')
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

// 用户信息回显
watch(
  () => userStore.getInfoLoading,
  () => {
    if (userStore.getInfoLoading === false) {
      formData.value = { ...userStore.userInfo }
    }
  },
  {
    immediate: true
  }
)

// 提交表单
const onSubmit = async () => {
  // 校验表单
  try {
    const result = await formRef.value.validate()
    if (!result) throw new Error()
  } catch {
    return showMsg('表单校验未通过', 'error')
  }

  // 上传头像
  if (uploadRef.value) uploadRef.value.upload()
}

// 更新信息
const loading = ref(false)
const handleUpdate = async () => {
  loading.value = true
  await modifyUserInfoAPI(formData.value)
  loading.value = false
  userStore.getUserInfo(formData.value.id) // 重新获取个人信息
}
</script>

<template>
  <div class="page-container" v-loading="loading || userStore.getInfoLoading">
    <div class="form-container">
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
          <image-uploader
            ref="uploadRef"
            v-model="formData.image"
            @success="handleUpdate"
          ></image-uploader>
        </el-form-item>
      </el-form>
      <el-button class="submit-btn gradient-1" @click="onSubmit">
        保存
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  width: min(500px, 95%);
  margin: 20px auto 0;
}

.submit-btn {
  font-size: 16px;
}
</style>
