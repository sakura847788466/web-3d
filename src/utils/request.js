import axios from 'axios'
import store from '../store/index'
import Vue from 'vue'
import Router from '@/router/index'
import _ from 'lodash'
import { Loading, Notification, Message } from 'element-ui'

let baseUrl = ''
baseUrl = 'https://ygamgr.gdhqx.cn'

window.baseURL = baseUrl

let errMessage = false
//默认超时时间
axios.defaults.timeout = 10000

let loadingInstance //loading 实例
let needLoadingRequestCount = 0 //当前正在请求的数量

let hideLoading = _.debounce(() => {
  loadingInstance.close()
  loadingInstance = null
}, 300)

function showLoading() {
  if (needLoadingRequestCount === 0 && !loadingInstance) {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 16, 35, 0.78)'
    })
  }
  needLoadingRequestCount++
}

function closeLoading() {
  Vue.nextTick(() => {
    needLoadingRequestCount--
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 保证大于等于0
    if (needLoadingRequestCount === 0) {
      //等到最后一个接口访问完的时候才关闭
      if (loadingInstance) {
        hideLoading()
      }
    }
  })
}

const http = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截
// 请求的时候需要加载动画
http.interceptors.request.use(
  config => {
    showLoading()
    if (store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    return config
  },
  error => {
    // endLoading()
    return Promise.reject(error)
  }
)
// 响应拦截
http.interceptors.response.use(
  response => {
    closeLoading()
    if (response.data.code === 200 || (response.data && !response.data.code)) {
      return response
    } else if (response.data.code === -2) {
      if (!errMessage) {
        errMessage = true
        Notification.error({
          title: '操作失败',
          message: '登录过期，请重新登录',
          iconClass: 'errorIcon',
          duration: 3000,
          onClose: () => {
            errMessage = false
          }
        })
        store.commit('SET_TOKEN', '')
        store.commit('SET_USERINFO', {})
        store.commit('SET_TOP_MENU', [])
        Router.push({
          path: '/login'
        })
        // store.dispatch('LogOut')
      }
    } else {
      Notification.error({
        title: '操作失败',
        message: response.data.msg,
        iconClass: 'errorIcon',
        duration: 3000
      })
      return Promise.reject(response.data)
    }
  },
  error => {
    closeLoading()
    if (!errMessage) {
      errMessage = true
      Notification.error({
        title: '操作失败',
        message: '服务器异常，请稍后再试',
        iconClass: 'errorIcon',
        duration: 3000,
        onClose: () => {
          errMessage = false
        }
      })
    }
    return Promise.reject(error)
  }
)
export default function ajax(url, params, method, isForm, isBlob) {
  const paramsData = isForm ? params : JSON.stringify(params)
  const httpUrl = (method === 'GET' || method === 'DELETE') && params ? url + params : url
  return new Promise((resolve, reject) => {
    http({
      method: method,
      url: httpUrl,
      data: method === 'POST' || method === 'PUT' ? paramsData : null,
      headers: {
        'Content-Type': isForm
          ? 'multipart/form-data;boundary=${boundary};charset=UTF-8'
          : 'application/json'
      },
      responseType: isBlob ? 'blob' : ''
    })
      .then(res => {
        if (res) {
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
