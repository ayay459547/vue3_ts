<template>
  <div class="table-wrapper">
    <TableFilter class="table-filter" :filterStr="'123654'" @clear="reset" @submit="setFilterData">
      <el-form
        ref="filterFormRef"
        :model="filterForm"
        :rules="rules"
        label-width="80px"
        class="login-container"
      >
        <el-form-item :label="nameText" prop="name">
          <el-input v-model="filterForm.name" :placeholder="tip(nameText)" clearable />
        </el-form-item>
        <el-form-item :label="emailText" prop="email">
          <el-input v-model="filterForm.email" :placeholder="tip(emailText)" clearable />
        </el-form-item>
        <el-form-item :label="bodyText" prop="body">
          <el-input v-model="filterForm.body" :placeholder="tip(bodyText)" clearable />
        </el-form-item>
      </el-form>
    </TableFilter>

    <div ref="tableMain" class="table-main">
      <el-table :data="tableData" :height="tableHeight" style="width: 100%">
        <el-table-column 
          v-for="column in tableColumn" 
          :key="column.prop"
          v-bind="column"
        />
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted, onUnmounted } from 'vue'
import TableFilter from '@/components/feature/TableFilter.vue'

import type { FormInstance, FormRules } from 'element-plus'
import { FormInterface, InitData, TipType } from '@/types/table'

import { getTableData } from '@/api/api_table'
import { fakeData, FakeDataInterface } from '@/fakeData/fakeData_table'

import { throttle } from '@/lib/throttle'

export default defineComponent({
  components: {
    TableFilter
  },
  setup () {
    // filter
    const tip: TipType = (text) => {
      return `請輸入${text}`
    }
    
    const baseData = reactive({
      nameText: '名稱',
      emailText: 'E-mail',
      bodyText: '詳細資料',
      tip
    })

    const filterFormRef = ref<FormInstance>()
    const filterForm: FormInterface = reactive(new InitData())
    const rules = reactive<FormRules>({
    name: [
      {
        required: false,
        trigger: 'change',
      },
    ],
    email: [
      {
        required: false,
        trigger: 'change',
      },
    ],
    body: [
      {
        required: false,
        trigger: 'change',
      },
    ]
  })

    const reset = () => {
      console.log('reset')
    }
    const setFilterData = () => {
      console.log('setFilterData')
    }


    // table
    const tableColumn = {
      name: {
        prop: 'name',
        label: '名稱',
        width: '180'
      },
      email: {
        prop: 'email',
        label: 'E-mail',
        width: '180'
      },
      body: {
        prop: 'body',
        label: '詳細資料'
      }
    }
    let tableData: Array<FakeDataInterface> = reactive([])
    const initTableData = () => {
      getTableData<Array<FakeDataInterface>>({
        url: '/posts',
        method: 'get',
        data: filterForm
      }, fakeData, false).then(({ data }) => {
        tableData.push(...data)
      })
    }
    initTableData()

    // table 高度
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

    return {
      ...toRefs(baseData),
      filterFormRef,
      filterForm,
      rules,
      reset,
      setFilterData,
      // table
      tableMain,
      tableColumn,
      tableData,
      tableHeight
    }
  }
})
</script>
<style lang="scss" scoped>
.table {
  &-wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &-filter {
    height: fit-content;
  }

  &-main {
    flex: 1;
    background-color: $white;
  }
}
</style>