<script setup>
// 评论编辑器
import { ref, computed } from 'vue'

const emits = defineEmits(['submit'])

const inputValue = ref('')
const disabledSubmit = computed(() => inputValue.value.length === 0)

const onSubmit = () => {
  emits('submit', inputValue.value)
}
</script>

<template>
  <div class="comment-editor">
    <el-input
      v-model="inputValue"
      class="input"
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
      <el-button type="primary" :disabled="disabledSubmit" @click="onSubmit">
        发表
      </el-button>
    </div>
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
}
</style>
