<script setup>
import { createArticleAPI, getTagListAPI } from '@/apis/publish'
import ImageUploader from '@/components/ImageUploader.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { showMsg } from '@/utils/common'
import { ref, useTemplateRef, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 表单
const formRef = useTemplateRef('formRef')
const uploadRef = useTemplateRef('uploadRef')
const formData = ref({
  id: undefined,
  title: undefined,
  image: undefined,
  categoryId: null,
  tags: [],
  content: undefined
})
// 去除rich-text-editor保留的空行
const trimContent = computed(() => {
  const content = formData.value.content
  if (typeof content !== 'string') return undefined
  if (content.endsWith('<p><br></p>')) return content.slice(0, -11)
  return content
})

// 校验规则
const rules = {
  title: [{ required: true, message: '标题不可为空', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  tags: [{ required: true, message: '请选择标签', trigger: 'blur' }],
  content: [
    {
      validator: (rule, value, callback) => {
        if (trimContent.value) callback()
        else callback(new Error('内容不可为空'))
      },
      trigger: 'blur'
    }
  ]
}

// 分类类型
const { categoryList } = useArticleStore()

// 标签列表
const tagList = ref([])
const getTagList = async () => {
  const data = await getTagListAPI()
  tagList.value = data
}
onMounted(() => {
  getTagList()
})

// 提交表单
const btnDisabled = ref(false)
const onSubmit = async () => {
  // 校验表单
  try {
    const result = await formRef.value.validate()
    if (!result) throw new Error()
  } catch {
    return showMsg('表单校验未通过', 'error')
  }

  btnDisabled.value = true
  // 上传封面
  if (uploadRef.value) {
    const needUpload = uploadRef.value.upload()
    if (needUpload) formRef.value.scrollToField('cover') // 滚动到上传位置
  }
}

// 发布文章
const loading = ref(false)
const handlePublish = async () => {
  loading.value = true

  const data = {
    ...formData.value,
    content: trimContent.value
  }
  try {
    if (data.id) {
      // 编辑文章
    } else {
      // 新建文章
      await createArticleAPI(userStore.getCurrentUserId(), data)
      showMsg('新建成功', 'success')
    }

    // router.replace('/user/article')
  } finally {
    loading.value = false
    btnDisabled.value = false
  }
}
</script>

<template>
  <div class="page-container" v-loading="loading">
    <div class="form-container">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="auto"
        hide-required-asterisk
        scroll-to-error
        :scroll-into-view-options="{ block: 'center' }"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入标题"
            :maxlength="32"
          />
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择分类">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="formData.tags" multiple :multiple-limit="3">
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <image-uploader
            ref="uploadRef"
            v-model="formData.image"
            size="min(148px, 30vw)"
            @success="handlePublish"
          ></image-uploader>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <rich-text-editor v-model="formData.content"></rich-text-editor>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      class="submit-btn gradient-1"
      :loading="btnDisabled"
      @click="onSubmit"
    >
      发布
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  padding: 20px;

  .submit-btn {
    width: min(300px, 70%);
    height: 40px;
    margin: 40px auto 10px;
    font-size: 16px;
  }
}
</style>
