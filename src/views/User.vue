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
        <el-form-item :label="tableColumn.name.label" prop="name">
          <el-input v-model="filterForm.name" :placeholder="tip(tableColumn.name.label)" clearable />
        </el-form-item>
        <el-form-item :label="tableColumn.access.label" prop="access">
          <el-select
            v-model="filterForm.access"
            multiple
            :placeholder="tip(tableColumn.access.label)"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </TableFilter>

    <div class="table-main">
      <TableMain 
        :table-column="tableColumn"
        :table-data="showTableData"
        :loading="loading"
      >
        <template #column-access="{ data }">
          <div>{{ data.row.access.reduce(
            (prev, curr) => {
              if (curr.isShow) {
                  prev.push(curr.title)
              }
              return prev
            }, []).join(' , ')}}
          </div>
        </template>
        <template #column-action="{ data }">
          <el-button type="primary" @click="editData(data.row)">編輯</el-button>
        </template>
      </TableMain>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import TableFilter from '@/components/feature/TableFilter.vue'
import TableMain from '@/components/feature/TableMain.vue'

import type { FormInstance, FormRules } from 'element-plus'
import { FormInterface, InitData, TipType } from '@/types/userList'

import { getUserListData } from '@/api/api_userList'
import { fakeData, FakeDataInterface } from '@/fakeData/fakeData_userList'

import { object_every } from '@/lib/objectFun'
import { isArray } from 'lodash'

export default defineComponent({
  components: {
    TableFilter,
    TableMain
  },
  setup () {
    //options
    const options = [
      {
        label: '儀錶板',
        value: 'Dashboard'
      },
      {
        label: '表單',
        value: 'Table'
      },
      {
        label: '使用者',
        value: 'User'
      }
    ]
    // filter
    const tip: TipType = (text) => {
      return `請輸入${text}`
    }
    
    const filterFormRef = ref<FormInstance>()
    const filterForm: FormInterface = reactive(new InitData())
    const rules = reactive<FormRules>({
      name: [
        {
          required: false,
          trigger: 'change',
        }
      ],
      access: [
        {
          required: false,
          trigger: 'change',
        }
      ]
    })

    const filterPropsList = ['name', 'access']
    interface filterListInterface {
      name: (v: string) => boolean
      access: (v: Array<string | unknown>) => boolean
    }
    const defaultFun = {
      name: (v = ''): boolean => {
        return v.length >= 0
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      access: (v: Array<any> = []): boolean => {
        return isArray(v)
      }
    }
    const filterList: filterListInterface = reactive({
      name: defaultFun.name,
      access: defaultFun.access
    })
    const reset = () => {
      filterPropsList.forEach(prop => {
        if (isArray(filterForm[prop])) {
          filterForm[prop] = []
        } else {
          filterForm[prop] = ''
        }
      })
    }
    const setFilterData = () => {
      filterPropsList.forEach(prop => {
        if (filterForm[prop].length > 0) {
          if (isArray(filterForm[prop])) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filterList[prop] = (v: Array<any> = []) => {
              const pageList = v.filter(item => item.isShow).map(item => item.name)
              return filterForm[prop].every(item => {
                return pageList.includes(item)
              })
            }
          } else {
            const s = new RegExp(`${filterForm[prop]}`)
            filterList[prop] = (v: string): boolean => { return s.test(v) }
          }
        } else {
          filterList[prop] = defaultFun[prop]
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
      userId: {
        prop: 'userId',
        label: 'ID',
        width: '80'
      },
      name: {
        prop: 'name',
        label: '姓名',
        width: '180'
      },
      access: {
        prop: 'access',
        label: '權限',
        minWidth: '180'
      },
      action: {
        prop: 'action',
        label: '操作',
        width: '90'
      }
    }
    let tableData: Array<FakeDataInterface> = reactive([])
    const initTableData = () => {
      getUserListData<Array<FakeDataInterface>>({
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

    // update
    const editData = (rowData) => {
      console.log(rowData)
    }

    return {
      // filter
      tip,
      options,
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
      tableData,
      // update
      editData
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