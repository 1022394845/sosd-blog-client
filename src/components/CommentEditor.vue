<script setup>
// 评论编辑器
import { useUserStore } from '@/stores/user'
import { ref, computed, useTemplateRef } from 'vue'

const userStore = useUserStore()

const emits = defineEmits(['submit'])

const inputValue = ref('')
const disabledSubmit = computed(() => inputValue.value.length === 0)

const loading = ref(false)
const onSubmit = () => {
  loading.value = true
  emits('submit', inputValue.value)
}

const inputRef = useTemplateRef('inputRef')
/**
 * 重置状态 可用于提交回调后重置
 * @param {Boolean} [status] 回调是否成功 默认true
 */
const reset = (status = true) => {
  loading.value = false
  if (inputRef.value && status) {
    inputRef.value.clear()
    inputRef.value.blur()
  }
}

/**
 * 手动设置聚焦状态
 */
const focus = () => {
  if (inputRef.value) inputRef.value.focus()
}

defineExpose({ reset, focus })
</script>

<template>
  <div class="comment-editor">
    <template v-if="userStore.userInfo.id">
      <el-input
        v-model="inputValue"
        class="input"
        ref="inputRef"
        type="textarea"
        placeholder="友善表达，平等交流"
        resize="none"
        autosize
        :maxlength="200"
        show-word-limit
        :input-style="{
          border: 'none',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: '#000000',
          transition: 'all 0.3s'
        }"
      ></el-input>
      <div class="operation">
        <el-button
          type="primary"
          :disabled="disabledSubmit"
          :loading="loading"
          @click="onSubmit"
        >
          发表
        </el-button>
      </div>
    </template>

    <!-- 未登录状态 -->
    <template v-else>
      <div class="need-login" v-need-login>
        <el-button type="primary" size="small" style="margin-right: 10px">
          登录 / 注册
        </el-button>
        即可发表评论
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.comment-editor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: #f2f3f5;
  border: 1px solid transparent;
  transition: all 0.3s;

  &:hover {
    background-color: #e4e6eb;
  }
  &:focus-within {
    border: 1px solid $sosd-main-color-1;
    background-color: #ffffff;
  }

  :deep(.input) {
    .is-focus {
      min-height: 115px !important;
    }

    .el-input__count {
      background-color: transparent;
    }
  }

  .operation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin-top: 15px;
  }

  .need-login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    user-select: none;
  }
}
</style>
