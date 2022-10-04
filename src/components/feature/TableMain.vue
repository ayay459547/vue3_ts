<template>
  <div ref="tableMain" class="table-container">
    <div v-if="loading" class="c-pa-md" style="height: 1px;">
      <el-skeleton
        :count="12"
        :throttle="500"
        animated
      >
        <template #template>
          <el-skeleton-item style="width: 15%; height: 30px; margin: 8px"/>
          <el-skeleton-item style="width: 25%; height: 30px; margin: 8px"/>
          <el-skeleton-item style="width: 45%; height: 30px; margin: 8px"/>
        </template>
      </el-skeleton>
    </div>
    
    <el-table v-if="!loading" :data="showData" :height="tableHeight" style="width: 100%">
      <el-table-column 
        v-for="column in tableColumn" 
        :key="column.prop"
        v-bind="column"
      />
    </el-table>
  </div>
  <div class="table-pagination">
    <el-pagination 
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="showDataCount"
      :current-page="currentPage"
      @update:current-page="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onUpdated, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/lib/throttle'

const props = defineProps({
  tableColumn: Object,
  tableData: {
    type: Array,
    default () {
      return []
    }
  },
  loading: {
    type: Boolean,
    default: true
  },
  showDataCount: {
    type: Number,
    default: 50
  }
})

let total = ref(1)
onUpdated(() => {
  total.value = props.tableData.length
})

let currentPage = ref(1)

const changePage = (v: number): void => {
  currentPage.value = v
}

const showData = computed(() => {
  const start = (currentPage.value - 1) * props.showDataCount
  const end = start + props.showDataCount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props.tableData as Array<any>).slice(start, end)
})

// 表單高度
let tableHeight = ref(500)
const ROcallback = throttle((entries) => {
  entries.forEach((entry) => {
    tableHeight.value = entry.contentRect.height - 10
  })
}, 200)
const RO = new ResizeObserver(ROcallback)
const tableMain = ref(null)
onMounted(() => {
  if (tableMain.value !== null) {
    RO.observe(tableMain.value)
  }
})
onUnmounted(() => {
  RO.disconnect()
})

</script>

<style lang="scss" scoped>
$pagination-height: 40px;
.table {
  &-container {
    width: 100%;
    height: calc(100% - $pagination-height);
    overflow-y: auto;
  }
  &-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $pagination-height;
  }
}
</style>