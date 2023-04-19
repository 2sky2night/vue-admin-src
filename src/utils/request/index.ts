import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import type ResponseType from './interfaces'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: 'https://mock.presstime.cn/mock/643b809c7e9ae476cd8b645f/admin-test'
})

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 开启加载条
    NProgress.start()
    const token = localStorage.getItem("token")
    token ? config.headers.Authorization = 'Bearer ' + token : ''
    return config
}, (error: AxiosError) => {
    ElMessage.error("加载失败,请稍后再试!")
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    // 结束加载条
    NProgress.done()
    return response.data
}, (error: AxiosError) => {
    // 结束加载条
    ElMessage.error("加载失败,请稍后再试!")
    NProgress.done()

    return Promise.reject(error)
})

export default {
    get<T = any>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.get(url, { params, ...config })
    },
    post<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.post(url, data, { params, ...config })
    },
    delete<T = any>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.delete(url, { params, ...config })
    },
    patch<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.patch(url, data, { params, ...config })
    },
    put<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.put(url, data, { params, ...config })
    }

}
