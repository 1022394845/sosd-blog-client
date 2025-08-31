<script setup>
// 下滑加载
import DotLoading from './DotLoading.vue'
import { useObserver } from '@/utils/observer'
import { useTemplateRef, ref } from 'vue'

const props = defineProps({
  pageSize: {
    // 页容量
    type: Number,
    default: 10
  }
})
/**
 * onLoad 通知父组件加载数据
 * @param {Number} page 加载页码
 * @param {Number} pageSize 页容量
 */
const emits = defineEmits(['onLoad'])
const dataList = defineModel({ type: Array, required: true }) // 数据列表

// 分页信息
let page = 0 // 当前页
const pageSize = props.pageSize // 页容量
let total = null
const status = ref(0) // 0-待加载 1-暂无更多 2-加载异常
const handleNextPage = () => {
  if (status.value === 1) return observer.disconnect() // 没有更多页
  if (status.value === 2) return // 加载异常 等待手动调用
  page++ // 下一页
  emits('onLoad', page, pageSize)
}
const handleResume = () => {
  status.value = 0
  handleNextPage()
}

// 加载触发器
const loadingRef = useTemplateRef('loadingRef')
const observer = useObserver(loadingRef, handleNextPage)

/**
 * 加载数据后回调
 * @param {Array} data 分页数据列表
 * @param {Number} listTotal 数据总数
 * @param {Boolean} [result] 是否请求成功 默认为true
 */
const completeByTotal = (data, listTotal, result = true) => {
  const isFail = data === false || !Array.isArray(data) || !result
  if (isFail) {
    status.value = 2 // 请求失败
    return
  }

  const current = dataList.value.length + data.length
  dataList.value = dataList.value.concat(data)
  total = listTotal

  if (current >= total) {
    status.value = 1
    observer.disconnect() // 卸载监听
  }
}

defineExpose({ completeByTotal })
</script>

<template>
  <div class="scroll-paging">
    <!-- 内容插槽 -->
    <slot></slot>
    <!-- 状态 -->
    <div class="status" ref="loadingRef">
      <template v-if="status === 0">
        <dot-loading>加载中</dot-loading>
      </template>
      <template v-else-if="status === 1">暂无更多</template>
      <template v-else>
        <el-button size="small" @click="handleResume"
          >加载失败，重新加载</el-button
        >
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-paging {
  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    color: #666666;
    user-select: none;
  }
}
</style>
