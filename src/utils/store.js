/**
 * @Author: zhuxuxi
 * @Date:   2021-11-16 09:21:28
 * @Last Modified by:   zhuxuxi
 * @Last Modified time: 2021-11-24 15:53:26
 */
import { validatenull } from '@/utils/validate'
const website = { key: 'YG'}
const keyName = website.key + '-'

export const getToken = () => {
  return getStore({
    name: 'token'
  })
}

export const setToken = () => {
  setStore({
    name: 'token'
  })
}

/**
 * 存储localStorage
 */
export const setStore = (params = {}) => {
  // eslint-disable-next-line prefer-const
  let { name, content, type } = params
  name = keyName + name
  const obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export const getStore = (params = {}) => {
  // eslint-disable-next-line prefer-const
  let { name, debug } = params
  name = keyName + name
  let obj = {}
  let content
  obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) obj = window.localStorage.getItem(name)
  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    // eslint-disable-next-line no-eval
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
  // eslint-disable-next-line prefer-const
  let { name, type } = params
  name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  const list = []
  const { type } = params
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  const { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}

/**
 * 存储Cookie
 */
export const setCookie = (c_name, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie =
    c_name +
    '=' +
    escape(value) +
    (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
}

/**
 * 获取Cookie
 */
export const getCookie = userName => {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(userName + '=')
    if (c_start !== -1) {
      c_start = c_start + userName.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) {
        c_end = document.cookie.length
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
