<script setup>
// 传统分页
import { ref, watch } from 'vue'

const props = defineProps({
  pageSize: {
    // 页容量
    type: Number,
    default: 10
  },
  small: {
    // 分页器大小
    type: Boolean,
    default: false
  },
  position: {
    // 分页器位置 left right
    type: String,
    default: 'left'
  }
})
/**
 * onLoad 通知父组件加载数据
 * @param {Number} page 加载页码
 * @param {Number} pageSize 页容量
 */
const emits = defineEmits(['onLoad'])
const dataList = defineModel({ type: Array, required: true }) // 数据列表

const page = ref(1)
const pageSize = props.pageSize
const total = ref(null)
const status = ref(0) // 0-加载中 1-加载异常
const handleChangePage = () => {
  if (status.value === 1) return // 加载异常 等待手动恢复
  emits('onLoad', page.value, pageSize)
}
const handleResume = () => {
  status.value = 0
  handleChangePage()
}

watch(
  page,
  (newPage) => {
    if (newPage === 0) page.value = 1
    handleChangePage()
  },
  {
    immediate: true
  }
)

/**
 * 加载数据后回调
 * @param {Array} data 分页数据列表
 * @param {Number} listTotal 数据总数
 * @param {Boolean} [result] 是否请求成功 默认为true
 */
const completeByTotal = (data, listTotal, result = true) => {
  const isFail = data === false || !Array.isArray(data) || !result
  if (isFail) {
    status.value = 1 // 请求失败
    return
  }

  dataList.value = data
  total.value = listTotal
}

/**
 * 重载数据
 */
const reload = () => {
  dataList.value = []
  page.value = 0
  total.value = null
  status.value = 0
}

defineExpose({ completeByTotal, reload })
</script>

<template>
  <div class="common-paging">
    <!-- 内容插槽 -->
    <slot></slot>

    <!-- 加载失败 -->
    <div class="error" v-if="status === 1">
      <el-button size="small" @click="handleResume">
        加载失败，重新加载
      </el-button>
    </div>

    <div
      class="pagination"
      :style="{
        'justify-content': `flex-${position === 'left' ? 'start' : 'end'}`
      }"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :small="small"
        v-model:current-page="page"
        :default-page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-paging {
  width: 100%;

  .error {
    margin: 20px auto;
  }

  .pagination {
    display: flex;
    margin-top: 20px;
  }
}
</style>
