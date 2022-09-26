import axios from 'axios'
import { ElMessage } from 'element-plus'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

enum MSGS {
  '成功' = 200,
  '失敗' = 400,
  '帳密錯誤',
  '請求異常'
}

const $http = axios.create({
  // test api
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 2000,
  headers: {
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/json;charset=UTF-8',

    // "Access-Control-Allow-Origin": "*",
    // 'X-Custom-Header': 'foobar'
    // 'X-Requested-With': 'XMLHttpRequest'
  }
})

$http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token') || ''
    }
    // console.log(config.headers)
    return config
  }, 
  (error) => {
    return Promise.reject(error)
  }
)

$http.interceptors.response.use(
  (response) => {
    const code: number = response.status

    if(code !== 200) {
      ElMessage({
        showClose: true,
        message: MSGS[400],
        type: 'error',
      })

      return Promise.reject(response.data)
    }

    return response
  }, 
  (error) => {
    return Promise.reject(error)
  }
)

const http = <T>(config: AxiosRequestConfig, fakeData: T, connectApi = true): Promise<{ data: T, code: number } | AxiosResponse> => {
  if(!connectApi) {
    return Promise.resolve({
      data: fakeData,
      code: 200,
      status: 200,
      msg: 'success'
    })
  } else {
    return $http(config)
  }
}

export { $http, http }
