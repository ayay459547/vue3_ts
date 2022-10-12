<template>
  <div class="table-wrapper">
    <TableFilter 
      class="table-filter" 
      :filterStr="filterStr" 
      @clear="reset" 
      @submit="setFilterData"
    >
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

    <div class="table-main">
      <TableMain 
        :table-column="tableColumn"
        :table-data="showTableData"
        :loading="loading"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import TableFilter from '@/components/feature/TableFilter.vue'
import TableMain from '@/components/feature/TableMain.vue'

import type { FormInstance, FormRules } from 'element-plus'
import { FormInterface, InitData, TipType } from '@/types/table'

import { getTableData } from '@/api/api_table'
import { fakeData, FakeDataInterface } from '@/fakeData/fakeData_table'

import { object_every } from '@/lib/objectFun'

export default defineComponent({
  components: {
    TableFilter,
    TableMain
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
        trigger: 'change'
      }
    ],
    email: [
      {
        required: false,
        trigger: 'change'
      }
    ],
    body: [
      {
        required: false,
        trigger: 'change'
      }
    ]
  })

    const filterPropsList = ['name', 'email', 'body']
    interface filterListInterface {
      name: (v: string) => boolean
      email: (v: string) => boolean
      body: (v: string) => boolean
    }
    const defaultFun = (v: string): boolean => {
      return v.length >= 0
    }
    const filterList: filterListInterface = reactive({
      name: defaultFun,
      email: defaultFun,
      body: defaultFun
    })
    const reset = () => {
      filterPropsList.forEach(prop => {
        filterForm[prop] = ''
      })
    }
    const setFilterData = () => {
      filterPropsList.forEach(prop => {
        if (filterForm[prop].length > 0) {
          let s = new RegExp(`${filterForm[prop]}`)
          filterList[prop] = (v: string): boolean => { return s.test(v) }
        } else {
          filterList[prop] = defaultFun
        }
      })
    }
    const filterStr = computed(() => {
      let res: Array<string> = []
      filterPropsList.forEach(prop => {
        if (filterForm[prop].length > 0) {
          res.push(filterForm[prop])
        }
      })

      return res.join(' , ')
    })

    // table
    let loading = ref(true)
    const tableColumn = {
      id: {
        prop: 'id',
        label: '編號',
        width: '80'
      },
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

        setTimeout(() => {
          loading.value = false
        }, 1000)
      })
    }

    const showTableData = computed(() => {
      const res = tableData.filter(item => {
        return object_every(filterList, (callback, props) => {
          return callback(item[props])
        })
      })
      return res
    })

    initTableData()

    return {
      ...toRefs(baseData),
      filterFormRef,
      filterForm,
      rules,
      reset,
      setFilterData,
      filterStr,
      // table
      showTableData,
      loading,
      tableColumn,
      tableData
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