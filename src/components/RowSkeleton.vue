<script setup>
/**
 * 多行基础骨架屏
 * @prop {Number} row 行数 默认为3
 */
defineProps({
  row: {
    default: 3
  }
})
</script>

<template>
  <el-skeleton animated>
    <template #template>
      <el-skeleton-item
        v-for="index in row"
        :key="index"
        variant="p"
        class="skeleton-item"
        :style="{ animationDelay: `${0.5 * (index - 1)}s` }"
      />
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
.skeleton-item {
  margin: 5px 0;
  height: 14px;
}
</style>
