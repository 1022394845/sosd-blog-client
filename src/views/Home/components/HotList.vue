<script setup>
import { getHotListAPI } from '@/apis/article'
import RowSkeleton from '@/components/RowSkeleton.vue'
import { ref, onMounted } from 'vue'

const loading = ref(true)
const hotList = ref([])
const getHotList = async () => {
  loading.value = true
  const data = await getHotListAPI()
  hotList.value = data
  loading.value = false
}
onMounted(() => {
  getHotList()
})
</script>

<template>
  <div class="hot-list">
    <header class="title">
      <img src="@/static/hot-list.svg" alt="" />
      热点文章
    </header>
    <el-divider></el-divider>
    <main class="content">
      <el-scrollbar max-height="calc(100vh - 170px)">
        <row-skeleton v-if="loading" :row="3"></row-skeleton>
        <ul class="list" v-else>
          <li
            class="list-item-wrapper"
            v-for="(item, index) in hotList"
            :key="index"
          >
            <a :href="`/detail/id=${item.id}`" class="list-item">
              <div class="list-item-index">{{ index + 1 }}</div>
              <div class="list-item-title ellipsis">{{ item.title }}</div>
            </a>
          </li>
        </ul>
      </el-scrollbar>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:list';

.hot-list {
  width: 260px;
  height: fit-content;
  padding: 12px 8px;
  background-color: #ffffff;

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
    font-size: 16px;

    img {
      width: 20px;
      height: 20px;
      background-color: transparent;
    }
  }

  .el-divider {
    margin: 8px auto;
  }

  .content {
    padding: 5px 10px;

    .list {
      transition: all 0.3s;

      .list-item-wrapper {
        padding: 8px;

        &:hover {
          background-color: #f7f8fa;
        }

        .list-item {
          display: flex;
          align-items: center;

          .list-item-index {
            margin-right: 20px;
            padding-top: 3px;
            font-family: 'Archivo';
            font-weight: 800;
            color: #8a919f;
          }
        }

        // 前三名index样式
        $gradients: (
          1: (
            #f64242,
            rgba(246, 66, 66, 0.4)
          ),
          2: (
            #ff7426,
            rgba(255, 116, 38, 0.4)
          ),
          3: (
            #ffac0c,
            rgba(255, 172, 12, 0.4)
          )
        );

        @each $index, $colors in $gradients {
          &:nth-child(#{$index}) .list-item-index {
            background: linear-gradient(
              180deg,
              list.nth($colors, 1) 20%,
              list.nth($colors, 2) 80%
            );
          }
        }

        &:nth-child(-n + 3) .list-item-index {
          background-clip: text;
          color: transparent;
        }
      }
    }
  }
}
</style>
