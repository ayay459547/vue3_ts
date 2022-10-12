import { 
  // $http, 
  http 
} from '@/lib/http';
import { AxiosResponse, AxiosRequestConfig } from 'axios'

const getUserListData = <T>(config: AxiosRequestConfig, fakeData: T, connectApi = true): Promise<{ data: T, code: number } | AxiosResponse> => {
  return http<T>(config, fakeData, connectApi)
}

export {
  getUserListData
}