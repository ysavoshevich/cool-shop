import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { makeUseAxios, ResponseValues, RefetchOptions } from 'axios-hooks'
import axiosRetry from 'axios-retry'

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface Options {
  url: string
  method?: Method
  retries?: number
  headers?: Record<string, string>
}

export const useNetwork = <T extends {}>(
  { retries = 0, ...request }: Options,
  instanceConfig?: AxiosRequestConfig
): [
  ResponseValues<T>,
  (
    config?: AxiosRequestConfig | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<T>
] => {
  const instance = axios.create({
    timeout: 10000,
    ...instanceConfig,
  })

  const useAxios = makeUseAxios({ axios: instance })
  axiosRetry(instance, { retries })

  return useAxios<T>(request, { manual: true })
}
