<script setup>
import {
  createArticleAPI,
  getEditArticleAPI,
  getTagListAPI,
  modifyArticleAPI
} from '@/apis/publish'
import ImageUploader from '@/components/ImageUploader.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { showMsg } from '@/utils/common'
import { ref, useTemplateRef, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

// 表单
const formRef = useTemplateRef('formRef')
const uploadRef = useTemplateRef('uploadRef')
const formData = ref({
  id: undefined,
  title: undefined,
  image: undefined,
  categoryId: null,
  tags: [],
  content: '<p><br></p>' // 避免初始化时影响watch
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

let needSave = false // 需要保存
let allowPublish = ref(true) // 允许发布
let stopWatch = null
// 创建修改监听器
const createWatcher = () => {
  if (stopWatch) stopWatch() // 销毁已存在的监听器
  stopWatch = watch(
    formData,
    () => {
      needSave = true
      stopWatch() // 停止监听
      stopWatch = null
    },
    {
      deep: true
    }
  )
}

// 分类类型
const { categoryList } = useArticleStore()

// 标签列表
const tagList = ref([])
const getTagList = async () => {
  const data = await getTagListAPI()
  tagList.value = data
}

/**
 * 数据回显
 * @param {Number} id 文章id
 */
const getDetail = async (id) => {
  const { status, ...data } = await getEditArticleAPI(id)
  formData.value = {
    ...data,
    id
  }
  if (status > 1) allowPublish.value = false
}

const loading = ref(true)
onMounted(async () => {
  loading.value = true
  if (route.query.id) await getDetail(Number(route.query.id))
  loading.value = false
  getTagList()
  nextTick(() => {
    createWatcher() // 创建监听器
  })
})

let directPublish = false // 保存后自动提交
const btnDisabled = ref(false)
/**
 * 提交表单
 * @param {Boolean} publish 是否自动提交 默认false
 */
const onSubmit = async (publish = false) => {
  directPublish = publish

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

// 保存文章
const handleSave = async () => {
  loading.value = true

  try {
    if (needSave) {
      // 需要保存文章内容
      const data = {
        ...formData.value,
        content: trimContent.value
      }

      if (data.id) {
        // 编辑文章
        await modifyArticleAPI(data)
        showMsg('保存成功', 'success')
      } else {
        // 新建文章
        const { articleId } = await createArticleAPI(
          userStore.getCurrentUserId(),
          data
        )
        if (typeof articleId === 'number') {
          // 暂时停止监听
          if (stopWatch) {
            stopWatch() // 停止监听
            stopWatch = null
          }
          formData.value.id = articleId
        }
        showMsg('新建成功', 'success')
      }
      needSave = false
      createWatcher() // 创建修改监听器
    }

    if (directPublish) {
      handlePublish() // 直接发布文章
      return // 跳过解除loading
    }
  } finally {
    loading.value = false
    btnDisabled.value = false
  }
}

// 发布文章
const handlePublish = () => {
  console.log('publish')
  allowPublish.value = false
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
            @success="handleSave"
          ></image-uploader>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <rich-text-editor v-model="formData.content"></rich-text-editor>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button
        class="submit-btn gradient-1"
        :loading="btnDisabled"
        @click="onSubmit(false)"
      >
        {{ Number.isNaN(formData.id) ? '新建' : '保存' }}
      </el-button>
      <el-button
        class="submit-btn gradient-2"
        v-if="Number.isNaN(formData.id) || allowPublish"
        :loading="btnDisabled"
        @click="onSubmit(true)"
      >
        发布
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px 40px;
  width: 70%;
  margin: 40px auto 10px;

  .submit-btn {
    flex: 1;
    min-width: 160px;
    max-width: 300px;
    height: 40px;
    margin-left: 0;
    font-size: 16px;
  }
}
</style>
