<template>
  <div class="dashboard-wrapper grid-row">
    <div class="dashboard-calendar grid-col-xxl-8 grid-col-xs-12">
      <el-calendar v-model="calendar" class="calendar-component"/>
    </div>

    <div class="dashboard-progress grid-col-xxl-4 grid-col-xs-12">
      <el-card class="box-card progress-list">
        <template #header>
          <div class="card-header progress-title">
            <font-awesome-icon icon="fa-solid fa-list-check" class="c-mr-md"/>
            <span>Progress</span>
          </div>
        </template>
        <div 
          v-for="item in progressList" 
          :key="item.page" 
          class="progress-item"
        >
          <div class="progress-item-name">
            <span class="progress-item-page-name">{{ `${item.pageName} ( ${item.page} ) ` }}</span>
            <span class="progress-item-date">{{ item.date }}</span>
          </div>
          <div class="progress-item-percent">
            <el-progress 
              type="circle"
              :width="80" 
              :stroke-width="6" 
              :percentage="item.percent" 
            />
          </div>
        </div>
      </el-card>
    </div>

    <div 
      class="dashboard-chart grid-col-xs-12"
      v-loading="loading" 
      element-loading-text="Loading..." 
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50" 
      element-loading-background="#2a598a70"
    >
      <h3>Stackoverflow 2021 最熱門 應用最多 排行</h3>
      <div class="chart" ref="chartRef" ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ref } from 'vue'
import { echarts } from '@/lib/echarts'
import { fakeData as popularList } from '@/fakeData/fakeData_dashboard'

export default defineComponent({
  setup() {
    // calendar
    let calendar = ref(new Date())

    // progress
    interface ProgressListInterface {
      page: string
      pageName: string
      date: string
      percent: number
    }
    const progressList: Array<ProgressListInterface> = [
      {
        page: 'Dashboard',
        pageName: '儀表版',
        date: '2022-09-27',
        percent: 90
      },
      {
        page: 'Order',
        pageName: '訂單',
        date: '2022-XX-XX',
        percent: 10
      },
      {
        page: 'User',
        pageName: '使用者',
        date: '2022-XX-XX',
        percent: 12
      }
    ]

    // chart
    let loading = ref(true)
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

    setTimeout(() => {
      loading.value = false
    }, 1000);

    const chartRef = ref(null)
    const option = {
      xAxis: {
        data: popularList.map(item => {
          return item.language
        })
      },
      yAxis: {
        type: 'value',
        name: '使用與熱門占比',
        min: 0,
        max: 80,
        position: 'left',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          type: 'bar',
          data: popularList.map(item => {
            return item.percent
          })
        }
      ]
    }

    onMounted(() => {
      if (chartRef.value !== null) {
        const myChart = echarts.init((chartRef.value as unknown as HTMLElement))
        myChart.setOption(option)
      }
    })

    return {
      calendar,
      progressList,
      loading,
      svg,
      chartRef
    }
  }

})
</script>
<style lang="scss" scoped>
.dashboard {
  &-wrapper {
    width: 100%;
    height: fit-content;
  }
  &-calendar {
    overflow: auto;
    .calendar-component {
      min-width: 600px;

      @media screen and (min-width: $xx-large) {
        height: 660px;
      }

      @media screen and (max-width: $xx-large) {
        height: fit-content;
      }
    }
  }

  &-progress {
    overflow: auto;
    .progress-list {
      min-width: 350px;
      
      @media screen and (min-width: $xx-large) {
        height: 660px;
      }

      @media screen and (max-width: $xx-large) {
        height: fit-content;
      }
    }
  }

  &-chart {
    overflow: auto;
    padding: 4px 32px;
    background-color: #ffffff;

    .chart {
      min-width: 1300px;
      height: 300px;
    }
  }
}

.progress {
  &-title {
    font-size: 1.2em;
    font-weight: 600;
  }
  &-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: lighten($gray, 25%);
    border-radius: 32px 0 0 32px;
    padding: 4px 4px 4px 32px;
    margin-bottom: 6px;

    transform: translateX(0px);
    transition-duration: 0.3s;
    &:hover {
      transform: translateX(-4px);
    }

    &-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &-page-name {
      font-weight: 600;
    }
    &-date {
      color: $gray;
    }

    &-percent {
      display: flex;
      align-items: center;
      width: 90px;
      padding: 0 10px;
    }
  }
}
</style>